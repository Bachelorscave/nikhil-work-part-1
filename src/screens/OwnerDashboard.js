import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
// import { LinearGradient } from 'expo-linear-gradient'
import Color from '../Utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  GetUserResponses,
  fetchListing,
  getPhoto,
  updateContact,
} from '../apiservice/OwnerApi';
import {updateListingDate} from '../apiservice/OwnerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderSection from '../components/main/mainsectionC';
import {useNavigation} from '@react-navigation/native';
import {collapsable} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const {width, height} = Dimensions.get('window');
const OwnerDashboard = () => {
  const [listing, setListing] = useState([]); // for manage properties
  // const [loading, setLoading] = useState(true);
  const [Responses, setResponses] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // for changing new Date
  const [newDate, setNewDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [refresh, setRefresh] = useState(false); //to trigger refetch responses

  const [refreshContat, setRefreshContact] = useState(false); // to trigger contact

  const [imagenew, setnewImage] = useState([]);

  const fetchPHOTO = useCallback(async () => {
    try {
      const jsonData = await getPhoto();
      if (jsonData) {
        // setShorlisted(jsonData);
        setnewImage(jsonData);

        console.log('Shortlisted photo:', jsonData);
        console.log('Shortlisted photo:', imagenew);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const jsonData = await fetchListing();
      if (jsonData) {
        setListing(jsonData);
        console.log('Listing:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const ResponsesData = useCallback(async () => {
    try {
      const jsonData = await GetUserResponses();
      if (jsonData) {
        setResponses(jsonData);
        console.log('------> dashboard data --> for the responses');
        console.log(JSON.stringify(jsonData, null, 2));
      }
    } catch (error) {
      console.error('Error Responses data :', error);
    }
  }, []);

  useEffect(
    () => {
      fetchData();
      ResponsesData();
      fetchPHOTO();
    },
    [fetchData, refresh],
    [ResponsesData, refresh],
    [fetchPHOTO, refresh],
  );

  // if (loading) {
  //   return <Text>loader</Text>;
  // }

  const getFirstNonZeroRent = item => {
    if (item.rentSingle !== 0) return item.rentSingle;
    if (item.rentDouble !== 0) return item.rentDouble;
    if (item.rentTriple !== 0) return item.rentTriple;
    if (item.rentFour !== 0) return item.rentFour;
    return null; // Return null if all are zero
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // date modal

  const showDatePicker = item => {
    setSelectedItem(item);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = async date => {
    hideDatePicker();
    // You would then update the date in your state and make the API call to update it in the backend.
    console.log('New Date:', date);
    // Example: update the date in the state
    try {
      const response = await updateListingDate(
        selectedItem.propertyId,
        date.toISOString(),
        selectedItem.propertyType,
      );
      console.log('New Date:', date);
      console.log(response);
      if (response.status === 200) {
        console.log('successfull');
        ToastAndroid.showWithGravityAndOffset(
          'Availability Date Updated!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        setRefresh(prev => !prev);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }

    // Call your API here to update the date, e.g., updateListingDate(selectedItem.id, date);
  };
  const handleContact = async item => {
    console.log('checking id ::::------------>', item._id);
    // Make the API call to update the contact status
    try {
      const response = await updateContact(item._id);
      console.log(response);
      if (response.status === 200) {
        console.log('successfull');
        ToastAndroid.showWithGravityAndOffset(
          'Contacted Request send!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        setRefresh(prev => !prev);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    // Handle search functionality here
    alert('Search button clicked!');
  };

  const [activeTab, setActiveTab] = useState('Manage Properties');

  const handleTabClick = tabName => {
    setActiveTab(tabName);
  };
  const navigation = useNavigation();
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#FFF', alignContent: 'center'}}>
        <HeaderSection />
        {/* <LinearGradient
        colors={["gray", "transparent"]}
         style={{
          left:0,
          right:0,
          height:12,
          marginTop:-3
         }}
        >
         
      </LinearGradient> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: height * 0.38,
              width: width * 0.95,
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 10,
              marginHorizontal: 10,
              elevation: 1,
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                marginHorizontal: 5,
                height: height * 0.05,
              }}>
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[styles.tabItem, activeTab === 'Manage Properties']}
                  onPress={() => handleTabClick('Manage Properties')}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === 'Manage Properties' && styles.activeTabText,
                    ]}>
                    Manage Properties
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tabItem, activeTab === 'Property Performance']}
                  onPress={() => handleTabClick('Property Performance')}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === 'Property Performance' &&
                        styles.activeTabText,
                    ]}>
                    Property Performance
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tabItem, activeTab === 'Response']}
                  onPress={() => handleTabClick('Response')}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === 'Response' && styles.activeTabText,
                    ]}>
                    Response
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {activeTab === 'Manage Properties' && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{height: 'auto', width: '100%'}}>
                {listing.map((item, index) => (
                  <View style={{width: '100%'}} key={index}>
                    {console.log(
                      `item.propertyType-------${index}------->`,
                      item,
                    )}
                    <TouchableOpacity
                      // onPress={()=>navigation.navigate("Login1")}
                      style={{
                        height: height * 0.146,
                        elevation: 2,
                        backgroundColor: '#FFF',
                        marginHorizontal: 10,
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 6,
                        width: width * 0.9,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <ImageBackground
                          source={{
                            uri: `http://93.127.185.101:8005/api/utils/get-image/${item?.image}`,
                          }}
                          style={{
                            width: width * 0.28,
                            height: height * 0.146,
                            marginRight: 5,
                            // borderWidth: 1,
                          }}
                          imageStyle={{
                            width: width * 0.28,
                            height: height * 0.146,
                            overflow: 'hidden',
                            borderTopLeftRadius: 15,
                            borderBottomLeftRadius: 15,
                          }}></ImageBackground>
                        {item.propertyType === 'Flat' ? (
                          <View
                            style={{
                              flexDirection: 'column',
                              width: width * 0.9,
                              height: height * 0.03,
                              marginTop: 6,
                            }}>
                            <View
                              style={{
                                width: width * 0.45,
                                height: height * 0.015,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  height: height * 0.02,
                                  width: width * 0.45,
                                  marginLeft: 10,
                                  fontWeight: '200',
                                  fontSize: 10,
                                  color: Color.BLACK,
                                }}>
                                Basic Plan | Valid Till: Nov 27,2023
                              </Text>
                              {/* <MaterialCommunityIcons
                                name="dots-vertical"
                                size={15}
                                color="black"
                                style={{textAlign: 'right', width: width * 0.1}}
                              /> */}
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                height: height * 0.075,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  width: width * 0.42,
                                  height: 15,
                                  marginTop: 10,
                                }}>
                                <Text
                                  style={{
                                    height: height * 0.02,
                                    width: 'auto',
                                    marginLeft: 10,
                                    fontWeight: '500',
                                    color: Color.BLACK,
                                  }}>
                                  {item.propertyType} for rent
                                </Text>
                                <Text
                                  style={{
                                    height: height * 0.02,
                                    width: 'auto',
                                    marginLeft: 10,
                                    fontSize: 11,
                                    color: Color.BLACK,
                                  }}>
                                  {' '}
                                  {item.location}
                                </Text>
                                <Text
                                  style={{
                                    height: height * 0.02,
                                    width: 'auto',
                                    marginLeft: 12,
                                    fontSize: responsiveFontSize(1.5),
                                    color: Color.BLACK,
                                  }}>
                                  {' '}
                                  ₹ {item.rent}
                                </Text>
                              </View>
                              <TouchableOpacity
                                style={{
                                  flexDirection: 'column',
                                  // borderColor: Color.colorDimgray_100,
                                  borderColor: 'rgba(224, 224, 224, 0.87)',

                                  backgroundColor: 'white',
                                  // paddingVertical: 4,
                                  marginTop: height * 0.02,
                                  borderWidth: 1,
                                  borderRadius: 6,
                                  elevation: 1,
                                  marginRight: 8,
                                  marginLeft: -5,
                                  height: height * 0.035,
                                }}
                                onPress={() => showDatePicker(item)}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(0.8),
                                    textAlign: 'center',
                                    borderBottomWidth: 0.5,
                                    width: '100%',
                                    paddingHorizontal: 6,
                                    paddingBottom: 2,
                                    color: Color.BLACK,
                                  }}>
                                  Availability from
                                </Text>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(0.8),
                                    textAlign: 'center',
                                    paddingBottom: 2,
                                    paddingVertical: 2,
                                    color: Color.BLACK,
                                  }}>
                                  {formatDate(item.availableFrom)}{' '}
                                  <MaterialCommunityIcons
                                    name="pencil-outline"
                                    size={8}
                                    color="#000000"
                                    style={{marginLeft: 2}}
                                  />
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: width * 0.9,
                                height: 30,
                                marginTop: height * 0.005,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '45%',
                                  height: 15,
                                  marginTop: 6,
                                  marginLeft: 10,
                                }}>
                                {/* <TouchableOpacity>
                                  <Text
                                    style={{
                                      height: height * 0.02,
                                      width: 'auto',
                                      marginLeft: 10,
                                      fontSize: 10,
                                      textDecorationLine: 'underline',
                                      color: Color.BLACK,
                                    }}>
                                    Edit
                                  </Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity>
                                  <Text
                                    style={{
                                      height: 20,
                                      width: 'auto',
                                      // marginLeft: 20,
                                      fontSize: 10,
                                      textDecorationLine: 'underline',
                                      color: Color.BLACK,
                                    }}>
                                    Deactivate
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                style={{
                                  width: '100%',
                                  height: 25,
                                  backgroundColor: Color.colorRoyalblue_100,
                                  borderRadius: 5,
                                  marginTop: -4,
                                }}>
                                <Text
                                  style={{
                                    width: '100%',
                                    color: 'white',
                                    fontSize: 11,
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                  }}>
                                  Upgrade
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : item.propertyType === 'PG' ? (
                          getFirstNonZeroRent(item) && (
                            <View
                              style={{
                                flexDirection: 'column',
                                width: width * 0.9,
                                height: height * 0.03,
                                marginTop: 6,
                                // borderWidth: 1,
                              }}>
                              <View
                                style={{
                                  width: width * 0.45,
                                  height: height * 0.015,
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    height: height * 0.02,
                                    width: width * 0.45,
                                    marginLeft: 10,
                                    fontWeight: '200',
                                    fontSize: 10,
                                    color: Color.BLACK,
                                  }}>
                                  Basic Plan | Valid Till: Nov 27,2023
                                </Text>
                                {/* <MaterialCommunityIcons
                                  name="dots-vertical"
                                  size={15}
                                  color="black"
                                  style={{
                                    textAlign: 'right',
                                    width: width * 0.1,
                                  }}
                                /> */}
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  height: height * 0.075,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'column',
                                    width: width * 0.42,
                                    height: 15,
                                    marginTop: 10,
                                  }}>
                                  <Text
                                    style={{
                                      height: height * 0.02,
                                      width: 'auto',
                                      marginLeft: 10,
                                      fontWeight: '500',
                                      color: Color.BLACK,
                                    }}>
                                    {item.propertyType} for rent
                                  </Text>
                                  <Text
                                    style={{
                                      height: height * 0.02,
                                      width: 'auto',
                                      marginLeft: 10,
                                      fontSize: 11,
                                      color: Color.BLACK,
                                    }}>
                                    {' '}
                                    {item.location}
                                  </Text>

                                  <Text
                                    style={{
                                      height: height * 0.02,
                                      width: 'auto',
                                      marginLeft: 12,
                                      fontSize: responsiveFontSize(1.5),
                                    }}>
                                    {' '}
                                    ₹ {getFirstNonZeroRent(item)}{' '}
                                    <Text style={{fontSize: 10}}>
                                      Starting from
                                    </Text>
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  style={{
                                    flexDirection: 'column',
                                    // borderColor: Color.colorDimgray_100,
                                    borderColor: 'rgba(224, 224, 224, 0.87)',

                                    backgroundColor: 'white',
                                    // paddingVertical: 4,
                                    marginTop: height * 0.02,
                                    borderWidth: 1,
                                    borderRadius: 6,
                                    elevation: 1,
                                    marginRight: 8,
                                    marginLeft: -5,
                                    height: height * 0.035,
                                  }}
                                  onPress={() => showDatePicker(item)}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(0.8),
                                      textAlign: 'center',
                                      borderBottomWidth: 0.5,
                                      width: '100%',
                                      paddingHorizontal: 6,
                                      paddingBottom: 2,
                                      color: Color.BLACK,
                                    }}>
                                    Availability from
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(0.8),
                                      textAlign: 'center',
                                      paddingBottom: 2,
                                      paddingVertical: 2,
                                      color: Color.BLACK,
                                    }}>
                                    {formatDate(item.availableFrom)}{' '}
                                    <MaterialCommunityIcons
                                      name="pencil-outline"
                                      size={8}
                                      color="#000000"
                                      style={{marginLeft: 2}}
                                    />
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: width * 0.9,
                                  height: 30,
                                  marginTop: height * 0.005,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    width: '45%',
                                    height: 15,
                                    marginTop: 6,
                                    marginLeft: 10,
                                  }}>
                                  {/* <TouchableOpacity>
                                    <Text
                                      style={{
                                        height: height * 0.02,
                                        width: 'auto',
                                        marginLeft: 10,
                                        fontSize: 10,
                                        textDecorationLine: 'underline',
                                        color: Color.BLACK,
                                      }}>
                                      Edit
                                    </Text>
                                  </TouchableOpacity> */}
                                  <TouchableOpacity>
                                    <Text
                                      style={{
                                        height: 20,
                                        width: 'auto',
                                        // marginLeft: 20,
                                        fontSize: 10,
                                        textDecorationLine: 'underline',
                                        color: Color.BLACK,
                                      }}>
                                      Deactivate
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                  style={{
                                    width: '100%',
                                    height: 25,
                                    backgroundColor: Color.colorRoyalblue_100,
                                    borderRadius: 5,
                                    marginTop: -4,
                                  }}>
                                  <Text
                                    style={{
                                      width: '100%',
                                      color: 'white',
                                      fontSize: 11,
                                      paddingHorizontal: 6,
                                      paddingVertical: 4,
                                    }}>
                                    Upgrade
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirmDate}
                  onCancel={hideDatePicker}
                />
              </ScrollView>
            )}

            {activeTab === 'Property Performance' && (
              <View>
                <View
                  style={{
                    height: height * 0.055,
                    elevation: 2,
                    backgroundColor: '#FFF',
                    marginHorizontal: 10,
                    marginTop: 10,
                    borderRadius: 2,
                    marginBottom: 6,
                    width: width * 0.9,
                    borderLeftWidth: 2,
                    borderLeftColor: Color.colorRoyalblue_100,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: width * 0.9,
                      alignContent: 'center',
                    }}>
                    <View
                      style={{
                        width: width * 0.4,
                        marginVertical: 8,
                        marginHorizontal: 2,
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.2),
                            marginLeft: 5,
                          }}>
                          Your Property Performance
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 11,
                            marginLeft: 5,
                            marginTop: 1,
                            color: Color.textC,
                          }}>
                          Last updated on: 28th sep
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: width * 0.4,
                        marginVertical: 10,
                        marginHorizontal: 5,
                      }}>
                      <View>
                        <Text style={{fontSize: 10, marginLeft: 5}}>
                          Property Performance -
                          <Text style={{color: Color.colorRoyalblue_100}}>
                            {' '}
                            Low
                          </Text>
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 10,
                            marginLeft: 5,
                            marginTop: 1,
                            color: Color.textC,
                          }}>
                          Improve Performance -
                        </Text>
                      </View>
                    </View>
                    <View style={{width: '15%'}}></View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                    marginTop: 15,
                    width: width * 0.9,
                    justifyContent: 'flex-start',
                  }}>
                  <View style={{width: '20%', marginLeft: 20}}>
                    <Image
                      source={require('../image/king.jpg')}
                      style={{height: height * 0.035, width: height * 0.035}}
                    />
                  </View>
                  <View style={{width: width * 0.65}}>
                    <Text
                      style={{fontSize: 14, color: Color.colorRoyalblue_100}}>
                      Boost Your Property Performance With BachelorCave Prime
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: width * 0.9,
                    marginHorizontal: 14,
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      height: height * 0.16,
                      width: width * 0.4,
                      backgroundColor: Color.GREY,
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        height: 30,
                        width: '100%',
                        backgroundColor: Color.WHITE,
                        borderWidth: 0.5,
                        borderRadius: 5,
                        borderColor: Color.textC,
                        flexDirection: 'row',
                        paddingVertical: 5,
                        marginBottom: 5,
                      }}>
                      <View style={{width: '60%'}}>
                        <Text
                          style={{fontSize: responsiveFontSize(1.2), left: 5}}>
                          Free Member
                        </Text>
                      </View>
                      <View style={{width: '25%', right: 0, marginTop: 5}}>
                        <TouchableOpacity
                          style={{
                            width: 'auto',
                            height: 15,
                            backgroundColor: Color.colorRoyalblue_100,
                            borderRadius: 5,
                            marginTop: -4,
                            paddingHorizontal: 2,
                            paddingVertical: 2,
                          }}>
                          <Text
                            style={{
                              width: 'auto',
                              color: 'white',
                              fontSize: 8,
                              paddingHorizontal: 2,
                            }}>
                            Upgrade
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        marginVertical: 5,
                      }}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 10}}>20</Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text style={{fontSize: 10}}>
                          Property Performance{' '}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        marginVertical: 5,
                      }}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 10}}>20</Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text style={{fontSize: 10}}> property Views </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        marginVertical: 5,
                      }}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 10}}>20</Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text style={{fontSize: 10}}> Shortlisted </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        marginVertical: 5,
                      }}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 10}}>20</Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text style={{fontSize: 10}}> Contacted </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      height: height * 0.16,
                      width: width * 0.4,
                      backgroundColor: Color.midblue,
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        height: 30,
                        width: '100%',
                        backgroundColor: Color.WHITE,
                        borderWidth: 0.5,
                        borderRadius: 5,
                        borderColor: Color.textC,
                        flexDirection: 'row',
                        paddingVertical: 5,
                        marginBottom: 5,
                      }}>
                      <View style={{width: '60%'}}>
                        <Text
                          style={{fontSize: responsiveFontSize(1.2), left: 5}}>
                          Premium Member
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        marginVertical: 5,
                      }}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 10}}>20</Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text style={{fontSize: 10}}>
                          Property Performance{' '}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        marginVertical: 5,
                      }}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 10}}>20</Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text style={{fontSize: 10}}> property Views </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        marginVertical: 5,
                      }}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 10}}>20</Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text style={{fontSize: 10}}> Shortlisted </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        marginVertical: 5,
                      }}>
                      <View style={{width: '20%'}}>
                        <Text style={{fontSize: 10}}>20</Text>
                      </View>
                      <View style={{width: '80%'}}>
                        <Text style={{fontSize: 10}}> Contacted </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'Response' && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{height: 'auto', width: '100%'}}>
                {Responses.map((item, index) => (
                  <View style={{width: '100%'}} key={index}>
                    {console.log(
                      'response item ----------------->',
                      item.user.profilePicture,
                    )}
                    <View
                      style={{
                        height: height * 0.12,
                        elevation: 2,
                        backgroundColor: '#FFF',
                        marginHorizontal: 10,
                        marginTop: 10,
                        borderRadius: 8,
                        marginBottom: 6,
                        width: width * 0.9,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '95%',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{width: '20%', height: 50, left: 15}}>
                          <Image
                            source={{
                              uri: `http://93.127.185.101:8005/api/utils/get-image/${item.user.profilePicture}`,
                            }}
                            style={{
                              height: height * 0.05,
                              width: height * 0.05,
                              borderRadius: 50,
                              marginHorizontal: 5,
                              marginVertical: 5,
                            }}
                          />
                        </View>
                        <View style={{width: '40%', marginTop: 10}}>
                          <Text style={{fontSize: responsiveFontSize(1.2)}}>
                            {item.name} Boy
                          </Text>
                          <Text style={{fontSize: 10, color: Color.textC}}>
                            +91{item.mobile}
                          </Text>
                          <Text style={{fontSize: 10, color: Color.textC}}>
                            {item.user.email}
                          </Text>
                        </View>
                        <View style={{marginTop: 10}}>
                          <TouchableOpacity
                            style={{
                              // width: width * 0.,
                              // height: height * 0.02,
                              backgroundColor:
                                item.iscontacted === 'no'
                                  ? Color.colorRoyalblue_100
                                  : Color.WHITE,
                              borderRadius: responsiveWidth(1.5),
                              marginTop: -4,
                              // paddingHorizontal: responsiveWidth(1.5),
                              // paddingVertical: responsiveWidth(1),
                              width: width * 0.15,
                              height: width * 0.055,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderWidth: 1,
                              borderColor: Color.GREY,
                            }}
                            onPress={() => handleContact(item)}>
                            <Text
                              style={{
                                // width: 'auto',
                                color:
                                  item.iscontacted === 'no'
                                    ? Color.WHITE
                                    : Color.colorRoyalblue_100,
                                fontSize: 10,
                                alignSelf: 'center',
                              }}>
                              {item.iscontacted === 'no'
                                ? 'Contact'
                                : 'Contacted'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          width: '90%',
                          justifyContent: 'space-between',
                          marginHorizontal: 15,
                          marginVertical: 10,
                        }}>
                        <View style={{width: '25%', marginTop: 10}}>
                          <TouchableOpacity
                            style={{
                              width: width * 0.15,
                              height: height * 0.02,
                              backgroundColor: Color.WHITE,
                              borderRadius: 5,
                              marginTop: -4,
                              paddingHorizontal: 4,
                              paddingVertical: 2,
                              borderWidth: 1,
                              borderColor: Color.GREY,
                            }}>
                            <Text
                              style={{
                                width: 'auto',
                                color: Color.colorRoyalblue_100,
                                fontSize: responsiveFontSize(1),
                              }}>
                              More Option
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '40%', marginTop: 8}}>
                          <Text
                            style={{
                              color: Color.textC,
                              fontSize: responsiveFontSize(1.2),
                            }}>
                            <Text style={{color: Color.BLACK}}>
                              Received on:
                            </Text>{' '}
                            {formatDate(item.responseDate)}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          <View
            style={{
              height: height * 0.22,
              width: '95%',
              alignItems: 'center',
              backgroundColor: Color.WHITE,
              borderRadius: 10,
              marginHorizontal: 10,
              elevation: 2,
              marginBottom: 10,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                marginTop: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
                width: width * 0.9,
              }}>
              <View>
                <Image
                  source={require('../image/king.jpg')}
                  style={{height: 35, width: 35}}
                />
              </View>
              <View>
                <Text style={{fontSize: responsiveFontSize(1.5)}}>
                  34 Matching Tenants
                </Text>
                <Text>in Kharar, Punjab</Text>
              </View>
              <View>
                <Text>
                  <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: Color.colorRoyalblue_100,
                        fontSize: responsiveFontSize(1.5),
                      }}>
                      View all Tenants
                    </Text>
                    <Entypo
                      name="chevron-small-right"
                      size={20}
                      color={Color.colorRoyalblue_100}
                    />
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                justifyContent: 'space-between',
                width: '94%',
                // borderWidth: 1,
              }}>
              <View
                style={{
                  width: '48%',
                  height: height * 0.13,
                  // borderWidth: 1,
                  elevation: 1,
                  backgroundColor: Color.WHITE,
                  borderRadius: 10,
                }}>
                <View
                  style={{flexDirection: 'row', width: '95%', marginTop: 10}}>
                  <View style={{width: '65%', marginHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontWeight: 500,
                      }}>
                      Shivam
                    </Text>
                  </View>
                  <View style={{width: '25%', right: 5, marginTop: 5}}>
                    <TouchableOpacity
                      style={{
                        width: 53,
                        height: 15,
                        backgroundColor: Color.colorRoyalblue_100,
                        borderRadius: 5,
                        marginTop: -4,
                        paddingHorizontal: 2,
                        paddingVertical: 2,
                      }}>
                      <Text
                        style={{width: 'auto', color: 'white', fontSize: 8}}>
                        Good Match
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    width: '95%',
                    justifyContent: 'space-between',
                    marginHorizontal: 5,
                  }}>
                  <View style={{width: '40%'}}>
                    <Text style={{fontSize: 8}}>Budget</Text>
                  </View>
                  <View style={{width: '40%'}}>
                    <Text style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 8}}>₹ 7,200 - </Text>
                      <Text style={{fontSize: 8}}>₹ 8000</Text>
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    width: '95%',
                    justifyContent: 'space-between',
                    marginHorizontal: 5,
                  }}>
                  <View style={{width: '40%'}}>
                    <Text style={{fontSize: 8}}>Budget</Text>
                  </View>
                  <View style={{width: '40%'}}>
                    <Text style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 8}}>₹ 7,200 - </Text>
                      <Text style={{fontSize: 8}}>₹ 8000</Text>
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    width: '95%',
                    justifyContent: 'space-between',
                    marginHorizontal: 5,
                  }}>
                  <View style={{width: '40%'}}>
                    <Text style={{fontSize: 8}}>Budget</Text>
                  </View>
                  <View style={{width: '40%'}}>
                    <Text style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 8}}>₹ 7,200 - </Text>
                      <Text style={{fontSize: 8}}>₹ 8000</Text>
                    </Text>
                  </View>
                </View>

                <View style={{width: '25%', right: 0, marginTop: 10, left: 5}}>
                  <TouchableOpacity
                    style={{
                      width: 60,
                      height: 15,
                      backgroundColor: Color.WHITE,
                      borderRadius: 5,
                      marginTop: -4,
                      paddingHorizontal: 2,
                      borderWidth: 1,
                      borderColor: Color.GREY,
                    }}>
                    <Text
                      style={{
                        width: 'auto',
                        color: Color.colorRoyalblue_100,
                        fontSize: 8,
                      }}>
                      View Contact
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '48%',
                  height: height * 0.13,
                  // borderWidth: 1,
                  elevation: 1,
                  backgroundColor: Color.WHITE,
                  borderRadius: 10,
                }}>
                <View
                  style={{flexDirection: 'row', width: '95%', marginTop: 10}}>
                  <View style={{width: '65%', marginHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontWeight: 500,
                      }}>
                      Shivam
                    </Text>
                  </View>
                  <View style={{width: '25%', right: 5, marginTop: 5}}>
                    <TouchableOpacity
                      style={{
                        width: 53,
                        height: 15,
                        backgroundColor: Color.colorRoyalblue_100,
                        borderRadius: 5,
                        marginTop: -4,
                        paddingHorizontal: 2,
                        paddingVertical: 2,
                      }}>
                      <Text
                        style={{width: 'auto', color: 'white', fontSize: 8}}>
                        Good Match
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    width: '95%',
                    justifyContent: 'space-between',
                    marginHorizontal: 5,
                  }}>
                  <View style={{width: '40%'}}>
                    <Text style={{fontSize: 8}}>Budget</Text>
                  </View>
                  <View style={{width: '40%'}}>
                    <Text style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 8}}>₹ 7,200 - </Text>
                      <Text style={{fontSize: 8}}>₹ 8000</Text>
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    width: '95%',
                    justifyContent: 'space-between',
                    marginHorizontal: 5,
                  }}>
                  <View style={{width: '40%'}}>
                    <Text style={{fontSize: 8}}>Budget</Text>
                  </View>
                  <View style={{width: '40%'}}>
                    <Text style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 8}}>₹ 7,200 - </Text>
                      <Text style={{fontSize: 8}}>₹ 8000</Text>
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    width: '95%',
                    justifyContent: 'space-between',
                    marginHorizontal: 5,
                  }}>
                  <View style={{width: '40%'}}>
                    <Text style={{fontSize: 8}}>Budget</Text>
                  </View>
                  <View style={{width: '40%'}}>
                    <Text style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 8}}>₹ 7,200 - </Text>
                      <Text style={{fontSize: 8}}>₹ 8000</Text>
                    </Text>
                  </View>
                </View>

                <View style={{width: '25%', right: 0, marginTop: 10, left: 5}}>
                  <TouchableOpacity
                    style={{
                      width: 60,
                      height: 15,
                      backgroundColor: Color.WHITE,
                      borderRadius: 5,
                      marginTop: -4,
                      paddingHorizontal: 2,
                      borderWidth: 1,
                      borderColor: Color.GREY,
                    }}>
                    <Text
                      style={{
                        width: 'auto',
                        color: Color.colorRoyalblue_100,
                        fontSize: 8,
                      }}>
                      View Contact
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('HomeStack1')}>
            <MaterialIcons name="home" size={24} color="#ffffff" />

            <Text style={{color: Color.WHITE, textAlign: 'left', fontSize: 10}}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('MatchingT')}>
            <MaterialIcons name="maps-home-work" size={24} color="#ffffff" />
            <Text style={{color: Color.WHITE, textAlign: 'left', fontSize: 10}}>
              Booked Site Visit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('SProperty')}>
            <MaterialIcons name="add-home" size={24} color="#ffffff" />
            <Text style={{color: Color.WHITE, textAlign: 'left', fontSize: 10}}>
              ListProperties
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 70,
            width: 70,
            backgroundColor: '#0C132A',
            marginVertical: 20,
            borderRadius: 50,
          }}>
          <Image
            source={{
              uri: `http://93.127.185.101:8005/api/utils/get-image/${imagenew.profilePicture}`,
            }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  overlayText1: {
    paddingHorizontal: 5,

    textAlign: 'center',
    fontSize: 7,
    backgroundColor: 'rgba(97, 85, 223, 1)',
    opacity: 1,
    fontWeight: '200',
    paddingTop: 5,
    paddingBottom: 6,
    color: 'white',
    borderRadius: 5,
    marginLeft: 6,
    position: 'absolute', // positions the text relative to the parent
    top: 10, // adjusts the text to the bottom of the image
  },
  tabItem: {
    width: '100%',
    alignItems: 'center',
  },
  tabText: {
    fontSize: responsiveFontSize(1.4),
    color: 'black',
  },

  activeTabText: {
    color: 'blue',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
    width: '100%',
  },
  //   loginImage:{
  //     width: 230,
  //     height: 450,
  //     marginTop:70,
  //     borderwidth:4,
  //     borderColor:Color.BLACK,
  //     borderRadius:15
  // },
  subContainer: {
    width: '100%',
    backgroundColor: Color.WHITE,
    height: '90%',
    marginTop: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  navbar: {
    padding: 15,
    height: 80,
    backgroundColor: '#0C132A',
    borderRadius: 22,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    width: '75%',
  },
  circle: {
    backgroundColor: '#0C132A',
    borderRadius: 100,
    height: 80,
    width: '18%',
    marginTop: 10,
    padding: 15,
    marginBottom: 10,
  },
  button2: {
    padding: 15,
    height: 50,
    backgroundColor: Color.YELLOW,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
});
export default OwnerDashboard;

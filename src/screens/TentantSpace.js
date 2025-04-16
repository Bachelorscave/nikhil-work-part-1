import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Linking,
  Platform,
  ToastAndroid,
} from 'react-native';

import HeaderT from '../components/main/Tentantheader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import Color from '../Utils/Colors';
import {
  BookSiteVisit,
  Myresponses,
  shortlisted,
  updateContact,
} from '../apiservice/OwnerApi';
import Colors from '../Utils/Colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {FontFamily} from '../../GlobalStyles';
const {width, height} = Dimensions.get('window');

function TentantSpace(props) {
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState('All Request');
  const [listing, setListing] = useState([]);
  const [Shortlisted, setShorlisted] = useState([]);
  const [Contacted, setContacted] = useState([]);
  const handleTabClick = tabName => {
    setActiveTab(tabName);
  };

  const fetchData = useCallback(async () => {
    try {
      const jsonData = await Myresponses();
      if (jsonData) {
        setListing(jsonData);
        console.log('Listing:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);
  const fetchShortlisted = useCallback(async () => {
    try {
      const jsonData = await shortlisted();
      if (jsonData) {
        setShorlisted(jsonData);
        console.log('Shortlisted:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(
    () => {
      fetchData();
      fetchShortlisted();
    },
    [fetchData, refresh],
    [fetchShortlisted, refresh],
  );

  useEffect(() => {
    const filteredContacted = listing.filter(
      item => item.isContacted === 'yes',
    );

    setContacted(filteredContacted);
  }, [listing]);

  console.log('-------------->-------> contacted', Contacted);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const value = await AsyncStorage.getItem('Name');
        if (value !== null) {
          setUser(value);
          console.log('Name: ', value);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const getFirstNonZeroRent = item => {
    if (item.propertyDetails.rent.single !== 0)
      return item.propertyDetails.rent.single;
    if (item.propertyDetails.rent.double !== 0)
      return item.propertyDetails.rent.double;
    if (item.propertyDetails.rent.triple !== 0)
      return item.propertyDetails.rent.triple;
    if (item.propertyDetails.rent.four !== 0)
      return item.propertyDetails.rent.four;
    return null; // Return null if all are zero
  };

  const makeCall = number => {
    console.log('hello');
    ToastAndroid.showWithGravityAndOffset(
      'Opening Dialer!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const handleBooking = async (type, id) => {
    console.log('checking id ::::------------>', type);
    console.log('checking id ::::------------>', id);
    //  Make the API call to update the contact status
    try {
      const response = await BookSiteVisit(type, id);
      console.log(response);
      if (response.status === 201) {
        console.log('successfull work');
        ToastAndroid.showWithGravityAndOffset(
          'Booking Site Cancelled!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        setRefresh(prev => !prev);
      }
      if (response.status === 200) {
        console.log('successfull done');
        ToastAndroid.showWithGravityAndOffset(
          'Booked Site Visit!',
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

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <HeaderT style={{marginTop: height * 0.02}} />

      <View
        style={{
          height: height * 0.145,
          width: '95%',
          borderWidth: 1,
          borderColor: Color.GREY,
          borderRadius: 5,
        }}>
        <View style={{flexDirection: 'row', width: '100%', marginVertical: 5}}>
          <View
            style={{
              width: '70%',
              height: height * 0.12,
              borderRightWidth: 1,
              flexDirection: 'column',
              borderRightColor: Color.GREY,
              borderLeftColor: Color.colorRoyalblue_100,
              borderLeftWidth: 2,
            }}>
            <Text
              style={{
                marginLeft: 15,
                color: Color.colorRoyalblue_100,
                marginTop: 4,
                fontFamily: FontFamily.interMedium,
                fontSize: responsiveFontSize(1.5),
              }}>
              Hi {user}, welcome to Bachelor’sCave
            </Text>
            <Text
              style={{
                marginLeft: 15,
                fontFamily: FontFamily.interRegular,
                fontSize: responsiveFontSize(1.2),
                marginTop: 4,
                marginRight: 20,
                color: Color.BLACK,
              }}>
              Follow our guide to get started on platform,our guaranteed,
              last-minute cancelling, everything is there!
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={{
                backgroundColor: 'rgba(97, 85, 233, 100)',

                borderRadius: 8,
                marginLeft: 15,
                // paddingHorizontal: 5,
                paddingVertical: 5,
                width: responsiveWidth(26),
                top: responsiveWidth(2.5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: FontFamily.interMedium,
                  fontSize: responsiveFontSize(1.2),
                }}>
                Discover Our Guide
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '30%',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="contact-support"
              color={Color.colorRoyalblue_100}
              size={24}
              style={{marginTop: 20}}
            />
            <Text
              style={{
                marginLeft: 15,
                marginTop: 4,
                fontFamily: FontFamily.interSemiBold,
                fontSize: responsiveFontSize(1.25),
                color: Colors.BLACK,
              }}>
              Need Help ?
            </Text>
            <Text
              style={{
                marginLeft: 15,
                fontFamily: FontFamily.interSemiBold,
                fontSize: responsiveFontSize(1.25),
                marginTop: 4,
                color: Colors.BLACK,
              }}>
              Send Us Message
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#FFF',
          height: 'auto',
          width: width * 0.95,
          borderWidth: 1,
          borderColor: Color.GREY,
          marginTop: 20,
          borderRadius: 6,
          elevation: 1,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            width: '100%',
            marginHorizontal: 5,
            height: height * 0.05,
          }}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'All Request']}
              onPress={() => handleTabClick('All Request')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'All Request' && styles.activeTabText,
                ]}>
                All Request
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'Contacted']}
              onPress={() => handleTabClick('Contacted')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Contacted' && styles.activeTabText,
                ]}>
                Contacted
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'Shortlist']}
              onPress={() => handleTabClick('Shortlist')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Shortlist' && styles.activeTabText,
                ]}>
                Shortlist
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {activeTab === 'All Request' && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            {listing.map((item, index) => (
              <TouchableOpacity
                // onPress={()=>navigation.navigate("Login")}
                key={index}
                style={{
                  height: height * 0.145,
                  elevation: 3,
                  backgroundColor: '#FFF',
                  // borderWidth: 1,
                  marginHorizontal: 10,
                  marginTop: 20,
                  borderRadius: 15,
                  marginBottom: 6,
                  width: width * 0.9,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <ImageBackground
                    source={{
                      uri: `http://93.127.185.101:8005/api/utils/get-image/${item.propertyDetails.photos[0]}`,
                    }}
                    style={{
                      width: width * 0.26,
                      height: height * 0.14,
                      marginRight: 5,
                    }}
                    imageStyle={{
                      width: width * 0.26,
                      height: height * 0.145,
                      overflow: 'hidden',
                      borderTopLeftRadius: 15,
                      borderBottomLeftRadius: 15,
                    }}>
                    <Text style={styles.overlayText1}>
                      {item.propertyDetails.preferredTenant}
                    </Text>
                  </ImageBackground>
                  {item.propertyDetails.type === 'Flat' ? (
                    <View
                      style={{
                        flexDirection: 'column',
                        width: width * 0.62,
                        height: height * 0.03,
                        marginTop: 4,
                        // borderWidth: 1,
                      }}>
                      <View
                        style={{
                          width: width,
                          height: 10,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            // height: 12,
                            width: width * 0.55,
                            marginLeft: 18,
                            // fontWeight: '200',
                            // fontSize: 8,
                            fontFamily: FontFamily.interRegular,
                            fontSize: responsiveFontSize(1),
                            textAlign: 'right',
                            color: Color.BLACK,
                          }}>
                          {item.propertyResponseDate}
                        </Text>
                      </View>

                      <View
                        style={{flexDirection: 'row', height: height * 0.08}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '50%',
                            height: 15,
                            marginTop: 4,
                            // borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 10,
                              // fontWeight: '500',
                              fontFamily: FontFamily.interBold,
                              fontSize: responsiveFontSize(1.6),
                              color: Color.BLACK,
                            }}>
                            {item.propertyDetails.bhkType}{' '}
                            {item.propertyDetails.type} for Rent
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 10,
                              fontSize: 11,
                              color: Color.BLACK,
                              fontFamily: FontFamily.interMedium,
                              fontSize: responsiveFontSize(1.2),
                            }}>
                            {item.propertyDetails.location}
                          </Text>
                          <Text
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 12,
                              // fontSize: 15,
                              marginTop: 10,
                              color: Color.BLACK,
                              fontFamily: FontFamily.interSemiBold,
                              fontSize: responsiveFontSize(1.6),
                            }}>
                            ₹ {item.propertyDetails.rent}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            borderColor: Color.colorDimgray_100,
                            backgroundColor: 'white',
                            paddingVertical: 4,
                            marginTop: 25,
                            // marginLeft: -15,
                            height: 35,
                            // borderWidth: 1,
                            marginLeft: responsiveWidth(10),
                          }}>
                          <Text
                            style={{
                              // fontSize: 10,
                              textAlign: 'center',
                              borderBottomWidth: 0.5,
                              width: '100%',
                              paddingHorizontal: 6,
                              paddingBottom: 2,
                              color: Color.BLACK,
                              fontFamily: FontFamily.interMedium,
                              fontSize: responsiveFontSize(1.2),
                            }}>
                            {item.ownerDetails.ownerName}
                          </Text>
                          <Text
                            style={{
                              // fontSize: 10,
                              textAlign: 'center',
                              paddingBottom: 2,
                              paddingVertical: 2,
                              color: Color.BLACK,
                              fontFamily: FontFamily.interMedium,
                              fontSize: responsiveFontSize(1.2),
                            }}>
                            +91{item.ownerDetails.ownerMobile}
                            {/* +91-9876543210 */}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          height: 30,
                          marginTop: 3,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingRight: responsiveWidth(1.5),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '30%',
                            height: 15,
                            marginTop: 6,
                            marginLeft: 10,
                          }}>
                          <TouchableOpacity style={{flexDirection: 'row'}}>
                            <MaterialIcons
                              name="photo-library"
                              size={14}
                              color="#000000"
                              style={{marginRight: 5}}
                            />
                            <Text
                              style={{
                                height: 20,
                                width: 120,
                                marginLeft: 2,
                                fontSize: 10,
                                textDecorationLine: 'underline',
                                color: Color.BLACK,
                                fontFamily: FontFamily.interMedium,
                                fontSize: responsiveFontSize(1.2),
                              }}>
                              See Photos
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{marginRight: 5}}>
                            <TouchableOpacity
                              style={{
                                width: '100%',
                                // height: 20,
                                backgroundColor: item.isSiteVisitBooked
                                  ? Color.colorRoyalblue_100
                                  : Color.WHITE,
                                borderRadius: 5,
                                borderWidth: 1,
                                // marginTop: -2,
                                borderColor: Color.GREY,
                              }}
                              onPress={() =>
                                handleBooking(
                                  item.propertyDetails.type,
                                  item.propertyDetails.propertyId,
                                )
                              }>
                              <Text
                                style={{
                                  width: '100%',
                                  color: item.isSiteVisitBooked
                                    ? Color.WHITE
                                    : Color.colorRoyalblue_100,
                                  fontSize: 8,
                                  paddingHorizontal: responsiveWidth(0.75),
                                  paddingVertical: responsiveWidth(0.5),
                                  fontFamily: FontFamily.interRegular,
                                  fontSize: responsiveFontSize(1.2),
                                }}>
                                {item.isSiteVisitBooked
                                  ? 'Book Visit'
                                  : 'Booked'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity
                              style={{
                                width: 'auto',
                                // height: 20,
                                backgroundColor:
                                  item.isContacted === 'no'
                                    ? Color.colorRoyalblue_100
                                    : Color.WHITE,
                                borderRadius: 5,
                                // marginTop: -2,
                                borderWidth: 1,
                                borderColor: Color.GREY,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              onPress={() =>
                                makeCall(item.ownerDetails.ownerMobile)
                              }>
                              <Text
                                style={{
                                  width: '100%',
                                  color:
                                    item.isContacted === 'no'
                                      ? Color.WHITE
                                      : Color.colorRoyalblue_100,
                                  fontSize: 8,

                                  paddingHorizontal: responsiveWidth(0.75),
                                  paddingVertical: responsiveWidth(0.5),
                                  fontFamily: FontFamily.interRegular,
                                  fontSize: responsiveFontSize(1.2),
                                  alignSelf: 'center',
                                  textAlignVertical: 'center',
                                }}>
                                {item.isContacted === 'no'
                                  ? 'Contact'
                                  : 'Contacted'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : item.propertyDetails.type === 'PG' ? (
                    getFirstNonZeroRent(item) && (
                      <View
                        style={{
                          flexDirection: 'column',
                          width: width * 0.62,
                          height: height * 0.03,
                          marginTop: 4,
                          // borderWidth: 1,
                        }}>
                        <View
                          style={{
                            width: width,
                            height: 10,
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              // height: 12,
                              width: width * 0.55,
                              marginLeft: 18,
                              // fontWeight: '200',
                              // fontSize: 8,
                              fontFamily: FontFamily.interRegular,
                              fontSize: responsiveFontSize(1),
                              textAlign: 'right',
                              color: Color.BLACK,
                            }}>
                            {item.propertyResponseDate}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', height: height * 0.08}}>
                          <View
                            style={{
                              flexDirection: 'column',
                              width: '50%',
                              height: 15,
                              marginTop: 4,
                            }}>
                            <Text
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 10,
                                fontFamily: FontFamily.interBold,
                                fontSize: responsiveFontSize(1.6),
                                color: Color.BLACK,
                              }}>
                              {item.propertyDetails.name}{' '}
                              {item.propertyDetails.type} for Stay
                            </Text>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 10,
                                fontSize: 11,
                                color: Color.BLACK,
                                fontFamily: FontFamily.interMedium,
                                fontSize: responsiveFontSize(1.2),
                              }}>
                              {item.propertyDetails.location}
                            </Text>
                            <Text
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 12,
                                fontSize: 15,
                                marginTop: 10,
                                color: Color.BLACK,
                                fontFamily: FontFamily.interSemiBold,
                                fontSize: responsiveFontSize(1.6),
                              }}>
                              ₹ {getFirstNonZeroRent(item)}{' '}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              borderColor: Color.colorDimgray_100,
                              backgroundColor: 'white',
                              paddingVertical: 4,
                              marginTop: 25,
                              // marginLeft: -15,
                              height: 35,
                              marginLeft: responsiveWidth(10),
                              // borderWidth: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: 10,
                                textAlign: 'center',
                                borderBottomWidth: 0.5,
                                width: '100%',
                                paddingHorizontal: 6,
                                paddingBottom: 2,
                                color: Color.BLACK,
                                fontFamily: FontFamily.interMedium,
                                fontSize: responsiveFontSize(1.2),
                              }}>
                              {item.ownerDetails.ownerName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                textAlign: 'center',
                                paddingBottom: 2,
                                paddingVertical: 2,
                                color: Color.BLACK,
                                fontFamily: FontFamily.interMedium,
                                fontSize: responsiveFontSize(1.2),
                              }}>
                              +91{item.ownerDetails.ownerMobile}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 30,
                            marginTop: 3,
                            // borderWidth: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingRight: responsiveWidth(1.5),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '30%',
                              height: 15,
                              marginTop: 6,
                              marginLeft: 10,
                            }}>
                            <TouchableOpacity style={{flexDirection: 'row'}}>
                              <MaterialIcons
                                name="photo-library"
                                size={14}
                                color="#000000"
                                style={{marginRight: 5}}
                              />
                              <Text
                                style={{
                                  height: 20,
                                  width: 120,
                                  marginLeft: 2,
                                  fontSize: 10,
                                  color: Color.BLACK,

                                  textDecorationLine: 'underline',
                                  fontFamily: FontFamily.interMedium,
                                  fontSize: responsiveFontSize(1.2),
                                }}>
                                See Photos
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{marginRight: 5}}>
                              <TouchableOpacity
                                style={{
                                  width: '100%',
                                  // height: 20,
                                  backgroundColor: item.isSiteVisitBooked
                                    ? Color.WHITE
                                    : Color.colorRoyalblue_100,
                                  borderRadius: 5,
                                  // marginTop: -2,
                                  borderColor: Color.GREY,
                                  borderWidth: 1,
                                }}
                                onPress={() =>
                                  handleBooking(
                                    item.propertyDetails.type,
                                    item.propertyDetails.propertyId,
                                  )
                                }>
                                <Text
                                  style={{
                                    width: '100%',
                                    color: item.isSiteVisitBooked
                                      ? Color.colorRoyalblue_100
                                      : Color.WHITE,
                                    fontSize: 8,
                                    paddingHorizontal: responsiveWidth(0.75),
                                    paddingVertical: responsiveWidth(0.5),
                                    fontFamily: FontFamily.interRegular,
                                    fontSize: responsiveFontSize(1.2),
                                  }}>
                                  {item.isSiteVisitBooked
                                    ? 'Booked'
                                    : 'Book Visit'}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View>
                              <TouchableOpacity
                                style={{
                                  width: 'auto',
                                  // height: 20,
                                  backgroundColor:
                                    item.isContacted === 'no'
                                      ? Color.colorRoyalblue_100
                                      : Color.WHITE,
                                  borderRadius: 5,
                                  // marginTop: -2,
                                  borderWidth: 1,
                                  borderColor: Color.GREY,
                                }}
                                onPress={() =>
                                  makeCall(item.ownerDetails.ownerMobile)
                                }>
                                <Text
                                  style={{
                                    width: '100%',
                                    color:
                                      item.isContacted === 'no'
                                        ? Color.WHITE
                                        : Color.colorRoyalblue_100,
                                    fontSize: 8,
                                    paddingHorizontal: responsiveWidth(0.75),
                                    paddingVertical: responsiveWidth(0.5),
                                    fontFamily: FontFamily.interRegular,
                                    fontSize: responsiveFontSize(1.2),
                                  }}>
                                  {item.isContacted === 'no'
                                    ? 'Contact'
                                    : 'Contacted'}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {activeTab === 'Contacted' && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            {Contacted.map((item, index) => (
              <TouchableOpacity
                // onPress={()=>navigation.navigate("Login")}
                key={index}
                style={{
                  height: height * 0.145,
                  elevation: 3,
                  backgroundColor: '#FFF',

                  marginHorizontal: 10,
                  marginTop: 20,
                  borderRadius: 15,
                  marginBottom: 6,
                  width: '95%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <ImageBackground
                    source={{
                      uri: `http://93.127.185.101:8005/api/utils/get-image/${item.propertyDetails.photos[0]}`,
                    }}
                    style={{
                      width: width * 0.26,
                      height: height * 0.14,
                      marginRight: 5,
                    }}
                    imageStyle={{
                      width: width * 0.26,
                      height: height * 0.145,
                      overflow: 'hidden',
                      borderTopLeftRadius: 15,
                      borderBottomLeftRadius: 15,
                    }}>
                    <Text style={styles.overlayText1}>
                      {item.propertyDetails.preferredTenant}
                    </Text>
                  </ImageBackground>
                  {item.propertyDetails.type === 'Flat' ? (
                    <View
                      style={{
                        flexDirection: 'column',
                        width: width,
                        height: height * 0.03,
                        marginTop: 4,
                      }}>
                      <View
                        style={{
                          width: width * 0.58,
                          height: 10,
                          flexDirection: 'row',
                          // borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            height: 12,
                            width: width * 0.52,
                            marginLeft: 18,
                            fontWeight: '200',
                            fontSize: 8,
                            textAlign: 'right',
                            color: Color.BLACK,
                            // borderWidth: 1,
                          }}>
                          {item.propertyResponseDate}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', height: height * 0.08}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            // width: '50%',
                            width: width * 0.35,
                            height: 15,
                            marginTop: 4,
                            // borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              height: 20,

                              marginLeft: 10,
                              fontWeight: '500',
                              color: Color.BLACK,
                            }}>
                            {item.propertyDetails.bhkType}{' '}
                            {item.propertyDetails.type} for Rent
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              height: 20,
                              // borderWidth: 1,
                              marginLeft: 10,
                              fontSize: 11,
                              color: Color.BLACK,
                            }}>
                            {' '}
                            {item.propertyDetails.location}
                          </Text>
                          <Text
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 12,
                              fontSize: 15,
                              marginTop: 10,
                              color: Color.BLACK,
                            }}>
                            {' '}
                            ₹ {item.propertyDetails.rent}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            borderColor: Color.colorDimgray_100,
                            backgroundColor: 'white',
                            paddingVertical: 4,
                            marginTop: 25,
                            // marginLeft: -15,
                            marginLeft: responsiveWidth(2),
                            height: 35,
                            // borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              fontSize: 10,
                              textAlign: 'center',
                              borderBottomWidth: 0.5,
                              // width: '100%',
                              paddingHorizontal: 6,
                              paddingBottom: 2,
                              color: Color.BLACK,
                            }}>
                            {item.ownerDetails.ownerName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              textAlign: 'center',
                              paddingBottom: 2,
                              paddingVertical: 2,
                              color: Color.BLACK,
                            }}>
                            +91{item.ownerDetails.ownerMobile}
                            {/* +91-9876543210 */}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '60%',
                          height: 30,
                          marginTop: 3,
                          // borderWidth: 1,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '30%',
                            height: 15,
                            marginTop: 6,
                            marginLeft: 10,
                            // borderWidth: 1,
                          }}>
                          <TouchableOpacity style={{flexDirection: 'row'}}>
                            <MaterialIcons
                              name="photo-library"
                              size={14}
                              color="#000000"
                              style={{marginRight: 5}}
                            />
                            <Text
                              style={{
                                height: 20,
                                marginLeft: 2,
                                fontSize: 10,
                                textDecorationLine: 'underline',
                                color: Color.BLACK,
                                // borderWidth: 1,
                              }}>
                              See Photos
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{marginRight: 5}}>
                            <TouchableOpacity
                              style={{
                                width: '100%',
                                // borderWidth: 1,
                                height: 20,
                                backgroundColor: item.isSiteVisitBooked
                                  ? Color.colorRoyalblue_100
                                  : Color.WHITE,
                                borderRadius: 5,
                                marginTop: -2,
                                borderColor: Color.GREY,
                              }}
                              onPress={() =>
                                handleBooking(
                                  item.propertyDetails.type,
                                  item.propertyDetails.propertyId,
                                )
                              }>
                              <Text
                                style={{
                                  width: '100%',
                                  // borderWidth: 1,
                                  color: item.isSiteVisitBooked
                                    ? Color.WHITE
                                    : Color.colorRoyalblue_100,
                                  fontSize: 8,
                                  paddingHorizontal: 6,
                                  paddingVertical: 4,
                                }}>
                                {item.isSiteVisitBooked
                                  ? 'Book Visit'
                                  : 'Booked'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity
                              style={{
                                width: 'auto',
                                height: 20,
                                backgroundColor:
                                  item.isContacted === 'no'
                                    ? Color.colorRoyalblue_100
                                    : Color.WHITE,
                                borderRadius: 5,
                                marginTop: -2,
                                borderWidth: 0.5,
                                borderColor: Color.GREY,
                              }}
                              onPress={() =>
                                makeCall(item.ownerDetails.ownerMobile)
                              }>
                              <Text
                                style={{
                                  width: '100%',
                                  color:
                                    item.isContacted === 'no'
                                      ? Color.WHITE
                                      : Color.colorRoyalblue_100,
                                  fontSize: 8,
                                  paddingHorizontal: 6,
                                  paddingVertical: 4,
                                }}>
                                {item.isContacted === 'no'
                                  ? 'Contact'
                                  : 'Contacted'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : item.propertyDetails.type === 'PG' ? (
                    getFirstNonZeroRent(item) && (
                      <View
                        style={{
                          flexDirection: 'column',
                          width: width,
                          height: height * 0.03,
                          marginTop: 4,
                        }}>
                        <View
                          style={{
                            width: width * 0.52,
                            height: 10,
                            flexDirection: 'row',
                            // borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              height: 12,
                              width: width * 0.52,
                              marginLeft: 18,
                              fontWeight: '200',
                              fontSize: 8,
                              textAlign: 'right',
                              color: Color.BLACK,
                              // borderWidth: 1,
                            }}>
                            {item.propertyResponseDate}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', height: height * 0.08}}>
                          <View
                            style={{
                              flexDirection: 'column',
                              width: width * 0.35,

                              height: 15,
                              marginTop: 4,
                            }}>
                            <Text
                              style={{
                                height: 20,
                                // width: 'auto',
                                // width: width * 0.35,
                                // borderWidth: 1,
                                marginLeft: 10,
                                fontWeight: '500',
                                color: Color.BLACK,
                              }}>
                              {item.propertyDetails.name}{' '}
                              {item.propertyDetails.type} for Stay
                            </Text>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                height: 20,
                                width: width * 0.35,
                                // borderWidth: 1,
                                marginLeft: 10,
                                fontSize: 11,
                                color: Color.BLACK,
                              }}>
                              {' '}
                              {item.propertyDetails.location}
                            </Text>
                            <Text
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 12,
                                fontSize: 15,
                                marginTop: 10,
                                color: Color.BLACK,
                              }}>
                              {' '}
                              ₹ {getFirstNonZeroRent(item)}{' '}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              borderColor: Color.colorDimgray_100,
                              backgroundColor: 'white',
                              paddingVertical: 4,
                              marginTop: 25,
                              marginLeft: responsiveWidth(2),
                              height: 35,
                            }}>
                            <Text
                              style={{
                                fontSize: 10,
                                textAlign: 'center',
                                borderBottomWidth: 0.5,
                                width: '100%',
                                paddingHorizontal: 6,
                                paddingBottom: 2,
                                color: Color.BLACK,
                              }}>
                              {item.ownerDetails.ownerName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                textAlign: 'center',
                                paddingBottom: 2,
                                paddingVertical: 2,
                                color: Color.BLACK,
                              }}>
                              +91{item.ownerDetails.ownerMobile}
                              {/* +91-9876543210 */}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '60%',
                            height: 30,
                            marginTop: 3,
                            // borderWidth: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '30%',
                              height: 15,
                              marginTop: 6,
                              marginLeft: 10,
                            }}>
                            <TouchableOpacity style={{flexDirection: 'row'}}>
                              <MaterialIcons
                                name="photo-library"
                                size={14}
                                color="#000000"
                                style={{marginRight: 5}}
                              />
                              <Text
                                style={{
                                  height: 20,
                                  width: 120,
                                  marginLeft: 2,
                                  fontSize: 10,
                                  textDecorationLine: 'underline',
                                }}>
                                See Photos
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{marginRight: 5}}>
                              <TouchableOpacity
                                style={{
                                  width: '100%',
                                  height: 20,
                                  backgroundColor: item.isSiteVisitBooked
                                    ? Color.WHITE
                                    : Color.colorRoyalblue_100,
                                  borderRadius: 5,
                                  marginTop: -2,
                                  borderColor: Color.GREY,
                                  borderWidth: 0.5,
                                }}
                                onPress={() =>
                                  handleBooking(
                                    item.propertyDetails.type,
                                    item.propertyDetails.propertyId,
                                  )
                                }>
                                <Text
                                  style={{
                                    width: '100%',
                                    color: item.isSiteVisitBooked
                                      ? Color.colorRoyalblue_100
                                      : Color.WHITE,
                                    fontSize: 8,
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                  }}>
                                  {item.isSiteVisitBooked
                                    ? 'Booked'
                                    : 'Book Visit'}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View>
                              <TouchableOpacity
                                style={{
                                  width: 'auto',
                                  height: 20,
                                  backgroundColor:
                                    item.isContacted === 'no'
                                      ? Color.colorRoyalblue_100
                                      : Color.WHITE,
                                  borderRadius: 5,
                                  marginTop: -2,
                                  borderWidth: 0.5,
                                  borderColor: Color.GREY,
                                }}
                                onPress={() =>
                                  makeCall(item.ownerDetails.ownerMobile)
                                }>
                                <Text
                                  style={{
                                    width: '100%',
                                    color:
                                      item.isContacted === 'no'
                                        ? Color.WHITE
                                        : Color.colorRoyalblue_100,
                                    fontSize: 8,
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                  }}>
                                  {item.isContacted === 'no'
                                    ? 'Contact'
                                    : 'Contacted'}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {activeTab === 'Shortlist' && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            {Shortlisted.map((item, index) => (
              <TouchableOpacity
                // onPress={()=>navigation.navigate("Login")}
                key={index}
                style={{
                  height: height * 0.145,
                  elevation: 3,
                  backgroundColor: '#FFF',

                  marginHorizontal: 10,
                  marginTop: 20,
                  borderRadius: 15,
                  marginBottom: 6,
                  width: '95%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <ImageBackground
                    source={{
                      uri: `http://93.127.185.101:8005/api/utils/get-image/${item.propertyDetails.photos[0]}`,
                    }}
                    style={{
                      width: width * 0.26,
                      height: height * 0.14,
                      marginRight: 5,
                    }}
                    imageStyle={{
                      width: width * 0.26,
                      height: height * 0.145,
                      overflow: 'hidden',
                      borderTopLeftRadius: 15,
                      borderBottomLeftRadius: 15,
                    }}>
                    <Text style={styles.overlayText1}>
                      {item.propertyDetails.preferredTenant}
                    </Text>
                  </ImageBackground>
                  {item.propertyDetails.type === 'Flat' ? (
                    <View
                      style={{
                        flexDirection: 'column',
                        width: width,
                        height: height * 0.03,
                        marginTop: 4,
                      }}>
                      <View
                        style={{
                          width: width * 0.52,
                          height: 10,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            height: 12,
                            width: width * 0.55,
                            marginLeft: 18,
                            fontWeight: '200',
                            fontSize: 8,
                            textAlign: 'right',
                            color: Color.BLACK,
                          }}>
                          {item.propertyResponseDate}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', height: height * 0.08}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: width * 0.35,
                            height: 15,
                            marginTop: 4,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              height: 20,

                              marginLeft: 10,
                              fontWeight: '500',
                              color: Color.BLACK,
                            }}>
                            {item.propertyDetails.bhkType}{' '}
                            {item.propertyDetails.type} for Rent
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              height: 20,

                              marginLeft: 10,
                              fontSize: 11,
                              color: Color.BLACK,
                            }}>
                            {' '}
                            {item.propertyDetails.location}
                          </Text>
                          <Text
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 12,
                              fontSize: 15,
                              marginTop: 10,
                              color: Color.BLACK,
                            }}>
                            {' '}
                            ₹ {item.propertyDetails.rent}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            borderColor: Color.colorDimgray_100,
                            backgroundColor: 'white',
                            paddingVertical: 4,
                            marginTop: 25,
                            marginLeft: responsiveWidth(2),
                            height: 35,
                          }}>
                          <Text
                            style={{
                              fontSize: 10,
                              textAlign: 'center',
                              borderBottomWidth: 0.5,
                              width: '100%',
                              paddingHorizontal: 6,
                              paddingBottom: 2,
                              color: Color.BLACK,
                            }}>
                            {item.ownerDetails.ownerName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              textAlign: 'center',
                              paddingBottom: 2,
                              paddingVertical: 2,
                              color: Color.BLACK,
                            }}>
                            +91{item.ownerDetails.ownerMobile}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '60%',
                          height: 30,
                          marginTop: 3,
                          // borderWidth: 1,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '30%',
                            height: 15,
                            marginTop: 6,
                            marginLeft: 10,
                          }}>
                          <TouchableOpacity style={{flexDirection: 'row'}}>
                            <MaterialIcons
                              name="photo-library"
                              size={14}
                              color="#000000"
                              style={{marginRight: 5}}
                            />
                            <Text
                              style={{
                                height: 20,
                                width: 120,
                                marginLeft: 2,
                                fontSize: 10,
                                textDecorationLine: 'underline',
                                color: Color.BLACK,
                              }}>
                              See Photos
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{marginRight: 5}}>
                            <TouchableOpacity
                              style={{
                                width: '100%',
                                height: 20,
                                backgroundColor: item.isSiteVisitBooked
                                  ? Color.colorRoyalblue_100
                                  : Color.WHITE,
                                borderRadius: 5,
                                marginTop: -2,
                                borderColor: Color.GREY,
                              }}
                              onPress={() =>
                                handleBooking(
                                  item.propertyDetails.type,
                                  item.propertyDetails.propertyId,
                                )
                              }>
                              <Text
                                style={{
                                  width: '100%',
                                  color: item.isSiteVisitBooked
                                    ? Color.WHITE
                                    : Color.colorRoyalblue_100,
                                  fontSize: 8,
                                  paddingHorizontal: 6,
                                  paddingVertical: 4,
                                }}>
                                {item.isSiteVisitBooked
                                  ? 'Book Visit'
                                  : 'Booked'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity
                              style={{
                                width: 'auto',
                                height: 20,
                                backgroundColor:
                                  item.isContacted === 'no'
                                    ? Color.colorRoyalblue_100
                                    : Color.WHITE,
                                borderRadius: 5,
                                marginTop: -2,
                                borderWidth: 0.5,
                                borderColor: Color.GREY,
                              }}
                              onPress={() =>
                                makeCall(item.ownerDetails.ownerMobile)
                              }>
                              <Text
                                style={{
                                  width: '100%',
                                  color:
                                    item.isContacted === 'no'
                                      ? Color.WHITE
                                      : Color.colorRoyalblue_100,
                                  fontSize: 8,
                                  paddingHorizontal: 6,
                                  paddingVertical: 4,
                                }}>
                                {item.isContacted === 'no'
                                  ? 'Contact'
                                  : 'Contacted'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : item.propertyDetails.type === 'PG' ? (
                    getFirstNonZeroRent(item) && (
                      <View
                        style={{
                          flexDirection: 'column',
                          width: width,
                          height: height * 0.03,
                          marginTop: 4,
                        }}>
                        <View
                          style={{
                            width: width * 0.52,
                            height: 10,
                            flexDirection: 'row',
                            // borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              height: 12,
                              width: width * 0.5,
                              marginLeft: 18,
                              fontWeight: '200',
                              fontSize: 8,
                              textAlign: 'right',
                              color: Color.BLACK,
                            }}>
                            {item.propertyResponseDate}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', height: height * 0.08}}>
                          <View
                            style={{
                              flexDirection: 'column',
                              width: width * 0.35,
                              height: 15,
                              marginTop: 4,
                            }}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                height: 20,

                                marginLeft: 10,
                                fontWeight: '500',
                                color: Color.BLACK,
                              }}>
                              {item.propertyDetails.name}{' '}
                              {item.propertyDetails.type} for Stay
                            </Text>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                height: 20,

                                marginLeft: 10,
                                fontSize: 11,
                                color: Color.BLACK,
                              }}>
                              {' '}
                              {item.propertyDetails.location}
                            </Text>
                            <Text
                              style={{
                                height: 20,
                                width: 'auto',
                                marginLeft: 12,
                                fontSize: 15,
                                marginTop: 10,
                                color: Color.BLACK,
                              }}>
                              {' '}
                              ₹ {getFirstNonZeroRent(item)}{' '}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              borderColor: Color.colorDimgray_100,
                              backgroundColor: 'white',
                              paddingVertical: 4,
                              marginTop: 25,
                              marginLeft: responsiveWidth(2),
                              height: 35,
                              // borderWidth: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: 10,
                                textAlign: 'center',
                                borderBottomWidth: 0.5,
                                width: '100%',
                                paddingHorizontal: 6,
                                paddingBottom: 2,
                                color: Color.BLACK,
                              }}>
                              {item.ownerDetails.ownerName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                textAlign: 'center',
                                paddingBottom: 2,
                                paddingVertical: 2,
                                color: Color.BLACK,
                              }}>
                              +91{item.ownerDetails.ownerMobile}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '60%',
                            height: 30,
                            marginTop: 3,
                            // borderWidth: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '30%',
                              height: 15,
                              marginTop: 6,
                              marginLeft: 10,
                            }}>
                            <TouchableOpacity style={{flexDirection: 'row'}}>
                              <MaterialIcons
                                name="photo-library"
                                size={14}
                                color="#000000"
                                style={{marginRight: 5}}
                              />
                              <Text
                                style={{
                                  height: 20,
                                  width: 120,
                                  marginLeft: 2,
                                  fontSize: 10,
                                  textDecorationLine: 'underline',
                                }}>
                                See Photos
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{marginRight: 5}}>
                              <TouchableOpacity
                                style={{
                                  width: '100%',
                                  height: 20,
                                  backgroundColor: item.isSiteVisitBooked
                                    ? Color.WHITE
                                    : Color.colorRoyalblue_100,
                                  borderRadius: 5,
                                  marginTop: -2,
                                  borderColor: Color.GREY,
                                  borderWidth: 0.5,
                                }}
                                onPress={() =>
                                  handleBooking(
                                    item.propertyDetails.type,
                                    item.propertyDetails.propertyId,
                                  )
                                }>
                                <Text
                                  style={{
                                    width: '100%',
                                    color: item.isSiteVisitBooked
                                      ? Color.colorRoyalblue_100
                                      : Color.WHITE,
                                    fontSize: 8,
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                  }}>
                                  {item.isSiteVisitBooked
                                    ? 'Booked'
                                    : 'Book Visit'}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View>
                              <TouchableOpacity
                                style={{
                                  width: 'auto',
                                  height: 20,
                                  backgroundColor:
                                    item.isContacted === 'no'
                                      ? Color.colorRoyalblue_100
                                      : Color.WHITE,
                                  borderRadius: 5,
                                  marginTop: -2,
                                  borderWidth: 0.5,
                                  borderColor: Color.GREY,
                                }}
                                onPress={() =>
                                  makeCall(item.ownerDetails.ownerMobile)
                                }>
                                <Text
                                  style={{
                                    width: '100%',
                                    color:
                                      item.isContacted === 'no'
                                        ? Color.WHITE
                                        : Color.colorRoyalblue_100,
                                    fontSize: 8,
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                  }}>
                                  {item.isContacted === 'no'
                                    ? 'Contact'
                                    : 'Contacted'}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: width * 0.8, // Adjusted width based on screen width
    height: height * 0.3, // Adjusted height based on screen height
  },
  loremIpsum: {
    fontFamily: 'roboto-500',
    color: '#121212',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: '700',
  },
  imageStack: {
    alignItems: 'center',
    marginTop: 30,
  },
  materialUnderlineTextbox: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 20,
  },
  materialUnderlineTextbox1: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 10,
  },
  materialUnderlineTextbox2: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 10,
  },
  materialRightIconTextbox: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 10,
  },
  materialCheckboxWithLabel: {
    marginTop: 10,
  },
  materialButtonPrimary: {
    height: 49,
    width: width * 0.9, // Adjusted width based on screen width
    marginTop: 20,
  },
  loremIpsum3: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 15,
    marginBottom: 20,
    // alignItems:"flex-start",
    // alignContent:"center",
    paddingBottom: 20,
    width: '80%',
  },
  overlayText1: {
    textAlign: 'center',
    padding: responsiveWidth(1),
    backgroundColor: 'rgba(97, 85, 223, 1)',
    opacity: 1,

    color: 'white',
    borderRadius: 5,
    marginLeft: 6,
    position: 'absolute', // positions the text relative to the parent
    top: 10, // adjusts the text to the bottom of the image
    fontFamily: FontFamily.interRegular,
    fontSize: responsiveFontSize(1),
  },
  tabItem: {
    width: '33%',
    alignItems: 'center',
  },
  tabText: {
    fontFamily: FontFamily.interMedium,
    fontSize: responsiveFontSize(1.8),
    color: 'black',
  },

  activeTabText: {
    color: 'blue',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
});

export default TentantSpace;

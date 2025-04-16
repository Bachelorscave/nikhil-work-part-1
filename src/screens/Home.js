import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Animated,
  Pressable,
} from 'react-native';
import {TextInput, ScrollView, TouchableOpacity} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'
import {Colors, FontFamily, FontSize, Border} from '../../GlobalStyles';
import Color from '../Utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeadSection from '../components/main/mainsectionU';

import fetchHomeAPI from '../apiservice/HomeApi';
import {
  GetUniversity,
  featured,
  getPhoto,
  getpropertydetails,
  handpicked,
} from '../apiservice/OwnerApi';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useFocusEffect} from '@react-navigation/native';

let jsonData;
let handpickedData = [];
let featuredData = [];
let findNearbyData;
const {width, height} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [featuredData, setfeaturedData] = useState([]);
  const [handpickedData, sethandpickedData] = useState([]);

  const [loading, setLoading] = useState(true); //
  const [listing, setListing] = useState([]);
  const [imagenew, setnewImage] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
      const jsonData = await GetUniversity();
      if (jsonData) {
        setListing(jsonData);
        console.log('Listing:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const fetchDataFetured = useCallback(async () => {
    try {
      const jsonData = await featured();
      if (jsonData) {
        setfeaturedData(jsonData);
        console.log('featured data:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);
  const fetchDatahandpicked = useCallback(async () => {
    try {
      const jsonData = await handpicked();
      if (jsonData) {
        sethandpickedData(jsonData);
        console.log('handpicked data:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(
    () => {
      fetchData();
      fetchDataFetured();
      fetchDatahandpicked();
      fetchPHOTO();
    },
    [fetchData],
    [fetchDataFetured],
    [fetchDatahandpicked],
    [fetchPHOTO, refresh],
  );

  console.log(listing);
  console.log(featuredData);
  console.log(handpickedData);

  // const handleRightSwipe = () => {
  //   navigation.navigate('Tenantprofile');
  // };

  // const onSwipe = gestureName => {
  //   switch (gestureName) {
  //     // case swipeDirections.SWIPE_LEFT:
  //     //   handleLeftSwipe();
  //     //   break;
  //     case swipeDirections.SWIPE_RIGHT:
  //       handleRightSwipe();
  //       break;
  //   }
  // };

  const handleSearch = () => {
    // Handle search functionality here
    alert('Search button clicked!');
  };

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const jsonData = await fetchHomeAPI();
  //       if (jsonData) {
  //         setFindNearbyData(jsonData.finalData[0].findbynear ? jsonData.finalData[0].findbynear: []);
  //         setfeaturedData(jsonData.finalData[0].featured ? jsonData.finalData[0].featured : []);
  //         sethandpickedData(jsonData.finalData[0].handPicked ? jsonData.finalData[0].handPicked: []);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) {
  // Show loader while fetching data
  //     return (
  //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //             <ActivityIndicator size="large" color={Color.colorRoyalblue_100} />
  //         </View>
  //     );
  // }

  const propertyview = async (type, id) => {
    console.log('🚀 ~ propertyview ~ id:', id);
    console.log('🚀 ~ propertyview ~ type:', type);
    console.log('inside propertyView');
    // navigation.navigate('ViewProperty')
    try {
      const response = await getpropertydetails(type, id);
      const result = await response.json();

      //   // Beautify and log the response
      console.log('Response:', JSON.stringify(result, null, 2));
      if (response.status == 201) {
        if (type === 'Flat') {
          navigation.navigate('ViewProperty', {result});

          console.log('successfull');
        } else {
          navigation.navigate('ViewPropertyP', {result});

          console.log('successfull');
        }
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('done');
    }
  };

  const FindRoom = async searchText => {
    const search = {
      searchText,
    };
    console.log(search.searchText);
    navigation.navigate('Filter', {search});

    // onPress={navigation.navigate("Filter",{searchText})}}
  };
  const [validFeaturedMedia, setValidFeaturedMedia] = useState({});

  const [validHandpickedMedia, setValidHandpickedMedia] = useState({});

  useEffect(() => {
    const checkMedia = async () => {
      const mediaValidity = {};
      for (let item of featuredData) {
        try {
          const response = await fetch(
            `http://93.127.185.101:8005/api/utils/get-image/${item.photos[0]}`,
            {
              method: 'HEAD',
            },
          );
          mediaValidity[item.propertyId] = response.ok;
        } catch (error) {
          console.error('Error checking media:', error);
          mediaValidity[item.propertyId] = false;
        }
      }
      setValidFeaturedMedia(mediaValidity);
    };

    checkMedia();
  }, [featuredData]);

  useEffect(() => {
    const checkMedia = async () => {
      const mediaValidity = {};
      for (let item of handpickedData) {
        try {
          const response = await fetch(
            `http://93.127.185.101:8005/api/utils/get-image/${item.photos[0]}`,
            {
              method: 'HEAD',
            },
          );
          mediaValidity[item.propertyId] = response.ok;
        } catch (error) {
          console.error('Error checking media:', error);
          mediaValidity[item.propertyId] = false;
        }
      }
      setValidHandpickedMedia(mediaValidity);
    };

    checkMedia();
  }, [handpickedData]);
  const formatRent = rent => {
    if (rent >= 1000) {
      return `${(rent / 1000).toFixed(0)}k`;
    }
    return rent;
  };

  const [isValidProfilePick, setIsValidProfilePic] = useState(false);
  useEffect(() => {
    const checkMedia = async () => {
      try {
        const response = await fetch(
          `http://93.127.185.101:8005/api/utils/get-image/${imagenew.profilePicture}`,
          {
            method: 'HEAD',
          },
        );
        setIsValidProfilePic(response.ok);
      } catch (error) {
        console.error('Error checking media:', error);
        setIsValidProfilePic(false);
      }
    };
    if (imagenew.profilePicture) {
      checkMedia();
    }
  }, [imagenew]);
  const animation = useRef(new Animated.Value(0)).current;

  const moveBox = idx => {
    // Calculate the total width of the navbar
    const navbarWidth = width * 0.75;
    // Calculate the width of each button
    const buttonWidth = navbarWidth / 4;
    // Move the box to the center of the clicked button
    const toValue =
      idx == 4
        ? buttonWidth * (idx - 1) + buttonWidth / 2 - responsiveWidth(12)
        : buttonWidth * (idx - 1) + buttonWidth / 2 - responsiveWidth(7);

    // Animate the box
    Animated.timing(animation, {
      toValue, // Move the box to the calculated position
      duration: 500,
      useNativeDriver: true, // Enable native driver for performance
    }).start();
  };
  useFocusEffect(
    useCallback(() => {
      // Code to run when the screen is focused

      moveBox(1);
      // Cleanup function that runs when the screen is unfocused
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );
  return (
    <>
      {/* <GestureRecognizer
        onSwipe={gestureName => onSwipe(gestureName)}
        config={config}
        style={styles.gestureContainer}> */}
      <ScrollView
        style={{flex: 1, backgroundColor: '#FFF'}}
        contentContainerStyle={{paddingBottom: responsiveWidth(18)}}>
        <HeadSection />
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
        <View style={{backgroundColor: '#F9F5F4', height: height * 0.2}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //
              marginTop: height * 0.01,
              // marginLeft: 30,
              alignSelf: 'center',
              width: width,
            }}>
            <View style={{width: width}}>
              <Text
                style={{
                  // fontSize: 16,
                  // fontWeight: '500',
                  color: '#595959',
                  alignSelf: 'center',
                  // marginLeft: width * 0.06,
                  fontFamily: FontFamily.interBold,
                  fontSize: responsiveFontSize(2),
                }}>
                Find Room Near your university/college!
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{height: height * 0.005}}>
            {listing.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => FindRoom(item.university)}
                style={styles.cardFindRoom}>
                <ImageBackground
                  source={{
                    uri: `http://93.127.185.101:8005/api/utils/get-image/${item.media}`,
                  }}
                  style={styles.imageBackground}
                  imageStyle={{borderRadius: responsiveWidth(2.5)}}>
                  <Text style={styles.overlayText}>
                    {item.university.toUpperCase()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* working on the featured section */}
        <View
          style={{
            backgroundColor: '#FFF',
            height: height * 0.35,
            // borderWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              width: width,
            }}>
            <View
              style={{
                width: width,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  alignItems: 'flex-start',
                  color: '#595959',
                  marginLeft: 20,
                  fontFamily: FontFamily.interSemiBold,
                }}>
                Featured{' '}
              </Text>
              <TouchableOpacity style={{height: height * 0.02, width: 100}}>
                <Text
                  style={{
                    fontSize: 12,
                    alignItems: 'flex-end',
                    // color: Color.colorRoyalblue_100,
                    color: '#6155DF',
                    marginLeft: 20,
                    marginRight: 25,
                    fontFamily: FontFamily.interMedium,
                  }}>
                  See All{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{height: height * 0.28}}>
            {featuredData.map((item, index) => {
              console.log('Featured item***************************', item);
              // const [isValidMedia, setIsValidMedia] = useState(null);

              // useEffect(() => {
              //   const checkMedia = async () => {
              //     try {
              //       const response = await fetch(
              //         `http://93.127.185.101:8005/api/utils/get-image/${item.photos[0]}`,
              //         {
              //           method: 'HEAD',
              //         },
              //       );
              //       if (response.ok) {
              //         setIsValidMedia(true);
              //       } else {
              //         setIsValidMedia(false);
              //       }
              //     } catch (error) {
              //       console.error('Error checking media:', error);
              //       setIsValidMedia(false);
              //     }
              //   };

              //   checkMedia();
              // }, [item.photos]);

              return (
                <View key={index}>
                  <TouchableOpacity
                    // onPress={()=>{navigation.navigate("Tentate")}}
                    onPress={() => propertyview(item.type, item.propertyId)}
                    style={{
                      height: height * 0.265,
                      elevation: 3,
                      backgroundColor: '#FFF',
                      marginLeft: 15,
                      marginTop: 20,
                      borderRadius: 15,
                      marginBottom: 6,
                      width: width * 0.75,
                      // borderWidth: 1,
                    }}>
                    <ImageBackground
                      // source={{ uri: item.gallery }}
                      // source={require('../image/sampleRoom.png')}
                      source={{
                        uri: validFeaturedMedia[item.propertyId]
                          ? `http://93.127.185.101:8005/api/utils/get-image/${item.photos[0]}`
                          : `https://rumah.soloproperty.co.id/wp-content/uploads/2022/04/rumah.png`,
                      }}
                      style={styles.featureBG}
                      imageStyle={{borderRadius: 15}}>
                      <Text style={styles.overlayText1}>
                        {item.preferredTenant}
                      </Text>
                    </ImageBackground>

                    {item.type === 'Flat' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          height: 30,
                          marginTop: 6,
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '50%',
                            height: 15,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 10,
                              fontWeight: '500',
                              color: Color.BLACK,
                              fontFamily: FontFamily.interBold,
                            }}>
                            {item.bhkType} {item.type} for Rent
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 10,
                              fontSize: 11,
                              // color: Color.BLACK,
                              color: '#696969',
                              fontFamily: FontFamily.interMedium,
                            }}>
                            {item.location}{' '}
                          </Text>
                        </View>
                        <Text
                          style={{
                            textAlign: 'right',
                            width: '40%',
                            fontSize: 14,
                            color: Color.BLACK,
                            fontFamily: FontFamily.interMedium,
                          }}>
                          ₹ {formatRent(item.expectedRent)}
                          {/* ₹{item.expectedRent} */}
                        </Text>
                      </View>
                    ) : item.type === 'PG' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          height: responsiveWidth(8),
                          marginTop: 6,
                          // borderWidth: 1,
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '50%',
                            height: 15,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 10,
                              fontWeight: '500',
                              color: Color.BLACK,
                              fontFamily: FontFamily.interBold,
                            }}>
                            {item.type} for Stay
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 10,
                              fontSize: 11,
                              // color: Color.BLACK,
                              color: '#696969',
                              fontFamily: FontFamily.interMedium,
                            }}>
                            {item.location}{' '}
                          </Text>
                        </View>
                        <Text
                          style={{
                            textAlign: 'right',
                            width: '40%',
                            fontSize: 14,
                            color: Color.BLACK,
                            fontFamily: FontFamily.interMedium,
                          }}>
                          ₹ {formatRent(item.roomTypeRent[0].rent)}
                        </Text>
                      </View>
                    ) : null}
                    {item.type === 'Flat' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          height: 30,
                          marginTop: 3,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '65%',
                            height: 15,
                            marginTop: 6,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 10,
                              fontSize: 10,
                              // fontWeight: '500',
                              // color: Color.BLACK,
                              color: '#696969',
                              fontFamily: FontFamily.interMedium,
                            }}>
                            {item.area} sqft
                          </Text>
                          <Text
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 20,
                              fontSize: 10,
                              fontWeight: '500',
                              color: Color.BLACK,
                            }}>
                            {' '}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            width: width * 0.22,
                            height: height * 0.03,
                            backgroundColor: Color.colorRoyalblue_100,
                            borderRadius: 5,
                            marginTop: -4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              // fontSize: 11,
                              paddingHorizontal: 6,
                              paddingVertical: 4,
                              fontFamily: FontFamily.interMedium,
                              fontSize: responsiveFontSize(1.2),
                            }}>
                            Contact Owner
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : item.type === 'PG' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          height: 30,
                          marginTop: 3,
                          // borderWidth: 1,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '65%',
                            height: 15,
                            marginTop: 6,
                            paddingBottom: responsiveWidth(1),
                            // borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 10,
                              fontSize: 10,

                              // fontWeight: '500',
                              // color: Color.BLACK,
                              color: '#696969',
                              fontFamily: FontFamily.interMedium,
                            }}>
                            Starting {item.roomTypeRent[0].type} Room{' '}
                          </Text>
                          <Text
                            style={{
                              height: 20,
                              width: 'auto',
                              marginLeft: 20,
                              fontSize: 10,
                              fontWeight: '500',
                              color: Color.BLACK,
                            }}>
                            {' '}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            width: width * 0.22,
                            height: height * 0.03,
                            backgroundColor: Color.colorRoyalblue_100,
                            borderRadius: 5,
                            marginTop: -4,
                            justifyContent: 'center',
                            alignItems: 'center',

                            // borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              // fontSize: 11,
                              paddingHorizontal: 6,
                              paddingVertical: 4,
                              fontFamily: FontFamily.interMedium,
                              fontSize: responsiveFontSize(1.2),
                            }}>
                            Contact Owner
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* working on the Hand Picked section end */}

        <View style={{backgroundColor: '#FFF', height: height * 0.35}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              width: width,
            }}>
            <View
              style={{
                width: width,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  alignItems: 'flex-start',
                  color: '#595959',
                  marginLeft: 20,
                  fontFamily: FontFamily.interSemiBold,
                }}>
                Hand Picked{' '}
              </Text>
              <TouchableOpacity style={{height: height * 0.02, width: 100}}>
                <Text
                  style={{
                    fontSize: 12,
                    alignItems: 'flex-end',
                    // color: Color.colorRoyalblue_100,
                    color: '#6155DF',
                    marginLeft: 20,
                    marginRight: 25,
                    fontFamily: FontFamily.interMedium,
                  }}>
                  See All{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{height: height * 0.28}}>
            {handpickedData.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  // onPress={()=>{navigation.navigate("Tentate")}}
                  onPress={() => propertyview(item.type, item.propertyId)}
                  style={{
                    height: height * 0.265,
                    elevation: 3,
                    backgroundColor: '#FFF',
                    marginLeft: 15,
                    marginTop: 20,
                    borderRadius: 15,
                    marginBottom: 6,
                    width: width * 0.75,
                    // borderWidth: 1,
                  }}>
                  <ImageBackground
                    // source={{ uri: item.gallery }}
                    // source={require('../image/sampleRoom.png')}
                    source={{
                      uri: validFeaturedMedia[item.propertyId]
                        ? `http://93.127.185.101:8005/api/utils/get-image/${item.photos[0]}`
                        : `https://rumah.soloproperty.co.id/wp-content/uploads/2022/04/rumah.png`,
                    }}
                    style={styles.featureBG}
                    imageStyle={{borderRadius: 15}}>
                    <Text style={styles.overlayText1}>
                      {item.preferredTenant}
                    </Text>
                  </ImageBackground>

                  {item.type === 'Flat' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: 30,
                        marginTop: 6,
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '50%',
                          height: 15,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            height: 20,
                            width: 'auto',
                            marginLeft: 10,
                            fontWeight: '500',
                            color: Color.BLACK,
                            fontFamily: FontFamily.interBold,
                          }}>
                          {item.bhkType} {item.type} for Rent
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            height: 20,
                            width: 'auto',
                            marginLeft: 10,
                            fontSize: 11,
                            // color: Color.BLACK,
                            color: '#696969',
                            fontFamily: FontFamily.interMedium,
                          }}>
                          {item.location}{' '}
                        </Text>
                      </View>
                      <Text
                        style={{
                          textAlign: 'right',
                          width: '40%',
                          fontSize: 14,
                          color: Color.BLACK,
                          fontFamily: FontFamily.interMedium,
                        }}>
                        ₹ {formatRent(item.expectedRent)}
                        {/* ₹{item.expectedRent} */}
                      </Text>
                    </View>
                  ) : item.type === 'PG' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: responsiveWidth(8),
                        marginTop: 6,
                        // borderWidth: 1,
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '50%',
                          height: 15,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            height: 20,
                            width: 'auto',
                            marginLeft: 10,
                            fontWeight: '500',
                            color: Color.BLACK,
                            fontFamily: FontFamily.interBold,
                          }}>
                          {item.type} for Stay
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            height: 20,
                            width: 'auto',
                            marginLeft: 10,
                            fontSize: 11,
                            // color: Color.BLACK,
                            color: '#696969',
                            fontFamily: FontFamily.interMedium,
                          }}>
                          {item.location}{' '}
                        </Text>
                      </View>
                      <Text
                        style={{
                          textAlign: 'right',
                          width: '40%',
                          fontSize: 14,
                          color: Color.BLACK,
                          fontFamily: FontFamily.interMedium,
                        }}>
                        ₹ {formatRent(item.roomTypeRent[0].rent)}
                      </Text>
                    </View>
                  ) : null}
                  {item.type === 'Flat' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: 30,
                        marginTop: 3,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '65%',
                          height: 15,
                          marginTop: 6,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            height: 20,
                            width: 'auto',
                            marginLeft: 10,
                            fontSize: 10,
                            // fontWeight: '500',
                            // color: Color.BLACK,
                            color: '#696969',
                            fontFamily: FontFamily.interMedium,
                          }}>
                          {item.area} sqft
                        </Text>
                        <Text
                          style={{
                            height: 20,
                            width: 'auto',
                            marginLeft: 20,
                            fontSize: 10,
                            fontWeight: '500',
                            color: Color.BLACK,
                          }}>
                          {' '}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          width: width * 0.22,
                          height: height * 0.03,
                          backgroundColor: Color.colorRoyalblue_100,
                          borderRadius: 5,
                          marginTop: -4,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            // fontSize: 11,
                            paddingHorizontal: 6,
                            paddingVertical: 4,
                            fontFamily: FontFamily.interMedium,
                            fontSize: responsiveFontSize(1.2),
                          }}>
                          Contact Owner
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : item.type === 'PG' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: 30,
                        marginTop: 3,
                        // borderWidth: 1,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '65%',
                          height: 15,
                          marginTop: 6,
                          paddingBottom: responsiveWidth(1),
                          // borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            height: 20,
                            width: 'auto',
                            marginLeft: 10,
                            fontSize: 10,

                            // fontWeight: '500',
                            // color: Color.BLACK,
                            color: '#696969',
                            fontFamily: FontFamily.interMedium,
                          }}>
                          Starting {item.roomTypeRent[0].type} Room{' '}
                        </Text>
                        <Text
                          style={{
                            height: 20,
                            width: 'auto',
                            marginLeft: 20,
                            fontSize: 10,
                            fontWeight: '500',
                            color: Color.BLACK,
                          }}>
                          {' '}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          width: width * 0.22,
                          height: height * 0.03,
                          backgroundColor: Color.colorRoyalblue_100,
                          borderRadius: 5,
                          marginTop: -4,
                          justifyContent: 'center',
                          alignItems: 'center',

                          // borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            // fontSize: 11,
                            paddingHorizontal: 6,
                            paddingVertical: 4,
                            fontFamily: FontFamily.interMedium,
                            fontSize: responsiveFontSize(1.2),
                          }}>
                          Contact Owner
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* working on the Hand Picked section end */}

        {/* exclusive prime*/}
        <View style={{backgroundColor: 'black', top: 20}}>
          {/* // working on main heading */}
          <Image
            style={styles.king}
            contentFit="cover"
            source={require('../image/king.jpg')}
          />
          <Text style={[styles.bachelorcavePrime, styles.areYouATypo]}>
            BachelorCave Prime
          </Text>
          <Text
            style={[
              styles.oneMembershipMany,
              styles.roomForRentLayout,
            ]}>{`One membership, many exclusive privileges , Zero brokerage`}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginTop: height * 0.04}}>
            <View
              style={{
                // height: height * 0.18,
                // elevation: 2,
                backgroundColor: '#FFF',
                marginLeft: 30,
                marginTop: responsiveWidth(20),
                borderRadius: responsiveWidth(2.5),
                marginBottom: 10,
                // borderWidth: 1,
                // borderColor: 'red',
                width: width * 0.75,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: responsiveWidth(3),
                  paddingVertical: responsiveWidth(2),
                }}>
                <View>
                  <Image
                    style={{
                      width: responsiveWidth(10),
                      height: responsiveWidth(10),
                    }}
                    contentFit="cover"
                    source={require('../image/sky.jpg')}
                  />
                </View>
                <View
                  style={{
                    marginLeft: responsiveWidth(5),
                  }}>
                  <View>
                    <Text
                      style={{
                        // lineHeight: 20,
                        fontSize: FontSize.size_mini,
                        // left: 74,
                        fontFamily: FontFamily.interRegular,
                        color: Color.textC,
                        // textAlign: 'left',
                        // width: 240,
                        // height: 50,
                      }}>
                      Exclusive access to premium properties
                    </Text>
                  </View>
                  <View style={{marginTop: responsiveWidth(3)}}>
                    <Text
                      style={{
                        // top: 60,
                        // width: 209,
                        // height: 16,
                        // lineHeight: 16,
                        fontFamily: FontFamily.interLight,
                        // fontWeight: '300',
                        fontSize: FontSize.size_xs,
                        // left: 74,
                        // letterSpacing: -0.2,
                        textAlign: 'left',
                        color: Color.colorDimgray_300,
                        // position: 'absolute',
                      }}>
                      Instant alert for new properties
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* <Image
                                        style={[styles.frameChild7, styles.frameChildLayout]}
                                        contentFit="cover"
                                        // source={require("../image/effect1.jpg")}
                                        source={require("../image/effect1.jpg")}
                                    /> */}

            <View
              style={{
                // height: height * 0.18,
                // elevation: 2,
                backgroundColor: '#FFF',
                marginLeft: responsiveWidth(2.5),
                marginTop: responsiveWidth(20),
                borderRadius: responsiveWidth(2.5),
                marginBottom: 10,
                // borderWidth: 1,
                // borderColor: 'red',
                width: width * 0.75,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: responsiveWidth(3),
                  paddingVertical: responsiveWidth(2),
                }}>
                <View>
                  <Image
                    style={{
                      width: responsiveWidth(10),
                      height: responsiveWidth(10),
                    }}
                    contentFit="cover"
                    source={require('../image/male.jpg')}
                  />
                </View>
                <View
                  style={{
                    marginLeft: responsiveWidth(5),
                  }}>
                  <View>
                    <Text
                      style={{
                        // lineHeight: 20,
                        fontSize: FontSize.size_mini,
                        // left: 74,
                        fontFamily: FontFamily.interRegular,
                        color: Color.textC,
                        // textAlign: 'left',
                        // width: 240,
                        // height: 50,
                      }}>
                      Contact owner directly of 30 properties
                    </Text>
                  </View>
                  <View style={{marginTop: responsiveWidth(3)}}>
                    <Text
                      style={{
                        // top: 60,
                        // width: 209,
                        // height: 16,
                        // lineHeight: 16,
                        fontFamily: FontFamily.interLight,
                        // fontWeight: '300',
                        fontSize: FontSize.size_xs,
                        // left: 74,
                        // letterSpacing: -0.2,
                        textAlign: 'left',
                        color: Color.colorDimgray_300,
                        // position: 'absolute',
                      }}>
                      View contact number of 30 Properties
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{marginTop: 10, marginBottom: 30, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                // Add functionality for when TouchableOpacity is pressed
                console.log('Explore BachelorCave Prime pressed');
              }}
              style={{
                backgroundColor: 'rgba(97, 85, 223, 1)', // Just for visibility, you can change or remove this
                paddingVertical: responsiveWidth(2.5),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: responsiveWidth(5),
                paddingLeft: 10,
                paddingRight: 10,
                width: width * 0.8,
                bottom: 5,
              }}>
              <Text
                style={{
                  width: 'auto',
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'white',
                }}>
                Explore BachelorCave Prime
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'rgba(202, 241, 249, 1)',
            height: height * 0.7,
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              // backgroundColor: 'red',
              marginTop: responsiveWidth(12),
              width: width,
              height: responsiveWidth(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.rentalsMadeEfficientContainer,
                styles.discoverAPlaceTypo,
              ]}>
              <Text
                style={
                  styles.rentalsMadeEfficient
                }>{`Rentals made efficient and 
smooth with`}</Text>
              <Text style={styles.text16}>{` `}</Text>
              <Text style={styles.bachelorsCave}>Bachelors Cave</Text>
              <Text style={styles.text16}>{` `}</Text>
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              width: width,
              height: responsiveWidth(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.bookAccommodationOnline,
              ]}>{`Book accommodation online with certified lessors. Enjoy 
personalized support all the way through. `}</Text>
          </View>

          <Image
            style={styles.frameIcon}
            contentFit="cover"
            source={require('../image/bu2.jpg')}
          />
          <View style={[styles.frameWrapper, styles.frameBg]}>
            <View style={[styles.frameContainer, styles.frameLayout1]}>
              <View style={[styles.frameGroup, styles.frameLayout1]}>
                <View
                  style={[
                    styles.listPropertyWrapper,
                    styles.listPropertyWrapperLayout,
                  ]}>
                  <TouchableOpacity
                    style={{
                      height: 30,
                    }}>
                    <Text
                      style={[
                        styles.listProperty1,
                        styles.callMaleIconPosition,
                        {
                          fontFamily: FontFamily.interMedium,
                          alignSelf: 'center',
                        },
                      ]}>
                      List Property
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginLeft: responsiveWidth(4)}}>
                  <Text style={[styles.areYouA, styles.areYouATypo]}>
                    Are you a home owner?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: responsiveWidth(5),
                      alignItems: 'center',
                    }}>
                    <View>
                      <Ionicons
                        name="checkmark-circle"
                        size={10}
                        color={'white'}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: FontFamily.interRegular,
                          fontSize: responsiveFontSize(1.25),
                          color: Color.WHITE,
                          marginLeft: responsiveWidth(1),
                        }}>
                        Find Faster & Verified Tenants
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      name="checkmark-circle"
                      size={10}
                      color={'white'}
                    />
                    <Text
                      style={{
                        fontFamily: FontFamily.interRegular,
                        fontSize: responsiveFontSize(1.25),
                        color: Color.WHITE,
                        marginLeft: responsiveWidth(1),
                      }}>
                      Pay Zero brokerage
                    </Text>
                  </View>
                </View>
                {/* <Image
                  style={[styles.vectorIcon, styles.vectorIconLayout]}
                  contentFit="cover"
                  source={require('../image/correct.jpg')}
                /> */}

                {/* <Image
                  style={[styles.vectorIcon1, styles.vectorIconLayout]}
                  contentFit="cover"
                  source={require('../image/correct.jpg')}
                /> */}
              </View>
            </View>
          </View>
          <View
            style={[
              styles.seamlessSupportEvenAfterBParent,
              styles.listPropertyWrapperLayout,
            ]}>
            <Text
              style={[
                styles.seamlessSupportEven,
                styles.seamlessSupportEvenPosition,
                ,
                {color: Color.BLACK},
              ]}>{`Seamless support, even after
booking`}</Text>
            <Text
              style={[
                styles.ourMultilingualExpert,
                styles.seamlessSupportEvenPosition,
                ,
                {color: Color.textC},
              ]}>{`Our multilingual expert team is here to assist 
you from start to finish and commits to finding you a new home in case things go unplanned. Focus on what matters: a fresh start!`}</Text>
            <Image
              style={[styles.supportsite1Icon, styles.homePosition]}
              contentFit="cover"
              source={require('../image/callcentre.jpg')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Filterby')}
              style={{
                backgroundColor: 'black',
                marginTop: 182,
                borderRadius: 5,
                marginLeft: 10,
                paddingHorizontal: 18,
                paddingVertical: 10,
              }}>
              <Text style={{color: 'white', fontWeight: '700', fontSize: 10}}>
                Find Out More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: responsiveWidth(60),
          }}></View>
      </ScrollView>
      {/* </GestureRecognizer> */}

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: responsiveHeight(84),
        }}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              moveBox(1);
              navigation.navigate('HomeStack');
            }}>
            <MaterialIcons name="home" size={24} color="#ffffff" />

            <Text style={{color: Color.WHITE, textAlign: 'left', fontSize: 10}}>
              Home
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              {
                width: responsiveWidth(10),
                height: responsiveWidth(10),
                backgroundColor: '#315AE8',
                borderRadius: responsiveWidth(10) / 2,
                // marginBottom: 20,
                position: 'absolute',
                bottom: -responsiveWidth(7),
              },
              {transform: [{translateX: animation}]},
            ]}
          />

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              moveBox(2);
              navigation.navigate('SProperty');
            }}>
            <MaterialIcons name="add-home" size={24} color="#ffffff" />
            <Text
              style={{
                color: Color.WHITE,
                textAlign: 'left',
                fontSize: 10,
              }}>
              List Property
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              moveBox(3);
              navigation.navigate('Tentate');
            }}>
            <MaterialCommunityIcons
              name="home-heart"
              size={24}
              color="#ffffff"
            />
            <Text style={{color: Color.WHITE, textAlign: 'left', fontSize: 10}}>
              Saved
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              moveBox(4);
              navigation.navigate('Filter');
            }}>
            <MaterialCommunityIcons
              name="home-search"
              size={24}
              color="#ffffff"
            />
            <Text style={{color: Color.WHITE, textAlign: 'left', fontSize: 10}}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Tenantprofile')}
          style={{
            height: 70,
            width: 70,
            backgroundColor: '#0C132A',
            marginVertical: 24,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: isValidProfilePick
                ? `http://93.127.185.101:8005/api/utils/get-image/${imagenew.profilePicture}`
                : `https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg`,
            }}
            style={{
              height: responsiveWidth(12.5),
              width: responsiveWidth(12.5),
              alignSelf: 'center',
              borderRadius: 50,
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
          <View
            style={{
              width: responsiveWidth(4),
              height: responsiveWidth(4),
              backgroundColor: '#FF0000',
              position: 'absolute',
              top: responsiveWidth(3),
              left: responsiveWidth(3),
              borderRadius: responsiveWidth(4) / 2,
            }}
          />
        </Pressable>
      </View>
      {/* <View style={{flexDirection:"row"}}>
        <View  style={styles.navbar} >
            
            <TouchableOpacity style={{alignItems:'center'}}
             onPress={()=>navigation.navigate("PgFilterby")}
            >
            <MaterialCommunityIcons name="filter-outline" size={24} color='#ffffff'/>

            <Text style={{color:Color.WHITE,textAlign:'left', fontSize:10}}>
                Filter by
            </Text>

            </TouchableOpacity >

            <TouchableOpacity style={{alignItems:'center'}}
            onPress={()=>navigation.navigate("#")}
            >
            <MaterialCommunityIcons name="cards-heart-outline" size={24} color='#ffffff'/>
            <Text style={{color:Color.WHITE,textAlign:'left', fontSize:10}}>
                Saved
            </Text>

            </TouchableOpacity >

            <TouchableOpacity style={{alignItems:'center'}}
            onPress={()=>navigation.navigate("#")}
            >
            <MaterialCommunityIcons name="google-maps" size={24} color='#ffffff'/>
            <Text style={{color:Color.WHITE,textAlign:'left', fontSize:10}}>
                Map View
            </Text>

            </TouchableOpacity>


            


        </View>
        <View style={styles.circle}>

            <Image 
           source={require('../image/king.jpg')}
           style={{borderRadius:40,height:60,width:40,padding:10}}
            />

        </View>
        </View> */}
    </>
  );
};
const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderwidth: 4,
    borderColor: Color.BLACK,
    borderRadius: 15,
  },
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
    marginLeft: 15,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    width: '75%',
    overflow: 'hidden',
  },
  circle: {
    backgroundColor: '#0C132A',
    borderRadius: 100,
    height: 80,
    width: '18%',
    marginTop: 20,
    padding: 15,
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
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 5,
  },
  overlayText1: {
    paddingHorizontal: width * 0.02, // Responsive padding
    textAlign: 'center',
    // fontSize: width * 0.025, // Responsive font size
    backgroundColor: 'rgba(97, 85, 223, 1)',
    opacity: 1,
    // fontWeight: '500',
    paddingTop: height * 0.004, // Responsive padding
    paddingBottom: height * 0.004, // Responsive padding
    color: 'white',
    borderRadius: width * 0.02, // Responsive border radius
    marginLeft: width * 0.025, // Responsive margin
    position: 'absolute',
    top: height * 0.02, // Responsive top position
    fontFamily: FontFamily.interMedium,
    fontSize: responsiveFontSize(1.2),
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  discoverAPlaceTypo: {
    fontSize: FontSize.size_5xl,
    textAlign: 'left',
    position: 'absolute',
  },
  vectorIconLayout: {
    width: 9,
    maxHeight: '40%',
    left: 3,
    position: 'absolute',
  },
  seamlessSupportEvenPosition: {
    left: 98,
    textAlign: 'left',
    position: 'absolute',
  },
  homePosition: {
    left: 33,
    position: 'absolute',
  },
  featureBG: {
    height: height * 0.185,
    width: 'auto',
  },
  featureBG1: {
    height: height * 0.09,
    width: 'auto',
  },
  seeAllTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
  },
  frameBg: {
    // backgroundColor: Color.colorRoyalblue_100,
    backgroundColor: '#667DF5',
    position: 'absolute',
  },
  overlayText: {
    paddingHorizontal: 15,
    // fontSize: 11,
    fontSize: responsiveFontSize(2),
    color: 'white',
    // fontWeight: '700',
    fontFamily: FontFamily.jockeyOneRegular,
    paddingTop: 3,
    paddingBottom: 8,

    borderRadius: 15,
    position: 'absolute', // positions the text relative to the parent
    bottom: 0, // adjusts the text to the bottom of the image
  },
  roomForRentLayout: {
    lineHeight: 19,
    textAlign: 'left',
    position: 'absolute',
  },
  roomForRent: {
    fontSize: FontSize.size_mini_1,
    color: Color.BLACK,
    left: 9,
    top: 175,
    letterSpacing: -0.3,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: '600',
  },
  bSector23: {
    top: 195,
    letterSpacing: -0.1,
    color: Color.colorDimgray_100,
    width: 191,
    lineHeight: 11,
    fontSize: FontSize.size_4xs_2,
    left: 9,
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
    textAlign: 'left',
    position: 'absolute',
  },
  icbaselineBedIcon: {
    top: 210,
    left: 9,
    overflow: 'hidden',
  },
  text: {
    left: 30,
    top: 213,
    letterSpacing: -0.2,
    lineHeight: 11,
    fontSize: FontSize.size_4xs_2,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
    textAlign: 'left',
  },
  text1: {
    left: 68,
    top: 213,
    letterSpacing: -0.2,
    lineHeight: 11,
    fontSize: FontSize.size_4xs_2,
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
    textAlign: 'left',
  },
  solarbathBoldIcon: {
    top: 213,
    left: 49,
    width: 13,
    height: 13,
    overflow: 'hidden',
    position: 'absolute',
  },
  text2: {
    left: 240,
    color: Color.colorDarkslategray_100,
    top: 190,
    fontFamily: FontFamily.interBold,
    fontWeight: '700',
    lineHeight: 13,
    fontSize: FontSize.size_2xs_2,
    letterSpacing: -0.2,
    textAlign: 'left',
    position: 'absolute',
  },
  frameChild: {
    top: 185,
    left: 260,
    borderRadius: 1,
  },
  text3: {
    top: 210,
    color: Color.colorDimgray_200,
    left: 240,
  },
  frameChildLayout1: {
    height: 17,
    width: 17,
    position: 'absolute',
  },
  textPosition: {
    letterSpacing: -0.2,
    position: 'absolute',
  },
  text3Typo: {
    fontSize: 15,
    lineHeight: 19,
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
    letterSpacing: -0.3,
    textAlign: 'left',
    position: 'absolute',
  },
  bachelorcavePrime: {
    left: 64,
    color: 'rgba(247, 245, 176, 1)',
    lineHeight: 23,
    top: 22,
    fontFamily: FontFamily.interBold,
    fontWeight: '700',
  },
  oneMembershipMany: {
    top: 50,
    fontSize: FontSize.size_sm,
    letterSpacing: 0.3,
    left: 28,
    fontFamily: FontFamily.interRegular,
    color: Color.WHITE,
  },
  exclusiveAccessTo: {
    // width: responsiveWidth(2),
    height: 20,
    letterSpacing: 0.2,
    top: 10,
    // borderWidth: 1,
  },
  instantAlertFor: {
    top: 60,
    width: 209,
    height: 16,
    lineHeight: 16,
    fontFamily: FontFamily.interLight,
    fontWeight: '300',
    fontSize: FontSize.size_xs,
    left: 74,
    letterSpacing: -0.2,
    textAlign: 'left',
    color: Color.colorDimgray_300,
    position: 'absolute',
  },
  skyscrapersIcon: {
    left: 14,
    height: 37,
    width: 41,
    top: 20,
    position: 'absolute',
  },
  king: {
    left: 26,
    height: 20,
    width: 25,
    top: 24,
    position: 'absolute',
  },
  exclusiveAccessToPremiumPrParent: {
    left: 26,
  },
  frameChild7: {
    top: 35,
    left: 206,
    width: 211,
  },
  contactOwnerDirectly: {
    top: 68,
    width: 140,
    lineHeight: 16,
    fontFamily: FontFamily.interLight,
    fontWeight: '300',
    fontSize: FontSize.size_xs,
    left: 74,
    letterSpacing: -0.2,
    textAlign: 'left',
    color: Color.colorDimgray_300,
    position: 'absolute',
  },
  viewContactNumber: {
    top: 10,
    width: 244,
    letterSpacing: -0.3,
  },
  callMaleIcon: {
    top: 15,
    height: 35,
    width: 41,
  },
  contactOwnerDirectlyParent: {
    left: 374,
  },
  frameChild8: {
    left: 32,
    borderRadius: Border.br_mid,
    width: 379,
    height: 42,
    top: 235,
  },
  frameChildLayout: {
    height: 106,
    position: 'absolute',
  },
  exploreBachelorcavePrime: {
    top: 245,
    left: 114,
    fontSize: FontSize.size_base_5,
    lineHeight: 21,
    color: Color.colorWhite,
    letterSpacing: -0.3,
    textAlign: 'left',
    position: 'absolute',
  },
  frameChild9: {
    backgroundColor: Color.BLACK,
    height: 658,
    width: 444,
    left: 0,
    top: 0,
    position: 'absolute',
  },
  rentalsMadeEfficient: {
    color: Color.BLACK,
  },
  text16: {
    color: Color.BLACK,
  },
  bachelorsCave: {
    color: 'orange',
  },
  rentalsMadeEfficientContainer: {
    // top: responsiveWidth(15),
    // lineHeight: 32,
    // letterSpacing: 0.2,
    // left: 55,
    // fontFamily: FontFamily.interSemiBold,
    // fontWeight: '600',
  },
  bookAccommodationOnline: {
    // top: 156,
    // left: 44,
    // lineHeight: 18,
    textAlign: 'center',
    // width: 357,
    // letterSpacing: 0.1,
    color: Color.BLACK,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.interRegular,
  },
  frameIcon: {
    top: '27%',
    left: '12.5%',
    width: 300,
    height: 346,
    position: 'absolute',
  },
  listProperty1: {
    top: 7,
    color: Color.colorRoyalblue_100,
    width: 79,
    height: 14,
    fontSize: FontSize.size_smi,
    lineHeight: 13,
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
    textAlign: 'left',
    letterSpacing: -0.3,
  },
  listPropertyWrapper: {
    top: 21,
    width: 108,
    height: 28,
    left: 262,
  },
  areYouA: {
    width: 192,
    height: 21,
    color: Color.colorWhite,
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
    lineHeight: 17,
    left: 0,
    top: 0,
  },
  findFaster: {
    width: 178,
    top: 25,
  },
  payZeroBrokerage: {
    top: 38,
    width: 128,
  },
  vectorIcon: {
    top: 37,
    bottom: 5,
  },
  vectorIcon1: {
    bottom: 16,
    top: 26,
  },
  frameGroup: {
    height: 49,
    left: 0,
    top: 0,
  },
  frameContainer: {
    top: 130,
    left: 34,
    height: 50,
  },
  frameWrapper: {
    top: 600,
    height: responsiveWidth(55),
    // left: 1,
    width: 444,
    borderWidth: 1,
    borderColor: 'red',
  },
  seamlessSupportEven: {
    fontSize: FontSize.size_base,
    lineHeight: 22,
    top: 25,
    color: Color.colorDarkslategray_200,
    letterSpacing: 0.2,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: '600',
  },
  ourMultilingualExpert: {
    top: 90,
    width: 239,
    letterSpacing: 0.1,
    fontFamily: FontFamily.interLight,
    fontWeight: '300',
    lineHeight: 15,
    fontSize: FontSize.size_2xs,
    color: Color.colorDimgray_200,
  },
  supportsite1Icon: {
    width: 40,
    height: 40,
    top: 22,
  },
  frameChild10: {
    left: 145,
    backgroundColor: Color.colorGray_300,
    width: 101,
    borderRadius: Border.br_9xs,
    top: 190,
  },
  findOutMore: {
    left: 155,
    letterSpacing: 0.1,
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
    top: 200,
    lineHeight: 17,
    textAlign: 'left',
    fontFamily: FontFamily.interSemiBold,
    fontWeight: '600',
    position: 'absolute',
  },
  seamlessSupportEvenAfterBParent: {
    // top: responsiveWidth(90),
    bottom: -responsiveWidth(25),
    marginHorizontal: 25,
    alignContent: 'center',
    alignItems: 'center',
    shadowRadius: 4,
    elevation: 4,
    width: responsiveWidth(90),
    height: responsiveWidth(60),
    shadowOpacity: 1,
    overflow: 'visible',

    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  rectangleParent: {
    top: 297,
    height: 622,
    width: 444,
    left: 0,
    position: 'absolute',
  },
  frame5: {
    width: 712,
    left: 0,
    top: 0,
  },
  frame4: {
    top: 1158,
    left: -1,
    width: 733,
  },
  landing: {
    marginLeft: -222,
    borderRadius: Border.br_18xl,
    height: 2347,
    backgroundColor: Color.colorWhite,
    width: 444,
    overflow: 'hidden',
    top: 0,
  },
  frameParent: {
    left: 21,
    width: 444,
    top: 0,
    position: 'absolute',
    height: 2362,
  },
  frame: {
    width: 465,
    overflow: 'hidden',
    left: 0,
    top: 0,
    position: 'absolute',
    height: 2362,
  },
  findRoomNear: {
    left: 53,
    fontSize: FontSize.size_2xl,
    lineHeight: 28,
    width: 381,
    textAlign: 'left',
    color: Color.colorDimgray_300,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: '600',
    letterSpacing: -0.5,
    top: 0,
  },
  frame6: {
    top: 343,
    width: 434,
    overflow: 'hidden',
    left: 0,
  },
  rectangleIcon: {
    left: 36,
    width: 179,
    borderRadius: Border.br_8xs,
    height: 94,
    top: 0,
  },
  frame8: {
    width: 215,
    overflow: 'hidden',
    left: 0,
    top: 0,
  },
  frameChild11: {
    left: 223,
    width: 179,
    borderRadius: Border.br_8xs,
    height: 94,
    top: 0,
  },
  frame9: {
    width: 402,
    overflow: 'hidden',
    left: 0,
    top: 0,
  },
  punjabUniverstyChandigarh: {
    left: 57,
    top: 0,
  },
  frame10: {
    width: 204,
  },
  chandigarhUniversty1: {
    left: 252,
    top: 0,
  },
  frame11: {
    width: 361,
  },
  circledMenu: {
    left: 143,
    width: 96,
    top: 0,
  },
  frame12: {
    top: 848,
    width: 239,
    overflow: 'hidden',
    left: 0,
  },
  teenyiconshomeSolid: {
    top: 17,
    left: 35,
    width: 25,
    height: 25,
    overflow: 'hidden',
    position: 'absolute',
  },
  frameChild12: {
    top: 73,
    width: 38,
    left: 28,
  },
  areYouATypo: {
    fontSize: FontSize.size_mid,
    letterSpacing: -0.3,
    textAlign: 'left',
    position: 'absolute',
    color: Color.WHITE,
  },
  parentLayout: {
    height: 93,
    width: 338,
    top: 115,
    borderRadius: Border.br_6xs,
    backgroundColor: Color.colorWhite,
    position: 'absolute',
  },
  exclusiveAccessToTypo: {
    lineHeight: 20,
    fontSize: FontSize.size_mini,
    left: 74,
    fontFamily: FontFamily.interRegular,
    color: Color.textC,
    textAlign: 'left',
    // width: 240,
    height: 50,
  },
  instantAlertForTypo: {
    fontFamily: FontFamily.interLight,
    fontWeight: '300',
  },
  callMaleIconPosition: {
    left: 15,
    position: 'absolute',
  },
  frameChild10Layout: {
    height: 36,
    position: 'absolute',
  },
  frameLayout1: {
    width: 370,
    position: 'absolute',
  },
  listPropertyWrapperLayout: {
    borderRadius: Border.br_6xs,
    backgroundColor: Color.WHITE,
    position: 'absolute',
  },
  findFasterTypo: {
    height: 11,
    lineHeight: 8,
    fontSize: FontSize.size_5xs,
    left: 19,
    fontFamily: FontFamily.interRegular,
    // color: Color.colorWhite,
    color: Color.WHITE,
    letterSpacing: -0.2,
    textAlign: 'left',
    position: 'absolute',
  },
  home: {
    top: 49,
    color: Color.colorWhite,
    lineHeight: 13,
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
    textAlign: 'left',
    fontSize: FontSize.size_2xs_2,
    left: 33,
    letterSpacing: -0.2,
  },
  search1: {
    left: 0,
  },
  groupIcon: {
    width: '90%',
    right: '6.67%',
    left: '3.33%',
    bottom: '55%',
    top: '0%',
    height: '45%',
    maxWidth: '100%',
  },
  searchParent: {
    left: 116,
    width: 30,
  },
  saved: {
    left: 1,
  },
  vectorIcon2: {
    right: '0%',
    left: '0%',
    bottom: '55%',
    top: '0%',
    height: '45%',
    maxWidth: '100%',
    width: '100%',
  },
  vectorIcon3: {
    height: '16.67%',
    width: '29.63%',
    top: '25%',
    right: '7.41%',
    bottom: '58.33%',
    left: '62.96%',
  },
  savedParent: {
    left: 255,
    width: 27,
  },
  teenyiconshomeSolidParent: {
    borderRadius: Border.br_3xl,
    backgroundColor: Color.GREY,
    width: 339,
    height: 80,
    overflow: 'hidden',
    top: 0,
  },
  frameChild13: {
    top: 19,
    width: 46,
    height: 46,
  },
  frameChild14: {
    left: 380,
    width: 80,
    height: 80,
    top: 0,
    position: 'absolute',
  },
  image4Icon: {
    borderRadius: 52,
    width: 53,
    height: 55,
  },
  frameChild15: {
    width: 14,
    height: 14,
  },
  frameParent2: {
    height: 80,
    top: 0,
  },
  frameChild16: {
    width: '50%',
    right: '27.78%',
    left: '22.22%',
    bottom: '55%',
    top: '0%',
    height: '45%',
    maxWidth: '100%',
  },
  listPropertyParent: {
    left: 212,
    width: 54,
  },
  frameParent1: {
    top: 1874,
    height: 80,
  },
  heartOutline: {
    left: 91,
    width: 24,
    overflow: 'hidden',
    top: 0,
  },
  frame13: {
    top: 1559,
    width: 115,
    overflow: 'hidden',
    left: 0,
  },
  frame7: {
    height: 1954,
    top: 386,
    overflow: 'hidden',
  },
  hero: {
    flex: 1,
    height: 2362,
    width: '100%',
  },
  cardFindRoom: {
    height: height * 0.125,
    elevation: 2,
    backgroundColor: '#FFF',
    marginLeft: 15,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: width * 0.46,
  },
});
export default Home;

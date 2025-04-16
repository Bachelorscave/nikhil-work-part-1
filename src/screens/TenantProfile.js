import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ToastAndroid,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import * as ImagePicker from 'react-native-image-picker';
import Color from '../Utils/Colors';
import {Uploadphoto, getPhoto} from '../apiservice/OwnerApi';
import {err} from 'react-native-svg';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {FontFamily} from '../../GlobalStyles';

const {width, height} = Dimensions.get('window');

function TenantProfile(props) {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    fetchPHOTO();
  }, [fetchPHOTO, refresh]);

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

  console.log(user);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      aspect: [4, 4],
      quality: 0.5,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImages(result.assets.map(asset => asset.uri));
      console.log(images);
      console.log(images[0]);
      try {
        const response = await Uploadphoto(images[0]);
        console.log(response);
        if (response.status == 200) {
          setRefresh(prev => !prev);

          console.log('successfull');
          ToastAndroid.showWithGravityAndOffset(
            'Profile pic updated succesfully!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else {
          console.log(Error);
          ToastAndroid.show(Error, ToastAndroid.SHORT);
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log('done');
      }
    }
  };

  if (hasGalleryPermission === false) {
    return console.log('permission denied');
  }
  console.log(imagenew);
  console.log(imagenew.profilePicture);

  const logout = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('AccessToken');
      console.log('User has been logged out.');

      // Optionally, you can navigate the user to the login screen
      // Assuming you are using React Navigation
      ToastAndroid.showWithGravityAndOffset(
        'Logout Successfull!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      navigation.navigate('Login1');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const navigation = useNavigation();

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
  const [profilePic, setProfilePic] = useState('');
  console.log('🚀 ~ TenantProfile ~ profilePic:', profilePic);
  const [isLocalStateProfilePic, setIsLocalStateProfilePic] = useState(false);
  console.log(
    '🚀 ~ TenantProfile ~ isLocalStateProfilePic:',
    isLocalStateProfilePic,
  );
  const selectPhoto = async idx => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
    };

    try {
      const response = await new Promise((resolve, reject) => {
        ImagePicker.launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
            resolve(null); // Handle cancellation
          } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
            reject(new Error(response.errorMessage)); // Handle error
          } else {
            resolve(response);
          }
        });
      });

      if (response) {
        console.log('inside select photo');
        const sources = response.assets;
        setProfilePic(sources[0].uri);

        const uploadResponse = await Uploadphoto(sources[0].uri);
        console.log('🚀 ~ selectPhoto ~ uploadResponse:', uploadResponse);
        setIsLocalStateProfilePic(true);
      }
    } catch (error) {
      console.error('Error selecting photo: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 15,
          width: width,
          height: height * 0.035,
          marginLeft: 5,
          // borderWidth: 1,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            color="black"
            size={22}
            style={{marginLeft: 20}}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#FFF',
          height: 'auto',
          width: width * 0.95,
          flex: 1,
        }}>
        <View
          style={{
            height: height * 0.15,
            elevation: 2,
            backgroundColor: '#FFF',

            marginHorizontal: 10,
            marginTop: 10,
            borderRadius: 15,
            marginBottom: 6,
            width: width * 0.9,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: responsiveWidth(5),
            }}>
            <View
              style={{
                width: width * 0.2,
                alignItems: 'center',
                justifyContent: 'center',
                // borderWidth: 1,
              }}>
              <TouchableOpacity
                style={{
                  height: width * 0.185,
                  width: width * 0.185,
                  backgroundColor: 'black',
                  marginVertical: 25,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => selectPhoto()}>
                <Image
                  source={{
                    uri: isLocalStateProfilePic
                      ? profilePic
                      : isValidProfilePick
                      ? `http://93.127.185.101:8005/api/utils/get-image/${imagenew.profilePicture}`
                      : `https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg`,
                  }}
                  style={{
                    height: width * 0.16,
                    width: width * 0.16,
                    borderRadius: 50,
                    // marginHorizontal: 5,
                    // marginVertical: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                // width: width * 0.5,
                marginTop: 30,
                marginLeft: responsiveWidth(2),
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    // fontWeight: '600',
                    // alignItems: 'flex-start',
                    color: Color.BLACK,
                    // fontFamily: FontFamily.interSemiBold,
                    fontFamily: FontFamily.interSemiBold,
                  }}>
                  {user}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: Color.textC,
                    fontSize: responsiveFontSize(1.5),
                    fontFamily: FontFamily.interRegular,
                  }}>
                  Tenant
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{marginTop: responsiveWidth(2.5)}}
                  onPress={() => navigation.navigate('Tentate')}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        // alignItems: 'flex-start',
                        color: Color.colorRoyalblue_100,
                        // marginTop: 20,
                        fontSize: responsiveFontSize(1.5),
                        fontFamily: FontFamily.interRegular,
                      }}>
                      Tenant Space
                    </Text>
                    <Entypo
                      name="chevron-small-right"
                      size={24}
                      style={{color: Color.colorRoyalblue_100}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            // marginHorizontal: 10,

            marginTop: 10,
            marginBottom: 6,
            width: width * 0.95,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              height: height * 0.13,
              elevation: 2,
              backgroundColor: '#FFF',

              marginHorizontal: 10,

              borderRadius: 12,
              marginBottom: 6,
              width: width * 0.42,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('SProperty')}>
            <Text style={styles.overlayText1}>Free</Text>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: Color.GREY,
                marginVertical: 20,
                borderRadius: 50,
              }}>
              <MaterialCommunityIcons
                name="home-plus-outline"
                size={24}
                color="black"
                style={{marginHorizontal: 5, marginVertical: 5}}
              />
            </View>
            <View>
              <Text
                style={{
                  // fontSize: 15,
                  color: Color.PRIMARY,
                  fontFamily: FontFamily.interRegular,
                  fontSize: responsiveFontSize(2),
                }}>
                List Property
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: height * 0.13,
              elevation: 2,
              backgroundColor: '#FFF',

              marginHorizontal: 10,

              borderRadius: 12,
              marginBottom: 6,
              width: width * 0.42,
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: Color.GREY,
                marginVertical: 20,
                borderRadius: 50,
              }}>
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={24}
                color="black"
                style={{marginHorizontal: 5, marginVertical: 5}}
              />
            </View>
            <View>
              <Text
                style={{
                  // fontSize: 15,
                  color: Color.PRIMARY,
                  fontFamily: FontFamily.interRegular,
                  fontSize: responsiveFontSize(2),
                }}>
                Saved
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            height: height * 0.06,
            elevation: 1,
            backgroundColor: '#FFF',

            marginHorizontal: 10,
            marginTop: 5,
            borderRadius: 10,
            marginBottom: 6,
            width: width * 0.9,
            flexDirection: 'row',
          }}>
          <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
            <View>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  color: Color.colorRoyalblue_100,
                  textAlignVertical: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: FontFamily.interMedium,
                  // textAlign: 'center',
                }}>
                {user}{' '}
                <MaterialCommunityIcons
                  name="information-outline"
                  size={13}
                  color={Color.colorRoyalblue_100}
                />
              </Text>
            </View>
            <View style={{marginTop: 1}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  fontFamily: FontFamily.interMedium,
                  color: Color.BLACK,
                }}>
                View Profile
              </Text>
            </View>
          </View>
          <View
            style={{width: '20%', alignItems: 'center', marginVertical: 12}}>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: height * 0.055,
            elevation: 1,
            backgroundColor: Color.BLACK,
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 10,
            borderRadius: 10,
            marginBottom: 6,
            width: width * 0.9,
            flexDirection: 'row',
          }}>
          <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../image/king.jpg')}
                style={{height: 25, width: 25, marginTop: 2, marginRight: 10}}
              />
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  // color: Color.YELLOW,
                  color: '#FFFED5',
                  marginVertical: 5,
                  fontFamily: FontFamily.interMedium,
                }}>
                {' '}
                Bachelor Cave Prime
              </Text>
            </View>
          </View>
          <View
            style={{width: '20%', alignItems: 'center', marginVertical: 12}}>
            <Entypo name="chevron-small-right" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 'auto',
            width: '100%',
            borderWidth: 1,
            borderColor: Color.GREY,
            borderRadius: 10,
            paddingBottom: 10,
          }}>
          <View
            style={{
              width: '90%',
              height: 30,
              borderLeftColor: Color.colorRoyalblue_100,
              borderLeftWidth: 2,
              marginTop: 8,
            }}>
            <Text
              style={{
                marginLeft: 15,
                color: Color.BLACK,
                marginTop: 4,
                // fontSize: 16,
                fontSize: responsiveFontSize(2),
                fontFamily: FontFamily.interSemiBold,
                // fontWeight: '500',
              }}>
              My Services
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 'auto',
              // marginTop: 8,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: width * 0.9,
                flexDirection: 'row',
              }}
              onPress={() => navigation.navigate('Tentate')}>
              <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: Color.lightblue,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <MaterialCommunityIcons
                      name="home-circle-outline"
                      size={20}
                      color="black"
                      style={{marginHorizontal: 5, marginVertical: 5}}
                    />
                  </View>
                  <Text
                    style={{
                      // fontSize: 15,
                      color: Color.PRIMARY,
                      marginVertical: 5,
                      // fontWeight: 400,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily.interMedium,
                    }}>
                    Tentant Space
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Entypo name="chevron-small-right" size={20} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: width * 0.9,
                flexDirection: 'row',
              }}
              onPress={() => navigation.navigate('#')}>
              <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: Color.lightblue,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <MaterialCommunityIcons
                      name="contactless-payment-circle"
                      size={20}
                      color="black"
                      style={{marginHorizontal: 5, marginVertical: 5}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.PRIMARY,
                      marginVertical: 5,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily.interMedium,
                    }}>
                    {' '}
                    My Payment
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Entypo name="chevron-small-right" size={20} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: width * 0.9,
                flexDirection: 'row',
              }}
              onPress={() => navigation.navigate('Tentate')}>
              <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: Color.lightblue,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <MaterialCommunityIcons
                      name="contacts-outline"
                      size={20}
                      color="black"
                      style={{marginHorizontal: 5, marginVertical: 5}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.PRIMARY,
                      marginVertical: 5,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily.interMedium,
                    }}>
                    {' '}
                    Contacted Properties
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Entypo name="chevron-small-right" size={20} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                // borderBottomWidth: 1,
                // backgroundColor: Color.WHITE,
                // borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                // marginBottom: 6,
                width: width * 0.9,
                flexDirection: 'row',
              }}
              onPress={() => navigation.navigate('SeenP')}>
              <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: Color.lightblue,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <MaterialCommunityIcons
                      name="archive-search"
                      size={20}
                      color="black"
                      style={{marginHorizontal: 5, marginVertical: 5}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.PRIMARY,
                      marginVertical: 5,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily.interMedium,
                    }}>
                    {' '}
                    Seen Properties
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Entypo name="chevron-small-right" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 'auto',
            width: '100%',
            borderWidth: 1,
            borderColor: Color.GREY,
            borderRadius: 10,
            paddingBottom: 10,
            marginTop: 15,
          }}>
          <View
            style={{
              width: '90%',
              height: 30,
              borderLeftColor: Color.colorRoyalblue_100,
              borderLeftWidth: 2,
              marginTop: 8,
            }}>
            <Text
              style={{
                marginLeft: 15,
                color: Color.BLACK,
                marginTop: 4,
                fontSize: 16,
                fontWeight: '500',
              }}>
              Our Packages
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 'auto',
              // marginTop: 8,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: width * 0.9,
                flexDirection: 'row',
              }}>
              <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: Color.lightblue,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <MaterialCommunityIcons
                      name="human-dolly"
                      size={20}
                      color="black"
                      style={{marginHorizontal: 5, marginVertical: 5}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.PRIMARY,
                      marginVertical: 5,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily.interMedium,
                    }}>
                    {' '}
                    Owner Packages
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Entypo name="chevron-small-right" size={20} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                // borderBottomWidth: 1,
                // backgroundColor: Color.WHITE,
                // borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                // marginBottom: 6,
                width: width * 0.9,
                flexDirection: 'row',
              }}>
              <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: Color.lightblue,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <MaterialCommunityIcons
                      name="wallet-membership"
                      size={20}
                      color="black"
                      style={{marginHorizontal: 5, marginVertical: 5}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.PRIMARY,
                      marginVertical: 5,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily.interMedium,
                    }}>
                    {' '}
                    Bachelor Cave Prime
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Entypo name="chevron-small-right" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 'auto',
            width: '100%',
            borderWidth: 1,
            borderColor: Color.GREY,
            borderRadius: 10,
            paddingBottom: 10,
            marginTop: 15,
            marginBottom: responsiveWidth(10),
          }}>
          <View
            style={{
              width: '90%',
              height: 30,
              borderLeftColor: Color.colorRoyalblue_100,
              borderLeftWidth: 2,
              marginTop: 8,
            }}>
            <Text
              style={{
                marginLeft: 15,
                color: Color.BLACK,
                marginTop: 4,
                fontSize: 16,
                fontSize: responsiveFontSize(2),
                fontFamily: FontFamily.interSemiBold,
              }}>
              More
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 'auto',
              // marginTop: 8,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: width * 0.9,
                flexDirection: 'row',
              }}>
              <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: Color.lightblue,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <MaterialCommunityIcons
                      name="help-network"
                      size={20}
                      color="black"
                      style={{marginHorizontal: 5, marginVertical: 5}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.PRIMARY,
                      marginVertical: 5,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily.interMedium,
                    }}>
                    {' '}
                    Visit Help Center
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Entypo name="chevron-small-right" size={20} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: width * 0.9,
                flexDirection: 'row',
              }}>
              <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: Color.lightblue,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <MaterialIcons
                      name="feedback"
                      size={20}
                      color="black"
                      style={{marginHorizontal: 5, marginVertical: 5}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.PRIMARY,
                      marginVertical: 5,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily.interMedium,
                    }}>
                    {' '}
                    Feedback
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Entypo name="chevron-small-right" size={20} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: height * 0.05,
                // borderBottomWidth: 1,
                // backgroundColor: Color.WHITE,
                // borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                // marginBottom: 6,
                width: width * 0.9,
                flexDirection: 'row',
              }}
              onPress={logout}>
              <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: Color.lightblue,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <MaterialIcons
                      name="logout"
                      size={20}
                      color="black"
                      style={{marginHorizontal: 5, marginVertical: 5}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.PRIMARY,
                      marginVertical: 5,
                      fontSize: responsiveFontSize(1.8),
                      fontFamily: FontFamily.interMedium,
                    }}>
                    {' '}
                    Logout
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Entypo name="chevron-small-right" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  overlayText1: {
    paddingHorizontal: 8,

    textAlign: 'center',
    fontSize: 8,
    backgroundColor: Color.BLACK,
    opacity: 1,
    fontWeight: '200',
    paddingTop: 2,
    paddingBottom: 2,
    color: 'white',
    borderRadius: 3,
    marginLeft: 6,
    position: 'absolute', // positions the text relative to the parent
    top: 8, // adjusts the text to the bottom of the image
    right: 6,
  },
});

export default TenantProfile;

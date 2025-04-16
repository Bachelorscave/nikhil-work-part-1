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

const {width, height} = Dimensions.get('window');

function OwnerProfile(props) {
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
          ToastAndroid.showWithGravityAndOffset(
            'Profile pic updated succesfully!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          setRefresh(prev => !prev);

          console.log('successfull');
        } else {
          console.log(error);
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
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 15,
          width: '100%',
          height: 35,

          marginLeft: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            color="black"
            size={22}
            style={{marginTop: 12, marginLeft: 20}}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          backgroundColor: '#FFF',
          height: 'auto',
          width: '95%',
          flex: 1,
        }}>
        <View
          style={{
            height: 130,
            elevation: 2,
            backgroundColor: '#FFF',
            marginTop: 10,
            marginHorizontal: 10,

            borderRadius: 15,
            marginBottom: 6,
            width: '95%',
          }}>
          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
            <View
              style={{
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: 80,
                  width: 80,
                  backgroundColor: 'black',
                  marginVertical: 25,
                  borderRadius: 50,
                }}
                onPress={() => pickImage()}>
                <Image
                  source={{
                    uri: `http://93.127.185.101:8005/api/utils/get-image/${imagenew.profilePicture}`,
                  }}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{width: '50%', marginTop: 30, marginLeft: 30}}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    alignItems: 'flex-start',
                  }}>
                  {user}
                </Text>
              </View>
              <View>
                <Text
                  style={{color: Color.textC, marginLeft: 25, fontSize: 16}}>
                  Owner
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Owner')}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        alignItems: 'flex-start',
                        color: Color.colorRoyalblue_100,
                        marginTop: 20,
                        fontSize: 14,
                      }}>
                      Owner Space{' '}
                    </Text>
                    <Entypo
                      name="chevron-small-right"
                      size={24}
                      style={{color: Color.colorRoyalblue_100, marginTop: 20}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 10,

            marginTop: 10,
            marginBottom: 6,
            width: '100%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              height: 110,
              elevation: 2,
              backgroundColor: '#FFF',

              marginHorizontal: 10,

              borderRadius: 12,
              marginBottom: 6,
              width: '43%',
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
              <Text style={{fontSize: 15, color: Color.PRIMARY}}>
                List Property
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 110,
              elevation: 2,
              backgroundColor: '#FFF',

              marginHorizontal: 10,

              borderRadius: 12,
              marginBottom: 6,
              width: '43%',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('HomeStack')}>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: Color.GREY,
                marginVertical: 20,
                borderRadius: 50,
              }}>
              <MaterialCommunityIcons
                name="home-search-outline"
                size={24}
                color="black"
                style={{marginHorizontal: 5, marginVertical: 5}}
              />
            </View>
            <View>
              <Text style={{fontSize: 15, color: Color.PRIMARY}}>
                Home Search
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            height: 46,
            elevation: 1,
            backgroundColor: '#FFF',

            marginHorizontal: 10,
            marginTop: 5,
            borderRadius: 10,
            marginBottom: 6,
            width: '95%',
            flexDirection: 'row',
          }}>
          <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
            <View>
              <Text style={{fontSize: 12, color: Color.colorRoyalblue_100}}>
                {' '}
                Mohd Anas
              </Text>
            </View>
            <View style={{marginTop: 1}}>
              <Text style={{fontSize: 13}}> View Profile</Text>
            </View>
          </View>
          <View
            style={{width: '20%', alignItems: 'center', marginVertical: 12}}>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 46,
            elevation: 1,
            backgroundColor: Color.BLACK,

            marginHorizontal: 10,
            marginTop: 10,
            borderRadius: 10,
            marginBottom: 6,
            width: '95%',
            flexDirection: 'row',
          }}>
          <View style={{width: '80%', marginLeft: 15, marginVertical: 5}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../image/king.jpg')}
                style={{height: 25, width: 25, marginTop: 2, marginRight: 10}}
              />
              <Text
                style={{fontSize: 15, color: Color.YELLOW, marginVertical: 5}}>
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
                fontSize: 16,
                fontWeight: '500',
              }}>
              My Services
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 'auto',
              marginTop: 8,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 40,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: '95%',
                flexDirection: 'row',
              }}
              onPress={() => navigation.goBack()}>
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
                      name="cards-heart-outline"
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
                      fontWeight: 400,
                    }}>
                    {' '}
                    My Listing
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
                height: 40,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: '95%',
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
                      name="cards-heart-outline"
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
                      fontWeight: 400,
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
                height: 40,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: '95%',
                flexDirection: 'row',
              }}
              onPress={() => navigation.navigate('MatchingT')}>
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
                      name="cards-heart-outline"
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
                      fontWeight: 400,
                    }}>
                    {' '}
                    Matching Tenant
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
                height: 40,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: '95%',
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
                      name="cards-heart-outline"
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
                      fontWeight: 400,
                    }}>
                    {' '}
                    View Responses
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
              marginTop: 8,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 40,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: '95%',
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
                      name="cards-heart-outline"
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
                      fontWeight: 400,
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
                height: 40,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: '95%',
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
                      name="cards-heart-outline"
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
                      fontWeight: 400,
                    }}>
                    {' '}
                    bachelor cave Prime
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
              More
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 'auto',
              marginTop: 8,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 40,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: '95%',
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
                      name="cards-heart-outline"
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
                      fontWeight: 400,
                    }}>
                    {' '}
                    View Help Center
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
                height: 40,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: '95%',
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
                      name="cards-heart-outline"
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
                      fontWeight: 400,
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
                height: 40,
                borderBottomWidth: 1,
                backgroundColor: Color.WHITE,
                borderBottomColor: Color.GREY,

                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 6,
                width: '95%',
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
                      fontWeight: 400,
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

export default OwnerProfile;

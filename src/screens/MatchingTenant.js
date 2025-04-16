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
  Linking,
  Platform,
  ToastAndroid,
} from 'react-native';

import HeaderT from '../components/main/HeaderMatching';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@react-navigation/stack';
import Color from '../Utils/Colors';
import {BookedVisit} from '../apiservice/OwnerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

function MatchingTenant(props) {
  const [listing, setListing] = useState([]);
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    try {
      const jsonData = await BookedVisit();
      if (jsonData) {
        setListing(jsonData);
        console.log('Listing:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const fetchUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('Name');
      console.log('🚀 ~ fetchUserId ~ value:', value);
      if (value !== null) {
        setUser(value);
        console.log('Name: ', value);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  useEffect(
    () => {
      fetchData();
      fetchUserId();
    },
    [fetchData],
    [fetchUserId],
  );

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
  const dataCOunt = listing.length;

  return (
    <View style={styles.container}>
      <HeaderT />

      <View
        style={{
          backgroundColor: '#FFF',
          height: 'auto',
          width: width * 0.95,
          borderWidth: 1,
          borderColor: Color.GREY,
          borderRadius: 6,
          elevation: 1,
          flex: 1,
        }}>
        <View
          style={{
            width: width * 0.95,
            marginHorizontal: 5,
            height: height * 0.06,
          }}>
          <Text
            style={{
              marginLeft: 15,
              color: Color.colorRoyalblue_100,
              marginTop: 4,
            }}>
            Hi {user},
          </Text>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 12,
              marginTop: 8,
              marginRight: 30,
              color: Color.BLACK,
            }}>
            Connect with {dataCOunt} Book site Visit for your properties{' '}
          </Text>
        </View>

        <ScrollView style={{width: width, height: 'auto', marginTop: 5}}>
          {listing.map((item, index) => (
            <View style={{width: width * 0.95}} key={index}>
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
                    width: width * 0.88,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: width * 0.2,
                      height: height * 0.05,
                      left: 15,
                    }}>
                    <Image
                      source={{
                        uri: `http://93.127.185.101:8005/api/utils/get-image/${item.user.profilePicture}`,
                      }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        marginHorizontal: 5,
                        marginVertical: 5,
                      }}
                    />
                  </View>
                  <View style={{width: width * 0.4, marginTop: 10}}>
                    <Text style={{fontSize: 12, color: Color.BLACK}}>
                      {item.user.name}
                    </Text>
                    <Text style={{fontSize: 10, color: Color.textC}}>
                      {item.user.phoneNumber}
                    </Text>
                    <Text style={{fontSize: 10, color: Color.textC}}>
                      {item.user.email}
                    </Text>
                  </View>
                  <View style={{width: '17%', marginTop: 10}}>
                    <TouchableOpacity
                      style={{
                        width: width * 0.14,
                        height: 20,
                        backgroundColor: Color.colorRoyalblue_100,
                        borderRadius: 5,
                        marginTop: -4,
                        paddingHorizontal: 2,
                        paddingVertical: 2,
                        borderWidth: 1,
                        borderColor: Color.GREY,
                      }}
                      onPress={() => makeCall(item.user.phoneNumber)}>
                      <Text
                        style={{
                          width: 'auto',
                          color: Color.WHITE,
                          fontSize: 10,
                          // marginHorizontal: 6,
                          paddingHorizontal: 6,
                        }}>
                        Contact
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: width * 0.88,
                    justifyContent: 'space-between',
                    marginHorizontal: 15,
                    marginVertical: 10,
                  }}>
                  <View style={{width: width * 0.25, marginTop: 10}}>
                    <TouchableOpacity
                      style={{
                        width: width * 0.2,
                        height: 20,
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
                          fontSize: 10,
                          alignSelf: 'center',
                        }}>
                        More Option
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width: width * 0.4, marginTop: 8}}>
                    <Text style={{color: Color.textC, fontSize: 12}}>
                      <Text style={{color: Color.BLACK}}>Requested:</Text>{' '}
                      {item.responseDate}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderColor: 'royalblue',
  },
  activeTabText: {
    color: 'royalblue',
  },
});

export default MatchingTenant;

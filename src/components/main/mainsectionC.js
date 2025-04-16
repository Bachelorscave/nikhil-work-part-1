import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import EllipseLineBlur from '../../Assets/SVGs/EllipseLineBlur.svg';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Color, FontFamily} from '../../../GlobalStyles';
const {width, height} = Dimensions.get('window');

const HeadSection1 = props => {
  const NearByRoom = [
    {
      place: 'Chandigarh University',
      imageUrl: '../image/SampleImage.png',
    },
  ];

  const handleSearch = () => {
    // Handle search functionality here
    alert('Search button clicked!');
  };
  const navigation = useNavigation();

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
  return (
    <View
      style={{
        backgroundColor: 'rgba(16, 12, 8, 1)',
        height: height * 0.33,

        paddingHorizontal: 20,
      }}>
      {/* <View style={{borderWidth: 1, borderColor: '#fff'}}>
        <EllipseLineBlur width={100} height={100} fill="#fff" />
      </View> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
          width: width,
          height: height * 0.03,
        }}>
        <TouchableOpacity
          style={{width: width * 0.06}}
          onPress={() => navigation.navigate('OwnerProfile')}>
          <Image
            source={require('../../image/logo.jpg')}
            style={{
              height: height * 0.03,
              width: width * 0.06,
              marginTop: 15,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            height: height * 0.03,
            width: width * 0.06,
            marginTop: 25,
            marginLeft: 15,
          }}>
          <TouchableOpacity
            style={{width: width * 0.1, height: height * 0.04}}
            onPress={() => navigation.navigate('OwnerProfile')}>
            <Image source={require('../../image/BachelorCave.png')} />
          </TouchableOpacity>
        </View>

        <View style={{width: width * 0.75, alignItems: 'flex-end'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,

              height: height * 0.032,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('#')}>
              <FontAwesome6 name="bell" color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeStack')}
              style={{
                backgroundColor: 'white',

                borderRadius: 5,
                marginLeft: 18,
                width: responsiveWidth(25),
                height: responsiveWidth(6),

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.interSemiBold,
                  fontSize: responsiveFontSize(1.5),
                  color: Color.colorBlack,
                }}>
                Home Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: height * 0.065,
          width: width,
        }}>
        <View style={{width: width * 0.65}}>
          <Text
            style={{
              fontSize: 23,
              color: '#FFF',
              marginLeft: 10,
              // width: '55',
            }}>
            Hi,{user} Welcome{' '}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#FFF',
              marginLeft: 10,
              width: '55',
            }}>
            to Owner Space
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#FFF',
              marginLeft: 10,
              marginTop: 5,
              width: 250,
            }}>
            Follow our guide to get started on platform,our guaranteed,
            last-minute cancelling, everything is there!
          </Text>
        </View>

        <View
          style={{
            width: width * 0.25,

            alignItems: 'flex-end',
            marginRight: 30,
          }}>
          <Image
            source={require('../../image/bu1.jpg')}
            style={{
              height: height * 0.1,
              width: width * 0.15,
              marginTop: 20,
              borderWidth: 3,
              borderColor: 'grey',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{
          backgroundColor: 'rgba(97, 85, 233, 100)',

          borderRadius: 5,
          marginLeft: 10,
          paddingHorizontal: 18,
          paddingVertical: 7,
          width: width * 0.35,
          top: height * 0.03,
        }}>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 11}}>
          Discover Our Guide
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 5,
  },
  searchIcon: {
    padding: 10,
  },
});

export default HeadSection1;

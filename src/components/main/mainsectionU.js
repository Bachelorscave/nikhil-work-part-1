import React, {useState} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {CALLBACK_TYPE} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import {Color} from '../../../GlobalStyles';
import Colors, {FontFamily} from '../../Utils/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import EllipseLineBlur from '../../Assets/SVGs/EllipseLineBlur.svg';
const {width, height} = Dimensions.get('window');
import {BlurView} from '@react-native-community/blur';
//props.onSearch(searchText);
import {
  Svg,
  Circle,
  Defs,
  Filter,
  FeFlood,
  FeBlend,
  FeGaussianBlur,
  G,
} from 'react-native-svg';
import MapsIcon from '../../Assets/svg/MapsIcon';

const CustomSVG = () => {
  return (
    <Svg width="400" height="400" viewBox="0 0 400 400" fill="none">
      <Defs>
        <Filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
          <FeGaussianBlur stdDeviation="90" />
        </Filter>
      </Defs>

      {/* Dark background */}
      <Circle cx="200" cy="200" r="200" fill="black" />

      {/* Blurred circle to create the glow effect */}
      <G filter="url(#blurFilter)">
        <Circle cx="200" cy="200" r="50" fill="white" />
      </G>
    </Svg>
  );
};
const HeadSection1 = props => {
  const navigation = useNavigation();
  const [searchText, setsearchText] = useState('');

  const handleSearch = () => {
    const search = {
      searchText,
    };
    console.log(search.searchText);
    navigation.navigate('Filter', {search});

    // onPress={navigation.navigate("Filter",{searchText})}}
  };
  //   const colors = [
  //     'rgba(16, 12, 8, 1)', // Dark center
  //     'rgba(17, 13, 9, 1)',
  //     'rgba(18, 14, 10, 1)',
  //     'rgba(19, 15, 11, 1)',
  //     'rgba(20, 16, 12, 1)',
  //     'rgba(21, 17, 13, 1)',
  //     'rgba(22, 18, 14, 1)',
  //     'rgba(23, 19, 15, 1)',
  //     'rgba(24, 20, 16, 1)',
  //     'rgba(25, 21, 17, 1)',
  //     'rgba(26, 22, 18, 1)',
  //     'rgba(27, 23, 19, 1)',
  //     'rgba(28, 24, 20, 1)',
  //     'rgba(29, 25, 21, 1)',
  //     'rgba(30, 26, 22, 1)',
  //     'rgba(31, 27, 23, 1)',
  //     'rgba(32, 28, 24, 1)',
  //     'rgba(33, 29, 25, 1)',
  //     'rgba(34, 30, 26, 1)',
  //     'rgba(35, 31, 27, 1)',
  //     'rgba(36, 32, 28, 1)',
  //     'rgba(37, 33, 29, 1)',
  //     'rgba(38, 34, 30, 1)',
  //     'rgba(39, 35, 31, 1)',
  //     'rgba(40, 36, 32, 1)',
  //     'rgba(41, 37, 33, 1)',
  //     'rgba(42, 38, 34, 1)',
  //     'rgba(43, 39, 35, 1)',
  //     'rgba(44, 40, 36, 1)',
  //     'rgba(45, 41, 37, 1)',
  //     'rgba(46, 42, 38, 1)',
  //     'rgba(47, 43, 39, 1)',
  //     'rgba(48, 44, 40, 1)',
  //     'rgba(49, 45, 41, 1)',
  //     'rgba(50, 46, 42, 1)',
  //     'rgba(51, 47, 43, 1)',
  //     'rgba(52, 48, 44, 1)',
  //     'rgba(53, 49, 45, 1)',
  //     'rgba(54, 50, 46, 1)',
  //     'rgba(55, 51, 47, 1)',
  //     'rgba(56, 52, 48, 1)',
  //     'rgba(57, 53, 49, 1)',
  //     'rgba(58, 54, 50, 1)',
  //     'rgba(59, 55, 51, 1)',
  //     'rgba(60, 56, 52, 1)',
  //     'rgba(61, 57, 53, 1)',
  //     'rgba(62, 58, 54, 1)',
  //     'rgba(63, 59, 55, 1)',
  //     'rgba(64, 60, 56, 1)',
  //     'rgba(65, 61, 57, 1)',
  //     'rgba(66, 62, 58, 1)',
  //     'rgba(67, 63, 59, 1)',
  //     'rgba(68, 64, 60, 1)',
  //     'rgba(69, 65, 61, 1)',
  //     'rgba(70, 66, 62, 1)',
  //     'rgba(71, 67, 63, 1)',
  //     'rgba(72, 68, 64, 1)',
  //     'rgba(73, 69, 65, 1)',
  //     'rgba(74, 70, 66, 1)',
  //     'rgba(75, 71, 67, 1)',
  //     'rgba(76, 72, 68, 1)',
  //     'rgba(77, 73, 69, 1)',
  //     'rgba(78, 74, 70, 1)',
  //     'rgba(79, 75, 71, 1)',
  //     'rgba(80, 76, 72, 1)', // Outer edge
  //   ];
  const colors = [
    'rgba(16, 12, 8, 1)',
    'rgba(17, 13, 9, 1)',
    'rgba(17, 13, 9, 1)',
    'rgba(18, 14, 10, 1)',
    'rgba(19, 15, 11, 1)',
    'rgba(19, 15, 11, 1)',
    'rgba(20, 16, 12, 1)',
    'rgba(21, 17, 13, 1)',
    'rgba(21, 17, 13, 1)',
    'rgba(22, 18, 14, 1)',
    'rgba(23, 19, 15, 1)',
    'rgba(24, 20, 16, 1)',
    'rgba(25, 21, 17, 1)',
    'rgba(26, 22, 18, 1)',
    'rgba(27, 23, 19, 1)',
    'rgba(28, 24, 20, 1)',
    'rgba(29, 25, 21, 1)',
    'rgba(30, 26, 22, 1)',
    'rgba(31, 27, 23, 1)',
    'rgba(32, 28, 24, 1)',
    'rgba(33, 29, 25, 1)',
    'rgba(34, 30, 26, 1)',
    'rgba(35, 31, 27, 1)',
    'rgba(36, 32, 28, 1)',
    'rgba(37, 33, 29, 1)',
    'rgba(38, 34, 30, 1)',
    'rgba(39, 35, 31, 1)',
    'rgba(40, 36, 32, 1)',
    'rgba(41, 37, 33, 1)',
    'rgba(42, 38, 34, 1)',
    'rgba(43, 39, 35, 1)',
    'rgba(44, 40, 36, 1)',
    'rgba(45, 41, 37, 1)',
    'rgba(46, 42, 38, 1)',
    'rgba(47, 43, 39, 1)',
    'rgba(48, 44, 40, 1)',
    'rgba(49, 45, 41, 1)',
    'rgba(50, 46, 42, 1)',
    'rgba(51, 47, 43, 1)',
    'rgba(52, 48, 44, 1)',
    'rgba(53, 49, 45, 1)',
    'rgba(54, 50, 46, 1)',
    'rgba(55, 51, 47, 1)',
    'rgba(56, 52, 48, 1)',
    'rgba(57, 53, 49, 1)',
    'rgba(58, 54, 50, 1)',
    'rgba(59, 55, 51, 1)',
    'rgba(60, 56, 52, 1)',
    'rgba(61, 57, 53, 1)',
    'rgba(62, 58, 54, 1)',
    'rgba(63, 59, 55, 1)',
    'rgba(64, 60, 56, 1)',
    'rgba(65, 61, 57, 1)',
    'rgba(66, 62, 58, 1)',
    'rgba(67, 63, 59, 1)',
    'rgba(68, 64, 60, 1)',
    'rgba(69, 65, 61, 1)',
    'rgba(70, 66, 62, 1)',
    'rgba(71, 67, 63, 1)',
    'rgba(72, 68, 64, 1)',
    'rgba(73, 69, 65, 1)',
    'rgba(74, 70, 66, 1)',
    'rgba(75, 71, 67, 1)',
    'rgba(76, 72, 68, 1)',
    'rgba(77, 73, 69, 1)',
    'rgba(78, 74, 70, 1)',
    'rgba(79, 75, 71, 1)',
    'rgba(80, 76, 72, 1)',
  ];

  const renderLayers = () => {
    return colors.map((color, index) => {
      // Calculate size and borderRadius for each layer
      const size = 300 - index * (300 / colors.length); // Decrease size gradually based on the number of layers
      const borderRadius = size / 2; // Set borderRadius to half the size

      return (
        <View
          key={index}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: borderRadius,
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      );
    });
  };

  return (
    <View
      style={{
        backgroundColor: 'rgba(16, 12, 8, 1)',
        height: height * 0.33,
        // remove after implementation
        paddingHorizontal: 15,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: responsiveWidth(30),
          left: responsiveWidth(10),
          //   backgroundColor: '#000',
        }}>
        {renderLayers()}
      </View>
      <View
        style={{
          position: 'absolute',
          top: responsiveWidth(29),
          left: responsiveWidth(47),
        }}>
        <LinearGradient
          colors={['#667DF5', '#5E17EB']}
          style={{
            width: responsiveWidth(10),
            height: responsiveWidth(10),
            borderRadius: responsiveWidth(10) / 2,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
          width: '100%',
          height: height * 0.032,
        }}>
        <TouchableOpacity
          style={{width: width * 0.06}}
          onPress={() => navigation.navigate('Tenantprofile')}>
          <Image
            source={require('../../image/logo.jpg')}
            style={{
              height: height * 0.032,
              width: width * 0.06,
              marginTop: height * 0.015,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            height: height * 0.1,
            width: width * 0.05,
            marginTop: height * 0.1,
            marginLeft: width * 0.03,
          }}>
          <TouchableOpacity
            style={{height: height * 0.04, width: width * 0.1}}
            onPress={() => navigation.navigate('Tenantprofile')}>
            <Image source={require('../../image/BachelorCave.png')} />
          </TouchableOpacity>
        </View>

        <View style={{width: width * 0.8, alignItems: 'flex-end'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: height * 0.01,

              height: height * 0.032,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SProperty')}>
              <FontAwesome6 name="bell" color="white" size={height * 0.02} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Owner')}
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                marginLeft: width * 0.04,
                width: responsiveWidth(23),
                height: responsiveWidth(6),
                justifyContent: 'center',
                alignItems: 'centers',
                // paddingHorizontal: width * 0.03,
                // paddingVertical: width * 0.01,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FontFamily.InterMedium18,
                  textAlign: 'center',
                  fontSize: responsiveFontSize(1.5),
                }}>
                List Property
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: height * 0.048,
          width: '100%',
        }}>
        <View style={{width: width * 0.5}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              color: '#FFF',
              marginLeft: 8,
              width: '55',

              fontFamily: FontFamily.InterBold18,
            }}>
            Discover a Place{' '}
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              color: '#FFF',
              marginLeft: 8,
              width: '55',
              fontFamily: FontFamily.InterBold18,
            }}>
            You will love to live
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#FFF',
              marginLeft: 8,
              marginTop: 5,
              width: width * 0.4,
              fontFamily: FontFamily.InterRegular18,
            }}>
            Connect with more than 75K renters looking for new homes.
          </Text>
        </View>

        <View
          style={{
            width: width * 0.35,
            alignItems: 'flex-end',
            marginRight: width * 0.01,
          }}>
          <Image
            source={require('../../image/bu1.jpg')}
            style={{
              height: height * 0.1,
              width: width * 0.18,
              marginTop: height * 0.02,
              borderWidth: responsiveWidth(1.5),
              borderColor: '#2B2B2B',
              borderTopLeftRadius: height * 0.045,
              borderTopRightRadius: height * 0.045,
            }}
          />
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          borderRadius: 15,
          marginTop: height * 0.025,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.searchSection}>
          {/* <EvilIcons
            name="location"
            size={20}
            color="black"
            style={styles.searchIcon}
          /> */}
          <View
            style={{
              marginLeft: responsiveWidth(3),
              justifyContent: 'center',
            }}>
            <MapsIcon />
          </View>
          <TextInput
            placeholder="Street, city..."
            placeholderTextColor={'#838383'}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 2,
              marginHorizontal: 1,
              borderRadius: 10,
              //   fontSize: 12,
              fontSize: responsiveFontSize(1.8),
              backgroundColor: '#FFF',
              width: width * 0.53,
              fontFamily: FontFamily.InterMedium18,
              height: height * 0.05,
              //   color: Colors.BLACK,
              color: '#838383',
            }}
            value={searchText}
            onChangeText={text => setsearchText(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(97, 85, 233, 100)',
            borderRadius: 10,
            marginLeft: 8,
            height: height * 0.05,
            width: width * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: responsiveWidth(7.5),
            flexDirection: 'row',
          }}
          // onPress={()=>{navigation.navigate("Filter",{searchText})}}
          onPress={handleSearch}>
          <MaterialIcons
            name="search"
            size={responsiveFontSize(2)}
            color={'#fff'}
          />
          <Text
            style={{
              color: '#FFF',
              //   fontWeight: '100',
              fontSize: responsiveFontSize(1.7),
              alignItems: 'center',
              fontFamily: FontFamily.InterBold18,
              textAlign: 'center',
              //   paddingVertical: responsiveHeight(1),
              //   paddingHorizontal: responsiveWidth(2.75),
            }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
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

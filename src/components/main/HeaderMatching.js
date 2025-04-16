import React from 'react';
import {View, Image, TouchableOpacity, Text, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you're using Expo for icons
import {useNavigation} from '@react-navigation/native';
import Color from '../../Utils/Colors';
const {width, height} = Dimensions.get('screen');

const YourComponent = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: height * 0.02,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        marginTop: 2,
        marginBottom: height * 0.05,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
          width: width,
          height: height * 0.05,
          // paddingBottom: 15,
          marginLeft: 5,
          borderColor: Color.GREY,
          borderBottomWidth: 1.5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            color="black"
            size={24}
            style={{marginLeft: 20}}
          />
        </TouchableOpacity>
        <View
          style={{
            // height: height * 0.04,
            width: '100%',
            // marginTop: 25,
            marginLeft: 15,
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 20,
              marginLeft: 15,
              color: Color.BLACK,
            }}>
            Booking Site Request
          </Text>
        </View>
      </View>
    </View>
  );
};

YourComponent.navigationOptions = {
  title: 'Destination', // Set the screen title
};

export default YourComponent;

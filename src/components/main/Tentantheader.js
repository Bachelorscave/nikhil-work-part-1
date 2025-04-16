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
        height: height * 0.07,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        // borderWidth: 1,
        marginBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
          width: '100%',
          height: height * 0.07,
          paddingBottom: 15,
          marginLeft: 5,
          borderColor: Color.GREY,
          borderBottomWidth: 1.5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            color="black"
            size={24}
            style={{marginTop: 12, marginLeft: 20}}
          />
        </TouchableOpacity>
        <View
          style={{
            height: height * 0.04,
            width: '100%',
            marginTop: 25,
            marginLeft: 15,
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 20,
              marginLeft: 15,
              color: Color.BLACK,
            }}>
            Tenant Space
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

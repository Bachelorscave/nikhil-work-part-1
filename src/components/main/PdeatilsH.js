import React from 'react';
import { View, Image, TouchableOpacity,Text,Dimensions } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you're using Expo for icons
import { useNavigation } from '@react-navigation/native';
import Color from '../../Utils/Colors'
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const { width, height } = Dimensions.get("window");
const YourComponent = () => {
    const navigation = useNavigation();
  return (
    <View style={{
      height: height*0.060,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingHorizontal: 20,
      
      marginBottom:10
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        width: "100%",
        height: height*0.055,
        paddingBottom:18,
        
        borderColor:Color.GREY,
        borderBottomWidth:1.5,
        
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{width:"10%"}}>
              <MaterialCommunityIcons
                name="arrow-left"
                color="black"
                size={responsiveFontSize(2.3)}
                style={{marginTop:12,marginLeft:10}}
              />
            </TouchableOpacity>
        <View
        style={{
            height:height*0.040,
            width:"30%",
            marginTop: 8,
            marginLeft: 40
          }}
        >
        <MaterialCommunityIcons
                name="pencil-circle"
                color={Color.colorRoyalblue_100}
                size={28}
                style={{marginTop:10,}}
              />

        </View>
        <View style={{
          height:height*0.040,
          width:"60%",
          marginTop: 25,
          
          
        }}>
          <Text style={{fontWeight:"500",fontSize:responsiveFontSize(2),marginLeft:-50,color:Color.BLACK}}>Property Deatils</Text>
        </View>
       
      </View>
    </View>
  );
};

YourComponent.navigationOptions = {
    title: 'Destination', // Set the screen title
  };

export default YourComponent;

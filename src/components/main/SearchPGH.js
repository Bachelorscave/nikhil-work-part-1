import React from 'react';
import { View, Image, TouchableOpacity,Text ,Dimensions} from 'react-native';
import  Entypo  from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons" // Assuming you're using Expo for icons
import { useNavigation } from '@react-navigation/native';
import Color from '../../Utils/Colors'
const { width, height } = Dimensions.get('window');
const YourComponent = ({ dataFlat }) => {
  console.log("---->data in header search");
  console.log(dataFlat);
    const navigation = useNavigation();
  return (
   
    <View style={{
      height: height * 0.07, // Responsive height (7% of screen height)
    borderBottomLeftRadius: width * 0.04, // Responsive border radius (5% of screen width)
    borderBottomRightRadius: width * 0.04, // Responsive border radius (5% of screen width)
    paddingHorizontal: width * 0.02, // Responsive horizontal padding (3% of screen width)
    marginBottom: height * 0.02
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.005, // Responsive top margin (1% of screen height)
        width: width * 0.95, // Responsive width (95% of screen width)
        height: height * 0.065, // Responsive height (8% of screen height)
        paddingBottom: height * 0.02, // Responsive bottom padding (2% of screen height)
        borderColor: Color.GREY,
        borderBottomWidth: width * 0.005,
        
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="arrow-left"
                color="black"
                size={24}
                style={{
                  marginTop: height * 0.02, // Responsive top margin (2% of screen height)
                  marginLeft: width * 0.03, // Responsive left margin (3% of screen width)
              }}
              />
            </TouchableOpacity>
        <View style={{
           height: height * 0.05,
           width: width ,
           marginTop: height * 0.02,
           flexDirection: "row",
        }}>
          <View style={{width:width*0.75}}>
           <View style={{height:height*0.036,backgroundColor:Color.lightblue,width:"95%",borderWidth:1,borderColor:Color.colorRoyalblue_100,marginHorizontal:18,
           borderRadius:18,flexDirection:"row"
          }}>
            <TouchableOpacity style={{height: height * 0.025,
    backgroundColor: Color.WHITE,
    width: width * 0.1,
    borderWidth: width * 0.0025,
    borderColor: Color.colorRoyalblue_100,
    marginVertical: height * 0.005,
    marginLeft: width * 0.01,
    borderRadius: width * 0.025,
    flexDirection: "row",
            }}>  
            
            <MaterialIcons
                name="add-circle"
                color="black"
                size={14}
                style={{marginVertical:2,marginLeft:1}}
                
              />
              <Text style={{fontSize:10,marginVertical:2,fontWeight:500,marginLeft:1,color:Color.BLACK}}>Add</Text>

            </TouchableOpacity>
            <View style={{height:height*0.30,width:width*0.4,flexDirection:"row",marginHorizontal:5,marginVertical:7}}>
                 <Text style={{fontSize:12,fontWeight:500,color:Color.BLACK}}>Sector18</Text>
                 <TouchableOpacity>
                 <Entypo
                name="cross"
                color="black"
                size={14}
                style={{marginVertical:2,marginLeft:1}}
                
              /></TouchableOpacity>
               
            </View>
            <TouchableOpacity style={{height:height*0.025,backgroundColor:Color.WHITE,width:width*0.16,borderWidth:0.5,borderColor:Color.BLACK,marginVertical:4
            ,marginLeft:5,borderRadius:15,flexDirection:"row",borderColor:Color.colorRoyalblue_100,
            }}
            onPress={() =>{ navigation.navigate("PgFilterby",{dataFlat})}}
            
            >  
            
            <MaterialCommunityIcons
                name="filter-variant-plus"
                color="black"
                size={16}
                style={{marginVertical:2,marginLeft:2}}
                
              />
              <Text style={{fontSize:10,marginVertical:4,fontWeight:500,marginLeft:1,color:Color.BLACK}}>Filters</Text>
              <MaterialCommunityIcons
                name="chevron-down"
                color="black"
                size={14}
                style={{marginVertical:5}}
                
              />
            </TouchableOpacity>
           </View>
          </View>
          <View style={{width:width*0.25}}>
          <TouchableOpacity 
           
           >
             <MaterialIcons
                name="search"
                color="black"
                size={24}
                style={{marginTop:5,marginLeft:10}}
              />
        
            </TouchableOpacity>
            </View>
        </View>

        
       
      </View>
    </View>
  );
};

YourComponent.navigationOptions = {
    title: 'Destination', // Set the screen title
  };

export default YourComponent;

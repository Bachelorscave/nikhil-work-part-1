import React,{useRef, useState,useEffect } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList, } from "react-native";
    import { RadioButton } from 'react-native-paper';

import HeaderT from "../components/main/PhotoH"
import * as ImagePicker from 'react-native-image-picker';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native';
import { Header } from "@react-navigation/stack";
import Color from '../Utils/Colors'
import { FontSize } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
import { useRoute } from "@react-navigation/native";
import { responsiveFontSize } from "react-native-responsive-dimensions";


function PGphotos(props) {

  const route = useRoute();
  const { pgData } = route.params;
  const { PGRoomDetails } = route.params;
  const {Locality} =route.params;
  const {PGdetails} =route.params;
  const {PGAmenities} =route.params;

    const [hasGalleryPermission,setHasGalleryPermission] =useState(null);
    const [images, setImages] = useState([]);

    useEffect(()=>{
      (async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
      })();
    },[]);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setImages(result.assets.map(asset => asset.uri));
      }
    };

    if(hasGalleryPermission ===false){
      return console.log("permission denied");
    }

        
       
      
        // const choosePhotoFromLibrary = () => {
        //   ImagePicker.openPicker({
        //     width: 300,
        //     height: 300,
        //     cropping: true,
        //     compressImageQuality: 0.7
        //   }).then(image => {
        //     console.log(image);
        //     setImage(image.path);
            
        //   });
        // }    

        // handle photos

        const handlePhotos = () => {
          if(!images){
            Alert.alert('Error', 'Please Select atleast one photo');
               return;
          }

        

        const PGphotos ={
          Images:images
        }

        navigation.navigate('PgScheduler', { pgData ,PGRoomDetails,Locality,PGdetails,PGAmenities,PGphotos});
          console.log('-----jc');
        console.log(PGphotos.Images);
      }
       
  const navigation = useNavigation();
  return (
    <>
    <View style={styles.container}>
    <HeaderT style={{marginTop:20}}/>
    <ScrollView style={{flex:1,width:"95%",}}
    showsVerticalScrollIndicator={false}
    >

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:16,fontWeight:"500"}}>Photos and Videos of your accommodation</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,
    }}>
          <View style={{width:"75%"}}>
            <Text style={{marginVertical:10,marginHorizontal:28,color:Color.BLACK}}>Add photo and video to get 5X more responses.</Text>
          </View>
        <View style={{alignItems:"center"}}>

          <View style={{height:"auto",backgroundColor:Color.lightblue,width:"95%",borderRadius:15,paddingBottom:15}}>
            <Text style={{marginVertical:15,
    marginHorizontal:15,
    
    color:Color.colorRoyalblue_100}}>Photos</Text>
            <View style={{alignItems:"center"}}>
            <View style={{height:80,backgroundColor:Color.WHITE,width:"90%",borderRadius:10,alignItems:"center",paddingVertical:25}}>
            <TouchableOpacity style={{width:"auto",height:height*0.032,backgroundColor:Color.colorRoyalblue_100,borderRadius:5,}}
            
            onPress={() =>pickImage()}
            ><Text style={{width:"100%",color:"white", fontSize:responsiveFontSize(1.3),
                                paddingHorizontal:10,paddingVertical:8}}>+ Add & Take photos</Text></TouchableOpacity>
            </View>
            </View>
            
            <Text style={{marginVertical:15,
    marginHorizontal:15,
    
    color:Color.colorRoyalblue_100}}>Videos</Text>
            <View style={{alignItems:"center"}}>
            <View style={{height:height*0.080,backgroundColor:Color.WHITE,width:"90%",borderRadius:10,alignItems:"center",paddingVertical:25}}>
            <TouchableOpacity style={{width:"auto",height:height*0.032,backgroundColor:Color.colorRoyalblue_100,borderRadius:5,}} ><Text style={{width:"100%",color:"white", fontSize:responsiveFontSize(1.3),
                                paddingHorizontal:10,paddingVertical:8}}>+ Add & Take photos</Text></TouchableOpacity>
            </View>
            </View>

          </View>
        </View>  

      <View style={{height:height*0.100,width:"95%",alignItems:"center", backgroundColor:Color.midblue,borderRadius:5,marginVertical:15,marginHorizontal:10,marginTop:"35%"}}>

    <View style={{flexDirection:"row",marginHorizontal:10}}>
                <Image
                     style={styles.skyscrapersIcon}
                     contentFit="cover"
                     source={require("../image/male.jpg")}
                />
                <Text style={{marginLeft:20,width:"70%",fontSize:responsiveFontSize(1.5),top:20,color:Color.BLACK}}> Don’t want to fill all the details Let us help you</Text>
                <TouchableOpacity style={{width:"auto",height:height*0.020,backgroundColor:Color.colorRoyalblue_100,borderRadius:5,marginTop:34}} ><Text style={{width:"100%",color:"white", fontSize:10,
                                paddingHorizontal:10,paddingVertical:2}}>Call Now</Text></TouchableOpacity>
                                
    </View>
   </View>
      

      </View>
    </View>

    
   </ScrollView>
    </View>
    <View style={{height:height*0.080,width:"100%",backgroundColor:"white"}}>
         <TouchableOpacity
         style={{ 
         backgroundColor: "rgba(97, 85, 233, 100)",
         borderRadius: 10,
         marginHorizontal:20,
         paddingHorizontal: 23,
         paddingVertical: 12,
         bottom:10,
         position:"absolute",
         
         
         width:"90%"
         }}
        //  onPress={()=>navigation.navigate("PgScheduler")}
        onPress={handlePhotos}
         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
         Next, add Sheduling 
         </Text>
         </TouchableOpacity>
         </View>
         </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"white"
  },
  formItem: {
    width: '90%',
    marginBottom: 20,
  },
  skyscrapersIcon: {
    left:10,
    height: 37,
    width: 30,
    top: 20,
    
  },
  input: {
    height: height*0.042,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius:8,
    borderColor:Color.GREY,
    backgroundColor:Color.lightblue,
    fontSize:15,
    color:Color.BLACK
  },
  inputP: {
    height: height*0.042,
    
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius:8,
    borderColor:Color.GREY,
    backgroundColor:Color.lightblue,
    fontSize:15,
    color:Color.BLACK
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: width*0.200,
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedGender: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 200,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  modalOptionText: {
    fontSize: 16,
  },
  selectedOutput: {
    fontSize: 16,
    marginTop: 20,
  },
  text1:{
    marginVertical:15,
    marginHorizontal:15,
    fontWeight:500,
    color:Color.colorRoyalblue_100
  },
  

  
 
});

export default PGphotos;
import React,{useRef, useState } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList,Alert } from "react-native";
    import { RadioButton } from 'react-native-paper';
    import { useRoute } from '@react-navigation/native';
import HeaderT from "../components/main/localityD"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native';
import { Header } from "@react-navigation/stack";
import Color from '../Utils/Colors'
import { FontSize } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get("window");



function PGlocality(props) {
  const route = useRoute();
  const { pgData } = route.params;
  const { PGRoomDetails } = route.params;
  console.log(PGRoomDetails);
    
  const [Address, setAddress] = useState('');
  const [Street, setStreet] = useState('');
  const ForCity = [
    {City: 'Mohali'},
    {City: 'Chandigardh'},
    {City: 'Kharar'},
    
  ];
  
  // all for Guest
  const [selectCity, setselectCity] = useState(''); 
  const [clickedCity, setClickedCity] = useState(false); // for Guest
  const [dataCity, setdataCity] = useState(ForCity);// for Guest
        
 // handle Loaclity Details
const handleLocalityDetails = () => { 

  if (!Address || !Street) {
    Alert.alert('Error', 'Please fill the Address and Deposite of Street room');
    return;
  }

  const Locality ={
    AddressPg :Address,
    Streetpg :Street,
    City:selectCity
  }
  console.log(Locality.AddressPg);
  console.log(Locality.Streetpg);
  console.log(Locality.City);

  navigation.navigate('PGdetails', { pgData ,PGRoomDetails,Locality});

 };

      
      
       
  const navigation = useNavigation();
  return (
    <>
     <View style={styles.container}>
    <HeaderT />
    <ScrollView style={{flex:1,width:"95%",}}
    showsVerticalScrollIndicator={false}
    >

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:20,fontWeight:"500"}}>Locality Details</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           <View style={styles.formItem}>
        <TextInput
          style={styles.input}
          placeholder="Input your Address here"
          value={Address}
          placeholderTextColor={Color.BLACK}
          onChangeText={setAddress}
        />
      </View>
      <View style={styles.formItem}>
        <TextInput
          style={styles.input}
          placeholder="Street/Area Landmark"
          value={Street}
          placeholderTextColor={Color.BLACK}
          onChangeText={setStreet}
          
        />
      </View>
      <TouchableOpacity
        style={{
          width: '90%',
          height: height*0.045,
          borderRadius: 8,
          borderWidth: 1,
          alignSelf: 'center',
          
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          borderColor:Color.GREY,
          backgroundColor:Color.WHITE
        }}
        onPress={() => {
          setClickedCity(!clickedCity);
        }}>
        <Text style={{fontWeight:'200',color:Color.BLACK}}>
          {selectCity == '' ? 'City' : selectCity}
        </Text>
        {clickedCity ? (
          <Image
            source={require('../image/upload.png')}
            style={{width: 10, height: 10}}
          />
        ) : (
          <Image
            source={require('../image/dropdown.png')}
            style={{width: 10, height: 10}}
          />
        )}
      </TouchableOpacity>
      {clickedCity ? (
        <View
          style={{
            elevation: 5,
            marginTop: 20,
            height: "auto",
            alignSelf: 'center',
            width: '90%',
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          {/* <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: '90%',
              height: 50,
              alignSelf: 'center',
              borderWidth: 0.2,
              borderColor: '#8e8e8e',
              borderRadius: 7,
              marginTop: 20,
              paddingLeft: 20,
            }}
          /> */}

          <FlatList
            data={dataCity}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setselectCity(item.City);
                    setClickedCity(!clickedCity);
                    // onSearch('');
                    // setSearch('');
                  }}>
                  <Text style={{fontWeight: '600',color:Color.BLACK}}>{item.City}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}

      <View style={{height:height*0.100,width:"95%",alignItems:"center", backgroundColor:Color.midblue,borderRadius:5,marginVertical:15,marginHorizontal:10}}>

    <View style={{flexDirection:"row",marginHorizontal:10}}>
                <Image
                     style={styles.skyscrapersIcon}
                     contentFit="cover"
                     source={require("../image/male.jpg")}
                />
                <Text style={{marginLeft:20,width:"70%",fontSize:responsiveFontSize(1.5),top:20,color:Color.BLACK}}> Don’t want to fill all the details Let us help you</Text>
                <TouchableOpacity style={{width:"auto",height:height*0.020,backgroundColor:Color.colorRoyalblue_100,borderRadius:5,marginTop:34}} ><Text style={{width:"100%",color:"white", fontSize:responsiveFontSize(1),
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
         onPress={handleLocalityDetails}
         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
         Next, add Pg Deatils   
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
    width: width*0.300,
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
    width: width*0.200,
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
  

  

  
 
});

export default PGlocality;
import React,{useRef, useState } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList, } from "react-native";
    import { RadioButton } from 'react-native-paper';
    import {
      responsiveFontSize,
      responsiveHeight,
      responsiveScreenWidth,
      responsiveWidth,
    } from 'react-native-responsive-dimensions';
import HeaderT from "../components/main/PdeatilsH"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native';
import { Header } from "@react-navigation/stack";
import Color from '../Utils/Colors'
import { FontSize } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from '@react-navigation/native';
const { width, height } = Dimensions.get("window");

const ForG = [
    {Gender: 'Flat'},
    {Gender: 'Gated Society'},
    {Gender: 'Independent House/Villa'},
    {Gender: 'Gated community villa'},

    
];

const ForC=[
    {City:"1RK"},
    {City:"1BHK"},
    {City:"2BKH"},
    {City:"3BKH"},
    {City:"4BKH"},
    {City:"4+BKH"},
]

const ForA=[
  {Age:"New"},
  {Age:"1-5 years"},
  {Age:"5-10 years"},
  {Age:"10+ years"},
  
]

function PropertyDeatils(props) {
  const route = useRoute();
  const {FlatDetails} = route.params;
    
        const [AccommodationName, setAccomodationName] = useState('');
        
        const [Area, setArea] = useState('');
        const [Near, setNear] = useState('');
     
        const [type, setType] = useState('');
        const [BHK, setBHk] = useState('');
        const [Page, setPage] = useState('');
        const [Floor, setFloor] = useState('');
        const [TFloor, setTFloor] = useState('');

        const [text, setText] = useState('');

     

  const [clicked, setClicked] = useState(false); // for gender
  const [clickedC, setClickedC] = useState(false); // fro city
  const [clickedA, setClickedA] = useState(false);
  const [data, setData] = useState(ForG);// for gender
  const [dataC, setDataC] = useState(ForC);// for city
  const [dataA, setDataA] = useState(ForA);
  
  
      
      
      
      
        
      
        const handleSubmit = () => {
          // if (!AccommodationName || !type || !BHK || !Page || !Floor || !TFloor) {
          //   console.log('Error', 'Please fill in all fields');
          //   return;
          // }
      
          // onPress={()=>navigation.navigate("RentalCondition")}
         const PropertyDeatils ={
          AccommodationName,
          type,
          BHK,
          Page,
          Floor,
          TFloor,
          text,
          Area,
          Near

         }
        
         console.log(FlatDetails);
         console.log(PropertyDeatils.AccommodationName);
           navigation.navigate('RentalCondition', {FlatDetails,PropertyDeatils});
          // Your submission logic here
          
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
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:responsiveFontSize(2),fontWeight:"500"}}>Personal Details</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           <View style={styles.formItem}>
        <TextInput
          style={styles.input}
          placeholder="Accomodation"
          placeholderTextColor={Color.BLACK}
          value={AccommodationName}
          onChangeText={setAccomodationName}
        />
      </View>
      <View style={{flexDirection:"row",alignItems:"center"}}>
        <View style={{marginRight:-5}}>
      <TouchableOpacity
        style={{
          width: '72%',
          height: height*0.045,
          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
          marginLeft:40,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          borderColor:Color.GREY,
          backgroundColor:Color.lightblue
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight:'200',color:Color.BLACK}}>
          {type == '' ? 'Type' : type}
        </Text>
        {clicked ? (
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
      {clicked ? (
        <View
          style={{
            elevation: 5,
            marginTop: 20,
            height: "auto",
            alignSelf: 'center',
            width: '60%',
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
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    height: height*0.050,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                   
                  }}
                  onPress={() => {
                    setType(item.Gender);
                    setClicked(!clicked);
                    // onSearch('');
                    // setSearch('');
                  }}>
                  <Text style={{fontWeight: '600',color:Color.BLACK}}>{item.Gender}</Text>
                </TouchableOpacity>
              );
            }}
          /></View>
          ) : null}
          </View>
          <View style={{marginLeft:-75}}>
          <TouchableOpacity
        style={{
          width: '49%',
          height: 45,
          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
          
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          borderColor:Color.GREY,
          backgroundColor:Color.lightblue
        }}
        onPress={() => {
          setClickedC(!clickedC);
        }}>
        <Text style={{fontWeight:'200',color:Color.BLACK}}>
          {BHK == '' ? 'BHK' : BHK}
        </Text>
        {clickedC ? (
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
      {clickedC ? (
        <View
          style={{
            elevation: 5,
            marginTop: 20,
            height: "auto",
            alignSelf: 'center',
            width: '45%',
            backgroundColor: '#fff',
            borderRadius: 10,
            flexDirection:"column"
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
            data={dataC}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '45%',
                    alignSelf: 'center',
                    height: height*0.050,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                    
                  }}
                  onPress={() => {
                    setBHk(item.City);
                    setClicked(!clickedC);
                    // onSearch('');
                    // setSearch('');
                  }}>
                  <Text style={{fontWeight: '600',color:Color.BLACK}}>{item.City}</Text>
                </TouchableOpacity>
              );
            }}
          /></View>
          ) : null}
          </View>
       </View>
       <View style={{width:"100%",height:"auto",marginTop:16,alignItems: 'center',
    }}>
        
       <TouchableOpacity
        style={{
          width: '90%',
          height: height*0.045,
          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
          
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          borderColor:Color.GREY,
          backgroundColor:Color.lightblue
        }}
        onPress={() => {
          setClickedA(!clickedA);
        }}>
        <Text style={{fontWeight:'200',color:Color.BLACK}}>
          {Page == '' ? 'Property Age' : Page}
        </Text>
        {clickedA ? (
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
      {clickedA ? (
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
            data={dataA}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: height*0.050,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setPage(item.Age);
                    setClickedA(!clickedA);
                    // onSearch('');
                    // setSearch('');
                  }}>
                  <Text style={{fontWeight: '600',color:Color.BLACK}}>{item.Age}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}


      </View>
      <View style={{width:"95%",height:"auto",marginTop:16,alignItems:"center",flexDirection:"row",justifyContent:"space-evenly"}}>
      <View style={styles.formItem1}>
        <TextInput
          style={styles.input}
          placeholder="FLoor No"
          placeholderTextColor={Color.BLACK}
          value={Floor}
          onChangeText={setFloor}
          keyboardType="numeric"
          
        />
      </View>
      <View style={styles.formItem1}>
        <TextInput
          style={styles.input}
          placeholder="Total Floor"
          placeholderTextColor={Color.BLACK}
          value={TFloor}
          onChangeText={setTFloor}
          keyboardType="numeric"
        />
      </View>
      </View>

      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,marginTop:15,marginBottom:15

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8,marginBottom:10}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:responsiveFontSize(2),fontWeight:"500"}}>Describe Your Accomodation</Text>
               
           </View>
        

      <View style={{width:"100%",height:"auto",marginTop:20,alignItems: 'center',
    marginBottom:height*0.02}}>
        
        <View style={styles.textAreaContainer}>
        <TextInput
          multiline
          numberOfLines={10}
          style={styles.textArea}
          value={text}
          onChangeText={setText}
          placeholder="Property Description"
          textAlignVertical="top"
          placeholderTextColor={Color.BLACK}
        />
      </View>

      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:responsiveFontSize(2),fontWeight:"500"}}>More Details</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,marginBottom:height*0.020,alignItems: 'center',
    }}>
           <View style={styles.formItem}>
        <TextInput
          style={styles.input}
          placeholder="Built Up Area"
          value={Area}
          onChangeText={setArea}
          keyboardType="numeric"
          placeholderTextColor={Color.BLACK}
        />
      </View>
      
      <View style={styles.formItem}>
        <TextInput
          style={styles.input}
          placeholder="Near University/College"
          value={Near}
          onChangeText={setNear}
          placeholderTextColor={Color.BLACK}
          
        />
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
        //  onPress={()=>navigation.navigate("RentalCondition")}
        onPress={handleSubmit}
         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
         Next, add Rental Conditions  
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
    marginBottom: height*0.020,
  },
  formItem1: {
    width: '45%',
    marginBottom: height*0.020,
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
    fontSize:responsiveFontSize(1.5),
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
    fontSize:responsiveFontSize(1.5),
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
    fontSize: responsiveFontSize(1.25),
    fontWeight: 'bold',
  },
  selectedGender: {
    fontSize: responsiveFontSize(1.25),
  },
  
  selectedOutput: {
    fontSize: responsiveFontSize(1.25),
    marginTop: 20,
  },
  textAreaContainer: {
    width: '90%',
    height: height*0.250,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius:8,
    backgroundColor:Color.lightblue,
    borderColor:Color.GREY,
    
  },
  textArea: {
    flex: 1, // Expand TextInput to fill container vertically,
    color:Color.BLACK
  },
  

  
 
});

export default PropertyDeatils;
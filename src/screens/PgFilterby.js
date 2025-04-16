import React, { useState,useEffect } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList } from "react-native";
import  EvilIcons from "react-native-vector-icons//EvilIcons";
import { useNavigation } from '@react-navigation/native';
import  Entypo  from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Platform } from 'react-native';

import { ScrollView } from "react-native-gesture-handler";
import Color from '../Utils/Colors'
import { useRoute } from "@react-navigation/native";
import { FilterSearchPG } from "../apiservice/OwnerApi";
const { width, height } = Dimensions.get('window');

//select object for Guest
const ForCity = [
  {City: 'Mohali'},
  {City: 'Chandigardh'},
  {City: 'Kharar'},
  
];
function PGFilterby (props)  {

  const route = useRoute();
  const {dataFlat} = route.params || {};;

  useEffect(() => {
    if (dataFlat)  {
      setselectCity(dataFlat.selectCity);
      setSelectType(dataFlat.selectType);
      setsearchText(dataFlat.searchText);
      setSelectedSRoom(dataFlat.selectedRType[0].Single);
      setSelectedDRoom(dataFlat.selectedRType[0].Double);
      setSelectedTRoom(dataFlat.selectedRType[0].Triple);
      setSelectedFRoom(dataFlat.selectedRType[0].Four);
      
      
    }
  }, [dataFlat]);

  const [searchText, setsearchText] = useState('');
//FoodOption
const [FoodOption, setFoodOption] = useState('');

const handleFoodOption = (option) => {
    setFoodOption(option); // Set the selected option
  };
//tentant type
const [selectType, setSelectType] = useState(false);

const handleTenantType = (type) => {
  setSelectType(type);
}
// room type

const [selectedSRoom, setSelectedSRoom] = useState(false);
const [selectedDRoom, setSelectedDRoom] = useState(false);
const [selectedTRoom, setSelectedTRoom] = useState(false);
const [selectedFRoom, setSelectedFRoom] = useState(false);


const handleSRoomType = () => {
  setSelectedSRoom(!selectedSRoom);
};
const handleDRoomType = () => {
  setSelectedDRoom(!selectedDRoom);
};
const handleTRoomType = () => {
  setSelectedTRoom(!selectedTRoom);
};
const handleFRoomType = () => {
  setSelectedFRoom(!selectedFRoom);
};

// all for Guest
const [selectCity, setselectCity] = useState(''); 
const [clickedCity, setClickedCity] = useState(false); // for Guest
const [dataCity, setdataCity] = useState(ForCity);// for Guest
//reset

const resetStates = () => {
  setSelectType(false);
  setSelectedSRoom(false);
  setSelectedDRoom(false);
  setSelectedTRoom(false);
  setSelectedFRoom(false);
  setFoodOption(false);
  
};


    

    const [Hvalue,setHValue]=useState({values: [1000,15000],})
    const multiSliderValuesChangeH = (values) => {
      setHValue({
          values,
      });
}

    const navigation = useNavigation();

    const handlePGSearch = async () => { 
  
      const selectedRType = [];
     if (selectedSRoom ||selectedSRoom || selectedSRoom ||selectedSRoom ) {
      const selectRoom ={
        Single:selectedSRoom,
        Double:selectedDRoom,
        Triple:selectedTRoom,
        Four:selectedFRoom,
        
    
      }
      selectedRType.push(selectRoom);
    }
    let lookingFor = 'PG';
    
    
    console.log(selectedRType); // Ensure `selectedRoom` is defined somewhere in your code
    console.log(lookingFor);
    console.log(Hvalue);
    console.log(selectCity);
    console.log(searchText);
    console.log(selectType);
    
    
      
      try {
        // setLoading(true);
        const response = await FilterSearchPG(lookingFor,selectedRType,Hvalue,selectCity,searchText,selectType,FoodOption);
        console.log(response);
        if (response.status == 201) {
           
           
            const dataP = await response.json();
            const data = dataP.properties; 
            console.log(data);
            console.log("successfull");
           const Search ={
            selectCity
           }
           const dataflat ={
            lookingFor,
            selectedRType,
            Hvalue,
            selectCity,
            searchText,
            selectType
           }
            
           console.log(dataflat);
            
            navigation.navigate('SearchPG',{data,Search,dataflat});
        } else {
          console.log('Unexpected response status code:', response.status);
        }
    } catch (error) {
        console.log(error);
        
    } finally {
        // setLoading(false);
    }
    };
    

    return (
        <>
        <ScrollView style={styles.container}>
        <View style={{
      height: height*0.060,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingHorizontal: 5,
      
      marginBottom:20
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        width: width,
        height: height*0.060,
        paddingBottom:15,
        
        borderColor:Color.GREY,
        borderBottomWidth:1.5,
        
      }}>
        <TouchableOpacity  onPress={() => {
          resetStates();}}>
              <MaterialCommunityIcons
                name="reload"
                color="black"
                size={24}
                style={{marginTop:12,marginLeft:20}}
              />
            </TouchableOpacity>
        <View style={{
          height: height*0.040,
          width: '100%',
          marginTop: 25,
          marginLeft: 15,
          flexDirection:"row"
        }}>
          <View style={{width:"75%",alignItems:"center"}}>
          <Text style={{fontWeight:"500",fontSize:20,color:Color.BLACK}}>Filter by</Text>
          </View>
          <View style={{width:"20%"}}>
          <TouchableOpacity 
           
           >
         
         <Entypo
                name="cross"
                color="black"
                size={24}
                style={{marginVertical:2,}}
                
              />
            </TouchableOpacity>
            </View>
        </View>

        
       
      </View>
    </View>
            <View>
                <View style={{marginLeft:25}}>
                    <Text style={{fontSize:15,fontWeight:600,color:Color.BLACK}}><EvilIcons name="location" size={20} color='black' />  Locality Search</Text>
                </View>
    <View style={{width:"100%",height:"auto",marginTop:8,marginBottom:10,alignItems:"center"
    }}>
        <View style={{flexDirection:"row",width:"90%",}}>
      <View style={{width:"35%"}}>
         
      <TouchableOpacity
        style={{
          width: '100%',
          height: height*0.047,
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
        <Text style={{fontWeight:'200'}}>
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
                  <Text style={{fontWeight: '600'}}>{item.City}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      </View>
      <View style={{width:"65%"}}>
      
      <View style={{}} >
                    <TextInput
                        placeholder="Street, city..."
                        style={{
                            
                            borderRadius: 10,
                            fontSize: 15,
                            backgroundColor:Color.WHITE,
                            borderColor:"#E7E7EA",
                            borderWidth:1,
                            marginLeft:10,
                            paddingLeft:20,
                            height:height*0.047,
                            
                        }}
                        value={searchText}
                        onChangeText={(text) => setsearchText(text)}
                    />
                </View>
      </View>
      </View>
      
     
      </View>
                
            </View>

          

             <View style={{ marginTop: 20 }}>
             <View style={{ marginLeft: 20 }}>
               <Text style={{ fontSize: 20 ,color:Color.BLACK}}>Tenant Type</Text>
             </View>
             <View style={styles.maincontent}>
               <TouchableOpacity
                 onPress={() => handleTenantType('Male')}
                 style={[
                   styles.button,
                   selectType === 'Male' ? styles.clickedButton : styles.unclickedButton
                 ]}
               >
                 <Text style={[styles.buttonText, { color: selectType === 'Male' ? "white" : "black" }]}>Male</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 onPress={() => handleTenantType('Female')}
                 style={[
                   styles.button,
                   selectType === 'Female' ? styles.clickedButton : styles.unclickedButton
                 ]}
               >
                 <Text style={[styles.buttonText, { color: selectType === 'Female' ? "white" : "black" }]}>Female</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 onPress={() => handleTenantType('Anyone')}
                 style={[
                   styles.button,
                   selectType === 'Anyone' ? styles.clickedButton : styles.unclickedButton
                 ]}
               >
                 <Text style={[styles.buttonText, { color: selectType === 'Anyone' ? "white" : "black" }]}>Anyone</Text>
               </TouchableOpacity>
             </View>
           </View>



           <View>
        <View style={{ marginLeft: 20,marginTop:20 }}>
          <Text style={{ fontSize: 20 ,color:Color.BLACK}}>Room Type</Text>
        </View>
        <View style={styles.maincontent}>
          <TouchableOpacity
            onPress={handleSRoomType}
            style={[
              styles.button1,
              selectedSRoom ? styles.clickedButton : styles.unclickedButton
            ]}
          >
            <Text style={[styles.buttonText, { color: selectedSRoom ? "white" : "black" }]}>Single Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDRoomType}
            style={[
              styles.button1,
              selectedDRoom ? styles.clickedButton : styles.unclickedButton
            ]}
          >
            <Text style={[styles.buttonText, { color: selectedDRoom ? "white" : "black" }]}>Double Room</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.maincontent}>
          <TouchableOpacity
            onPress={handleTRoomType}
            style={[
              styles.button1,
              selectedTRoom ? styles.clickedButton : styles.unclickedButton
            ]}
          >
            <Text style={[styles.buttonText, { color: selectedTRoom ? "white" : "black" }]}>Triple Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFRoomType}
            style={[
              styles.button1,
              selectedFRoom  ? styles.clickedButton : styles.unclickedButton
            ]}
          >
            <Text style={[styles.buttonText, { color: selectedFRoom  ? "white" : "black" }]}>Four Room</Text>
          </TouchableOpacity>
        </View>
      </View>
   
  
        
        <View >
        <View style={{flexDirection:'row',alignItems:"flex-start",
justifyContent:"flex-start",marginTop:20}}>
        <Text style={styles.slider_Length}>Price Range :</Text>
        
 <Text style={ styles.mainSlider}>{Hvalue.values[0]} min</Text>
 <Text style={{fontSize:22,color:'black'}}> - </Text>
 <Text style={ styles.mainSlider}>{Hvalue.values[1]} max </Text>
 </View>

            <View style={styles.slider_box}>

                
                <MultiSlider
 values={[Hvalue.values[0],Hvalue.values[1]]}
 sliderLength={300}
 selectedStyle={{backgroundColor:Color.colorRoyalblue_100,}}
 containerStyle={{alignSelf:'center',marginTop:20}}
 onValuesChange={multiSliderValuesChangeH}
 markerStyle={{
   ...Platform.select({
     android: {
       height: 13,
       width: 13,
       borderRadius: 50,
       backgroundColor: Color.colorRoyalblue_100
     }
   })
 }}
 min={3000}
 max={15000}
 step={1000}
 />

 </View>
        </View>

        <View style={{ marginTop: 20 }}>
             <View style={{ marginLeft: 20 }}>
               <Text style={{ fontSize: 20 ,color:Color.BLACK}}>Food Available</Text>
             </View>
             <View style={styles.maincontent}>
               <TouchableOpacity
                 onPress={() => handleFoodOption('Yes')}
                 style={[
                   styles.button,
                   FoodOption === 'Yes' ? styles.clickedButton : styles.unclickedButton
                 ]}
               >
                 <Text style={[styles.buttonText, { color: FoodOption === 'Yes' ? "white" : "black" }]}>Yes</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 onPress={() => handleFoodOption('No')}
                 style={[
                   styles.button,
                   FoodOption === 'No' ? styles.clickedButton : styles.unclickedButton
                 ]}
               >
                 <Text style={[styles.buttonText, { color: FoodOption === 'No' ? "white" : "black" }]}>No</Text>
               </TouchableOpacity>
              
             </View>
           </View>
   


           


        </ScrollView>

         <View style={{height:80,width:"100%",backgroundColor:"white"}}>
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
         onPress={()=>navigation.navigate("SearchPG")}
         >    
         <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
          SEARCH
         </Text>
         </TouchableOpacity>
         </View>

         </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    button: {
        width: width*0.26,
        height: height*0.05,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginVertical: 10,
        
        marginLeft:10
        },
        button1: {
          width: width*0.35,
          height: height*0.05,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginVertical: 10,
            
            marginLeft:10
            },
    unclickedButton: {
        backgroundColor: Color.WHITE,
        borderColor:Color.BLACK,
        borderWidth:1,
        
        
    },
    clickedButton: {
        backgroundColor: Color.colorRoyalblue_100,
        borderWidth: 1,
        borderColor: "white",
        
    },
    buttonText: {
        fontWeight: "500",
    },
    slider_Length:{color:'black',
  fontSize:20,
  alignSelf:"flex-start",
  
  marginLeft:20,
  marginRight:15
},

  slider_box:{width:Dimensions.get('window').width-60,
  height:height*0.086,
  marginHorizontal:28,
  backgroundColor:'rgba(255, 255, 255, 0.19)',
  borderRadius:10,
  marginTop:17,
  
},
Text:{color:'black',
fontSize:20,
marginHorizontal:10,
marginTop:10
},
mainSlider:{
    color:'black',fontSize:15,marginTop:5

},
maincontent:{
    flexDirection: "row",marginLeft:20,marginTop:10
}
});

export default PGFilterby;

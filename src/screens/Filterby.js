import React, { useState,useEffect } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList } from "react-native";
import  EvilIcons  from "react-native-vector-icons/EvilIcons";
import { useNavigation } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Platform } from 'react-native';

import { ScrollView } from "react-native-gesture-handler";
import Color from '../Utils/Colors'
import { useRoute } from "@react-navigation/native";
import { FilterSearchHouse } from "../apiservice/OwnerApi";
import Colors from "../Utils/Colors";
const {width, height} = Dimensions.get('screen');
//select object for Guest
const ForCity = [
  {City: 'Mohali'},
  {City: 'Chandigardh'},
  {City: 'Kharar'},
  
];

function Filterby(props)  {

  const route = useRoute();
  const {dataflat} = route.params || {};;

  useEffect(() => {
    if (dataflat)  {
      setselectCity(dataflat.selectCity);
      setSelectedOption(dataflat.selectedOption);
      setsearchText(dataflat.searchText);
      setis1BK(dataflat.selectedRoom[0].oneRK);
      setis1BHK(dataflat.selectedRoom[0].oneBHK);
      setis2BHK(dataflat.selectedRoom[0].twoBHK);
      setis3BHK(dataflat.selectedRoom[0].threeBHK);
      setis4BHK(dataflat.selectedRoom[0].fourBHK);
      setis4(dataflat.selectedRoom[0].moreBHK);
      
    }
  }, [dataflat]);
  const [searchText, setsearchText] = useState('');
    const [isFullHouse, setisFullHouse] = useState(false);
    const [isHostel, setisHostel] = useState(false);
    const [is1BK, setis1BK] = useState(false);
    const [is1BHK, setis1BHK] = useState(false);
    const [is2BHK, setis2BHK] = useState(false);
    const [is3BHK, setis3BHK] = useState(false);
    const [is4BHK, setis4BHK] = useState(false);
    const [is4, setis4] = useState(false);


    // all for Guest
    const [selectCity, setselectCity] = useState(''); 
    const [clickedCity, setClickedCity] = useState(false); // for Guest
    const [dataCity, setdataCity] = useState(ForCity);// for Guest


    const [CategoryOption, setCategoryOption] = useState('');
    const handleCategoryClick = (option) => {
        setCategoryOption(option); // Set the selected option
      };

      

      const [PreferedOption, setPreferedOption] = useState('');
      const handlePreferedClick = (option) => {
          setPreferedOption(option); // Set the selected option
        };

        const [ParkingOption, setParkingOption] = useState('');
        const handleParkingClick = (option) => {
            setParkingOption(option); // Set the selected option
          };

    //availability
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
        setSelectedOption(option); // Set the selected option
      };

    const handleFirstButtonClick = () => {
        setisFullHouse(!isFullHouse);
    };

    const handleSecondButtonClick = () => {
        setisHostel(!isHostel);
    };
    const handle1BK = () => {
        setis1BK(!is1BK);
    };
    const handle1BHK = () => {
        setis1BHK(!is1BHK);
    };
    const handle2BHK = () => {
        setis2BHK(!is2BHK);
    };
    const handle3BHK = () => {
        setis3BHK(!is3BHK);
    };
    const handle4BHK = () => {
        setis4BHK(!is4BHK);
    };
    const handle4 = () => {
        setis4(!is4);
    };

    const resetStates = () => {
      setisFullHouse(false);
      setisHostel(false);
      setis1BK(false);
      setis1BHK(false);
      setis2BHK(false);
      setis3BHK(false);
      setis4BHK(false);
      setis4(false);
      setSelectedOption(false);
      setParkingOption(false);
      setPreferedOption(false);
      setCategoryOption(false);
    };

    const [value,setValue]=useState({values: [1000,40000],})
  const multiSliderValuesChange = (values) => {
    setValue({
        values,
    });
}

const handleHouseSearch = async () => { 
  
  const selectedRoom = [];
 if (is1BHK ||is2BHK || is3BHK ||is4  || is4BHK  || is1BK) {
  const selectFlat ={
    oneRK:is1BK,
    oneBHK:is1BHK,
    twoBHK:is2BHK,
    threeBHK:is3BHK,
    fourBHK:is4BHK,
    moreBHK:is4

  }
  selectedRoom.push(selectFlat);
}
let lookingFor = 'Flat';


console.log(selectedRoom); // Ensure `selectedRoom` is defined somewhere in your code
console.log(lookingFor);
console.log(value);
console.log(selectCity);
console.log(searchText);
console.log(selectedOption);
  
  try {
    // setLoading(true);
    const response = await FilterSearchHouse(lookingFor,selectedRoom,value,selectCity,searchText,selectedOption,CategoryOption,PreferedOption,ParkingOption);
    console.log(response);
    if (response.status == 201) {
       
       
        
      const data = await response.json();
     
      console.log(data);
        console.log("successfull");
        const SearchL ={
          selectCity
         }
         const dataflat ={
          lookingFor,
          selectedRoom,
          value,
          selectCity,
          searchText,
          selectedOption
         }
          
         console.log(SearchL.selectCity);
        navigation.navigate('Search',{data,SearchL,dataflat});
        console.log(dataflat);
    } else {
      console.log('Unexpected response status code:', response.status);
    }
} catch (error) {
    console.log(error);
    
} finally {
    // setLoading(false);
}
};


    const navigation = useNavigation();

    return (
        <>
        <ScrollView style={styles.container}>
        <View style={{
      height: 50,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingHorizontal: 5,
      
      marginBottom:10
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        width: "100%",
        height: 50,
        paddingBottom:15,
        
        borderColor:Color.GREY,
        borderBottomWidth:1.5,
        
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="arrow-left"
                color="black"
                size={24}
                style={{marginTop:12,marginLeft:20}}
              />
            </TouchableOpacity>
        <View style={{
          height:40,
          width: '100%',
          marginTop: 25,
          marginLeft: 15,
          flexDirection:"row"
        }}>
          <View style={{width:"60%"}}>
          <Text style={{fontWeight:"500",fontSize:20,marginLeft:15}}>Filter</Text>
          </View>
          <View style={{width:"30%"}}>
          <TouchableOpacity 
           onPress={() => {
            resetStates();}}>
           
         
        <Text style={{fontWeight:"500",fontSize:12,marginLeft:15,marginTop:8}}>clear all</Text>
            </TouchableOpacity>
            </View>
        </View>

        
       
      </View>
    </View>
            <View>
                <View style={{marginTop:5,marginLeft:25}}>
                    <Text style={{fontSize:15,fontWeight:600,color:Color.BLACK}}><EvilIcons name="location" size={20} color='black' />  Locality Search</Text>
                </View>
                <View style={{width:"100%",height:"auto",marginTop:8,marginBottom:10,alignItems:"center"
    }}>
        <View style={{flexDirection:"row",width:"90%",}}>
        <View style={{width:"35%"}}>
         
         <TouchableOpacity
           style={{
             width: '100%',
             height: 45,
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
           <Text style={{fontWeight:'200',color:Colors.BLACK}}>
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
                     <Text style={{fontWeight: '600',color:Colors.BLACK}}>{item.City}</Text>
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
                        placeholderTextColor={Colors.BLACK}
                        style={{
                            
                            borderRadius: 10,
                            fontSize: 15,
                            backgroundColor:Color.WHITE,
                            borderColor:"#E7E7EA",
                            borderWidth:1,
                            marginLeft:10,
                            paddingLeft:20,
                            height:45,
                            color:Colors.BLACK
                            
                        }}
                        value={searchText}
                        onChangeText={(text) => setsearchText(text)}
                    />
                </View>
      </View>
      </View>
      
     
      </View>
            </View>

            <View style={{marginTop:20}}> 
                <View style={{marginLeft:20}}>
                    <Text style={{fontSize:20,color:Colors.BLACK}}>Category</Text>
                </View>
                <View style={styles.maincontent}>
                    <TouchableOpacity
                        onPress={() => handleCategoryClick('Apartment')}
                        style={[
                            styles.button2,
                            CategoryOption === 'Apartment' ? styles.clickedButton : styles.unclickedButton
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: CategoryOption === 'Apartment' ? "white" : "black" }]}>Apartment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleCategoryClick('Gated community Villa')}
                        style={[
                            styles.button2,
                            CategoryOption === 'Gated community Villa' ? styles.clickedButton : styles.unclickedButton
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: CategoryOption === 'Gated community Villa' ? "white" : "black" }]}>Gated Community Villa</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.maincontent}>
                    <TouchableOpacity
                        onPress={() => handleCategoryClick('Independent')}
                        style={[
                            styles.button2,
                            CategoryOption === 'Independent' ? styles.clickedButton : styles.unclickedButton
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: CategoryOption === 'Independent' ? "white" : "black" }]}>Indeppendent House</Text>
                    </TouchableOpacity>
                   
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{marginLeft:20}}>
                    <Text style={{fontSize:20,color:Colors.BLACK}}>Looking For</Text>
                </View>
                <View style={styles.maincontent}>
                    <TouchableOpacity
                        onPress={handle1BK}
                        style={[
                            styles.button,
                            is1BK ? styles.clickedButton : styles.unclickedButton
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: is1BK ? "white" : "black" }]}>1RK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handle1BHK}
                        style={[
                            styles.button,
                            is1BHK ? styles.clickedButton : styles.unclickedButton
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: is1BHK ? "white" : "black" }]}>1BHK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handle2BHK}
                        style={[
                            styles.button,
                            is2BHK ? styles.clickedButton : styles.unclickedButton
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: is2BHK ? "white" : "black" }]}>2BHK</Text>
                    </TouchableOpacity>
                </View >
                <View style={styles.maincontent}>
                    <TouchableOpacity
                        onPress={handle3BHK}
                        style={[
                            styles.button,
                            is3BHK ? styles.clickedButton : styles.unclickedButton
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: is3BHK ? "white" : "black" }]}>3BHK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handle4BHK}
                        style={[
                            styles.button,
                            is4BHK ? styles.clickedButton : styles.unclickedButton
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: is4BHK ? "white" : "black" }]}>4BKH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handle4}
                        style={[
                            styles.button,
                            is4 ? styles.clickedButton : styles.unclickedButton
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: is4 ? "white" : "black" }]}>4+BHK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        

            <View >
            <View style={{flexDirection:'row',alignItems:"flex-start",
justifyContent:"flex-start",marginTop:20}}>
            <Text style={styles.slider_Length}>Price Range :</Text>
            
     <Text style={ styles.mainSlider}>{value.values[0]} min</Text>
     <Text style={{fontSize:22,color:'black'}}> - </Text>
     <Text style={ styles.mainSlider}>{value.values[1]} max </Text>
     </View>

                <View style={styles.slider_box}>
 
                    
                    <MultiSlider
     values={[value.values[0],value.values[1]]}
     sliderLength={300}
     selectedStyle={{backgroundColor:Color.colorRoyalblue_100,}}
     containerStyle={{alignSelf:'center',marginTop:20}}
     onValuesChange={multiSliderValuesChange}
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
     max={40000}
     step={1000}
     />

     </View>
            </View>
            
    
            <View>
    <View style={{ marginLeft: 20 }}>
      <Text style={{ fontSize: 20,color:Colors.BLACK }}>Availability</Text>
    </View>
    <View style={styles.maincontent}>
      <TouchableOpacity
        onPress={() => handleOptionClick('immediate')}
        style={[
          styles.button1,
          selectedOption === 'immediate' ? styles.clickedButton : styles.unclickedButton
        ]}
      >
        <Text style={[styles.buttonText, { color: selectedOption === 'immediate' ? "white" : "black" }]}>Immediate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOptionClick('15 Days')}
        style={[
          styles.button1,
          selectedOption === '15 Days' ? styles.clickedButton : styles.unclickedButton
        ]}
      >
        <Text style={[styles.buttonText, { color: selectedOption === '15 Days' ? "white" : "black" }]}>Within 15 Days</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.maincontent}>
      <TouchableOpacity
        onPress={() => handleOptionClick('30 Days')}
        style={[
          styles.button1,
          selectedOption === '30 Days' ? styles.clickedButton : styles.unclickedButton
        ]}
      >
        <Text style={[styles.buttonText, { color: selectedOption === '30 Days' ? "white" : "black" }]}>Within 30 Days</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOptionClick('After 30 days')}
        style={[
          styles.button1,
          selectedOption === 'After 30 days' ? styles.clickedButton : styles.unclickedButton
        ]}
      >
        <Text style={[styles.buttonText, { color: selectedOption === 'After 30 days' ? "white" : "black" }]}>After 30 days</Text>
      </TouchableOpacity>
    </View>
  </View>

  <View>
    <View style={{ marginLeft: 20,marginTop:20 }}>
      <Text style={{ fontSize: 20 ,color:Colors.BLACK}}>Prefered Tenants</Text>
    </View>
    <View style={styles.maincontent}>
      <TouchableOpacity
        onPress={() => handlePreferedClick('Male')}
        style={[
          styles.button,
          PreferedOption === 'Male' ? styles.clickedButton : styles.unclickedButton
        ]}
      >
        <Text style={[styles.buttonText, { color: PreferedOption === 'Male' ? "white" : "black" }]}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePreferedClick('Female')}
        style={[
          styles.button,
          PreferedOption === 'Female' ? styles.clickedButton : styles.unclickedButton
        ]}
      >
        <Text style={[styles.buttonText, { color: PreferedOption === 'Female' ? "white" : "black" }]}>Female</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePreferedClick('Anyone')}
        style={[
          styles.button,
          PreferedOption === 'Anyone' ? styles.clickedButton : styles.unclickedButton
        ]}
      >
        <Text style={[styles.buttonText, { color: PreferedOption === 'Anyone' ? "white" : "black" }]}>Anyone</Text>
      </TouchableOpacity>
    </View>
    
  </View>

  <View>
    <View style={{ marginLeft: 20,marginTop:20 }}>
      <Text style={{ fontSize: 20 ,color:Colors.BLACK}}>Parking</Text>
    </View>
    <View style={styles.maincontent}>
      <TouchableOpacity
        onPress={() => handleParkingClick('2 Wheeler')}
        style={[
          styles.button1,
          ParkingOption === '2 Wheeler' ? styles.clickedButton : styles.unclickedButton
        ]}
      >
        <Text style={[styles.buttonText, { color: ParkingOption === '2 Wheeler' ? "white" : "black" }]}>2 Wheeler</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleParkingClick('4 wheeler')}
        style={[
          styles.button1,
          ParkingOption === '4 wheeler' ? styles.clickedButton : styles.unclickedButton
        ]}
      >
        <Text style={[styles.buttonText, { color: ParkingOption === '4 wheeler' ? "white" : "black" }]}>4 Wheeler</Text>
      </TouchableOpacity>
      
    </View>
    
  </View>
  
            
            
           
           


        </ScrollView>
        
        <View style={{height:height*0.08,width:"100%",backgroundColor:"white"}}>
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
         onPress={handleHouseSearch}
         >    
         <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
          Apply Filter
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
        width: width*0.27,
        height: height*0.045,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginVertical: 10,
        
        marginLeft:10
        },
        button1: {
            width: width*0.4,
            height: height*0.045,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginVertical: 10,
            
            marginLeft:10
            },
            button2: {
                width: width*0.4,
                height: height*0.045,
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
  height:86,
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

export default Filterby;

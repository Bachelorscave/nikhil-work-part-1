import React,{useRef, useState } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList, } from "react-native";
    import { RadioButton } from 'react-native-paper'
    import CheckBox from 'react-native-check-box'

import HeaderT from "../components/main/rentalC"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Color from '../Utils/Colors'
import { FontSize } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useRoute } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get("window");

const ForG = [
    {Gender: 'Fully-Furnished'},
    {Gender: 'Semi-Furnished'},
    {Gender: 'Not Furnished'},
   
    
];

const ForC=[
    {type:"NoParking"},
    {type:"2wheeler"},
    {type:"4wheeler"},
]

function RentalCondition(props) {
  const route = useRoute();
  const {FlatDetails} = route.params;
  const{PropertyDeatils} =route.params;

    
        const [Rent, setRent] = useState('');
        const [Maintance, setMaintance] = useState('');
        const [Deposite, setDeposite] = useState('');
       
        
       
        const [Furnished, setFurnished] = useState('');
        const [Parking, setParking] = useState('');
        const [AvailableFor, setAvailableFor] = useState('');

        const [Gender, setGender] = useState(''); 

    

  const [clicked, setClicked] = useState(false); // for gender
  const [clickedC, setClickedC] = useState(false); // fro city
  const [data, setData] = useState(ForG);// for gender
  const [dataC, setDataC] = useState(ForC);// for city

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(moment(date).format("YYYY-MM-DD")); // Format the date as DD-MM-YYYY
    hideDatePicker();
  };
  
    const [isNegotiable, setIsNegotiable] = useState(false);
  
    const handleNegotiableChange = () => {
      setIsNegotiable(!isNegotiable);
    };
  
  // for city search
//   const searchRef = useRef();
//   const onSearch = search => {
//     if (search !== '') {
//       let tempData = dataC.filter(item => {
//         return item.City.toLowerCase().indexOf(search.toLowerCase()) > -1;
//       });
//       setData(tempData);
//     } else {
//       setData(City);
//     }
//   };

      
      
      
        
      
        const HandleRentalC = () => {
          // if (!Rent || !Deposite || !AvailableFor || !Furnished || !Gender ||!Maintance) {
          //   console.log('Error', 'Please fill in all fields');
          //   return;
          // }

          const RentalCondition ={
            Rent,
            Maintance,
            Deposite,
            isNegotiable,
            AvailableFor,
            Furnished,
            selectedDate,
            Parking,
            Gender,
          }

          console.log(FlatDetails);
        //  console.log(PropertyDeatils.AccommodationName);
         console.log(RentalCondition);
           navigation.navigate('Amenities', {FlatDetails,PropertyDeatils,RentalCondition});
      
          
      
     
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
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:20,fontWeight:"500"}}>Rent and Expenses</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           
      <View style={{flexDirection:"row",alignItems:"center",width:"90%"}}>
        
      <View style={styles.formItem1}>
        <TextInput
          style={styles.input}
          placeholder="Expected Rent /Month"
          value={Rent}
          onChangeText={setRent}
          keyboardType="numeric"
          placeholderTextColor={Color.BLACK}
          />
          {/* <MaterialIcons
                name="currency-rupee"
                color="black"
                size={20}
                style={{}}
              /> */}
        
          
      </View>

      <MaterialIcons
                name="add"
                color="black"
                size={responsiveFontSize(2)}
                style={{paddingHorizontal:5,paddingBottom:5}}
              />
      <View style={styles.formItem1}>
        <TextInput
          style={styles.input}
          placeholder="Other Maintance"
          placeholderTextColor={Color.BLACK}
          value={Maintance}
          onChangeText={setMaintance}
          keyboardType="numeric"
        />
      </View>
          
       </View>
       <View style={{width:"98%"}}>
       <CheckBox
       
        rightText="Negotiable"
        isChecked={isNegotiable}
        onClick={handleNegotiableChange}
        // onPress={handleNegotiableChange}
        // rightTextStyle={styles.CheckBoxContainer}
        rightTextStyle={styles.CheckBoxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
       </View>
       
       <View style={{width:"100%",height:"auto",marginTop:16,alignItems: 'center',
    }}>
        <View style={styles.formItem}>
        <TextInput
          style={styles.input}
          placeholder="Expected Deposit"
          value={Deposite}
          onChangeText={setDeposite}
          keyboardType="numeric"
          placeholderTextColor={Color.BLACK}
        />
      </View>
      <View style={{width: "90%", height: "auto", marginTop: 5, alignItems: "flex-start",}}>
        <Text style={{marginBottom:10,fontSize:15,fontWeight:"500",color:Color.BLACK}}>Property available for</Text>
        <RadioButton.Group onValueChange={newValue => setAvailableFor(newValue)} value={AvailableFor}>
        <View style={{flexDirection:"row",width:"90%",marginBottom:8}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:"flex-start",marginRight:30}}>
          <RadioButton value="Rent" />
          <Text style={{color:Color.BLACK}}>Only Rent</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"flex-end",marginLeft:30 }}>
          <RadioButton value="Lease" />
          <Text style={{color:Color.BLACK}}>Only Lease</Text>
        </View>
        </View>
      </RadioButton.Group>
      </View>
       


      </View>

      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,marginTop:15,marginBottom:15,paddingBottom:15

}}>
        
           <View style={{width:"100%",height:45,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8,marginBottom:10}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:16,fontWeight:"500",width:250}}>What is included in your 
accommodation ?</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
      
        
       <TouchableOpacity
        style={{
          width: '90%',
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
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight:'200',color:Color.BLACK}}>
          {Furnished == '' ? 'Include' : Furnished}
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
            data={data}
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
                    setFurnished(item.Gender);
                    setClicked(!clicked);
                    // onSearch('');
                    // setSearch('');
                  }}>
                  <Text style={{fontWeight: '600',color:Color.BLACK}}>{item.Gender}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}


      </View>

      
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10

}}>
        
           <View style={{width:"90%",height:40,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:18,fontWeight:"500"}}>Available from</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,marginBottom:20,alignItems:"center"
    }}>
      <View style={{alignItems:"center",width:"90%"}}>
           <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Select Date"
          editable={true} // Prevent direct input
          value={selectedDate}
          placeholderTextColor={Color.BLACK}
        />
         <TouchableOpacity onPress={showDatePicker}>
          <Icon name="calendar-outline" size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>
      </View>
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        
        
      />
      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,marginTop:15

}}>
        
           <View style={{width:"90%",height:40,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:20,fontWeight:"500"}}>More Details</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,marginBottom:20,alignItems: 'center',
    }}>
           <TouchableOpacity
        style={{
          width: '90%',
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
          {Parking == '' ? 'Parking' : Parking}
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
            data={dataC}
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
                    setParking(item.type);
                    setClickedC(!clickedC);
                    // onSearch('');
                    // setSearch('');
                  }}>
                  <Text style={{fontWeight: '600',color:Color.BLACK}}>{item.type}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      
      <View style={{width: "90%", height: "auto", marginTop: 10, alignItems: "flex-start",}}>
        <Text style={{marginBottom:10,fontSize:15,fontWeight:"500",color:Color.BLACK}}>Prefered Tentants for</Text>
        <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={Gender}>
        <View style={{flexDirection:"row",width:"90%",marginBottom:8}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,marginRight:15}}>
          <RadioButton value="Anyone" />
          <Text style={{color:Color.BLACK}}>Anyone</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:15 }}>
          <RadioButton value="Male" />
          <Text style={{color:Color.BLACK}}>Only Male</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:15 }}>
          <RadioButton value="Female" />
          <Text style={{color:Color.BLACK}}>Only Female</Text>
        </View>
        </View>
      </RadioButton.Group>
      </View>
      
      

      </View>
    </View>



   
  



   </ScrollView>
    </View>
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
        //  onPress={()=>navigation.navigate("Amenities")}
        onPress={HandleRentalC}
         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
         Next, add amenities 
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
    marginBottom: 2,
    flexDirection:"row",
    flex: 1,
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
    fontSize:12,
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
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
  },
  selectedGender: {
    fontSize: responsiveFontSize(1.5),
  },
  
  selectedOutput: {
    fontSize: 16,
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
    color:Color.BLACK
  },
  textArea: {
    flex: 1, // Expand TextInput to fill container vertically,
    color:Color.BLACK
    
  },
  CheckBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  CheckBoxText: {
    fontSize: responsiveFontSize(1.25),
    color:Color.BLACK
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.GREY,
    backgroundColor:Color.lightblue,
    borderRadius: 5,
    paddingHorizontal: 10,
    color:Color.BLACK
    
  },
  inputdate: {
    flex: 1,
    height: height*0.040,
    color:Color.BLACK
    
  },
  icon: {
    marginLeft: 10,
  },
  

  
 
});

export default RentalCondition;
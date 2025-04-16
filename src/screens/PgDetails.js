import React,{useRef, useState } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList, } from "react-native";
    import { RadioButton } from 'react-native-paper';
    import  CheckBox  from 'react-native-check-box';

import HeaderT from "../components/main/rentalC"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import Entypo from "react-native-vector-icons/Entypo"
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


//select object for Guest
const ForGuest = [
    {Guest: 'Working Profesional'},
    {Guest: 'Student'},
    {Guest: 'Both'}
    
];


function PGdetails(props) {

  const route = useRoute();
  const { pgData } = route.params;
  const { PGRoomDetails } = route.params;
  const {Locality} =route.params;

    
        const [Description, setDescription] = useState('');
        const [University, setUniversity] = useState('');
       
        
        const [selectFood, setselectFood] = useState('');
        const [textInputVisible, setTextInputVisible] = useState(false);
        const [Duration, setDuration] = useState('');
        const [AvailableFor, setAvailableFor] = useState('');

// all for Guest
 const [selectGuest, setselectGuest] = useState(''); 
 const [clickedGuest, setClickedGuest] = useState(false); // for Guest
 const [dataGuest, setdataGuest] = useState(ForGuest);// for Guest



  //Date picker handle and dataGuest
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateVisible, setDateVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [EndDate, setEndDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePickerEnd = () => {
    setDateVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePickerEnd = () => {
    setDateVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(moment(date).format("YYYY-MM-DD")); // Format the date as DD-MM-YYYY
    hideDatePicker();
  };
  
  const handleConfirmEnd = (date) => {
    console.warn("A date has been picked: ", date);
    setEndDate(moment(date).format("YYYY-MM-DD")); // Format the date as DD-MM-YYYY
    hideDatePickerEnd();
  };

  //time function
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
 
  const handleTimeConfirm = (time) => {
        console.warn("A time has been picked: ", time);
        // Format the time as per your requirements, for example: HH:mm
        setSelectedTime(moment(time).format("HH:mm"));
        hideTimePicker();
      };
      
  const [isBreakfast, SetisBreakfast] = useState(false);
  
    const handleBreakfast = () => {
      SetisBreakfast(!isBreakfast);
    };

    const [isLunch, SetisLunch] = useState(false);
  
    const handleLunch = () => {
      SetisLunch(!isLunch);
    };

    const [isDinner, SetisDinner] = useState(false);
  
    const handleDinner = () => {
      SetisDinner(!isDinner);
    };

  const [isSmoking, SetisSmoking] = useState(false);
  
    const handleSmoking = () => {
      SetisSmoking(!isSmoking);
    };
 const [isGuardian, SetisGuardian] = useState(false);
  
 const handleGuardian = () => {
      SetisGuardian(!isGuardian);
    };
 const [isNonVeg, SetisNonVeg] = useState(false);
  
 const handleNonVeg = () => {
      SetisNonVeg(!isNonVeg);
    };
 const [isDrink, SetisDrink] = useState(false);
  
 const handleDrink = () => {
         SetisDrink(!isDrink);
       };
 const [isGirlEntry, SetisGirlEntry] = useState(false);
  
 const handleGirlEntry = () => {
            SetisGirlEntry(!isGirlEntry);
          };
 const [isBoysEntry, SetisBoysEntry] = useState(false);
  
 const handleBoysEntry = () => {
        SetisBoysEntry(!isBoysEntry);
                   };

 
  
  const handleFoodSelection = (value) => {
    setselectFood(value);
    // If 'Yes' is selected, show the TextInput, otherwise hide it
    setTextInputVisible(value === 'Yes');
  };

  const handleRentalConditions = () => { 
    // const FoodDatabase = [];
    let Breakfast
    let Lunch 
    let Dinner 
    let NoSmoking 
    let NoGuardianStay 
    let NoNonVeg 
   
    let  NoDrink 
    let  NoGirlsEntry 
    let NoBoysEntry 
    let FoodAvaliable
    if (!selectGuest || !selectedTime) {
      Alert.alert('Error', 'Please fill the Prefered Guest and selected Time ');
      return;
    }
    if (textInputVisible ==='Yes') {
      FoodAvaliable = textInputVisible,
      Breakfast = isBreakfast,
        Lunch =isLunch,
        Dinner = isDinner
     }else{
      FoodAvaliable = textInputVisible
     }
  
  
    NoSmoking = isSmoking,
    NoGuardianStay = isGuardian,
    NoNonVeg = isNonVeg,
    NoDrink = isDrink,
    NoGirlsEntry = isGirlEntry,
    NoBoysEntry = isBoysEntry
   
  

  const PGdetails ={
    Guest:selectGuest,
    GateTime:selectedTime,
    University:University,
    PlaceFor:AvailableFor,
    FoodAvaliable,
    Breakfast,
    Lunch,
    Dinner,
    NoSmoking,
    NoGuardianStay,
    NoNonVeg,
    
    NoDrink,
    NoGirlsEntry,
    NoBoysEntry,
    PGDescription:Description,
    StartDate:selectedDate,
    EndDate:EndDate,
    Duration:Duration
  }
  // console.log(PGdetails);
  // console.log(PGdetails.Dinner);
  // console.log(PGdetails.NoSmoking);
  // console.log(PGdetails.Guest);
  navigation.navigate('PGAmenities', { pgData ,PGRoomDetails,Locality,PGdetails});
}
 
      
        
      
       

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
        
           <View style={{width:"90%",height:height*0.042,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:responsiveFontSize(2),fontWeight:"500"}}>Provide details about your place</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           
           <View style={{width:"100%",height:"auto",marginTop:8,marginBottom:10,alignItems:"center"
    }}>
        <View style={{flexDirection:"row",width:"90%",}}>
      <View style={{width:"50%"}}>
         
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
          backgroundColor:Color.lightblue
        }}
        onPress={() => {
          setClickedGuest(!clickedGuest);
        }}>
        <Text style={{fontWeight:'200',color:Color.BLACK}}>
          {selectGuest == '' ? 'Prefered Guest' : selectGuest}
        </Text>
        {clickedGuest ? (
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
      {clickedGuest ? (
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
            data={dataGuest}
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
                    setselectGuest(item.Guest);
                    setClickedGuest(!clickedGuest);
                    // onSearch('');
                    // setSearch('');
                  }}>
                  <Text style={{fontWeight: '600',color:Color.BLACK}}>{item.Guest}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      </View>
      <View style={{width:"50%"}}>
      
      <View style={[styles.inputContainer,{marginLeft:15}]}>
        <TextInput
          style={styles.inputdate}
          placeholder="Gate closing Time"
          editable={true} // Prevent direct input
          value={selectedTime}
          placeholderTextColor={Color.BLACK}
        />
         <TouchableOpacity onPress={showTimePicker}>
          <MaterialCommunityIcons name="clock-outline" size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>
      </View>
      </View>
      
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        
        
      />
      </View>
     
       
       
       <View style={{width:"100%",height:"auto",marginTop:16,alignItems: 'center',
    }}>
        
      <View style={styles.formItem}>
        <TextInput
          style={styles.input}
          placeholder="Near University/College"
          value={University}
          placeholderTextColor={Color.BLACK}
          onChangeText={setUniversity}
        />
      </View>
      <View style={{width: "90%", height: "auto", marginTop: 5, alignItems: "flex-start",}}>
        <Text style={{marginBottom:10,fontSize:15,fontWeight:"500",color:Color.BLACK}}>Place is available for</Text>
        <RadioButton.Group onValueChange={newValue => setAvailableFor(newValue)} value={AvailableFor}>
        <View style={{flexDirection:"row",width:"90%",marginBottom:8}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:"flex-start",marginRight:30}}>
          <RadioButton value="Anyone" />
          <Text style={{color:Color.BLACK}}>Anyone</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"flex-end",marginLeft:30 }}>
          <RadioButton value="Male" />
          <Text style={{color:Color.BLACK}}>Male</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"flex-end",marginLeft:30 }}>
          <RadioButton value="Female" />
          <Text style={{color:Color.BLACK}}>Female</Text>
        </View>
        </View>
      </RadioButton.Group>
      </View>
       


      </View>

      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,marginTop:2,marginBottom:15,paddingBottom:15

}}>
        
           <View style={{width:"100%",height:45,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8,marginBottom:10}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:responsiveFontSize(1.8),fontWeight:"500",width:250}}>Food Included</Text>
           <View style={{marginLeft:20,marginTop:10}}>
               <RadioButton.Group onValueChange={newValue => handleFoodSelection(newValue)} value={selectFood}>
        <View style={{flexDirection:"row",width:"90%",marginBottom:8}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:"flex-start",marginRight:30}}>
          <RadioButton value="Yes" />
          <Text style={{color:Color.BLACK}}>Yes</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"flex-end",marginLeft:30 }}>
          <RadioButton value="No" />
          <Text style={{color:Color.BLACK}}>No</Text>
        </View>
        
        </View>
      </RadioButton.Group>
      </View>
      </View>
      
       {/* Conditional rendering for TextInput based on RadioButton selection */}
       {textInputVisible && (
        <View style={{ width: '100%', height: 'auto', marginTop: 25, alignItems: 'center' }}>
         <View style={{flexDirection:"row",marginHorizontal:15,width:"90%",alignItems:"center",marginTop:10}}>
         
         <View style={{width:"30%",flexDirection:"row",height:55}}>
          <CheckBox
           
           isChecked={isBreakfast}
           onPress={handleBreakfast}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK,marginLeft:4}}>Breakfast</Text>
          </View>
   
          <View style={{width:"30%",flexDirection:"row",height:55}}>
          <CheckBox
           
           isChecked={isLunch}
           onPress={handleLunch}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK,marginLeft:4}}>Lunch</Text>
          </View>
          <View style={{width:"30%",flexDirection:"row",height:55}}>
          <CheckBox
           
           isChecked={isDinner}
           onPress={handleDinner}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
      
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK,marginLeft:4}}>Dinner</Text>
          </View>
   
         </View>
        </View>
      )}
     
     

      
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10

}}>
        
           <View style={{width:"90%",height:height*0.042,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:18,fontWeight:"500"}}>PG/Hostel Rules</Text>
               
           </View>
    
         <View style={{flexDirection:"row",marginHorizontal:15,width:"90%",alignItems:"center",marginTop:10}}>
            
         <View style={{width:"40%",flexDirection:"row",height:50}}>
          <CheckBox
           
           isChecked={isSmoking}
           onPress={handleSmoking}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialCommunityIcons name="smoking-off" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK, marginLeft:5,marginTop:2}}>No Smoking</Text>
          </View>
   
          <View style={{width:"40%",flexDirection:"row",height:50,marginLeft:37}}>
          <CheckBox
           
           isChecked={isGuardian}
           onClick={handleGuardian}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialCommunityIcons name="human-male-child" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,marginTop:2,fontWeight:200,color:Color.BLACK, marginLeft:5}}>No Guardian stay</Text>
          </View>
          
   
         </View>
         <View style={{flexDirection:"row",marginHorizontal:15,width:"90%",alignItems:"center",marginTop:10}}>
            
         <View style={{width:"40%",flexDirection:"row",height:50}}>
          <CheckBox
           
           isChecked={isNonVeg}
           onClick={handleNonVeg}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialCommunityIcons name="food-steak-off" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK, marginLeft:5,marginTop:2}}>No Non-Veg</Text>
          </View>
   
          <View style={{width:"40%",flexDirection:"row",height:50,marginLeft:37}}>
          <CheckBox
           
           isChecked={isDrink}
           onClick={handleDrink}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <Entypo name="drink" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,marginTop:2,fontWeight:200,color:Color.BLACK, marginLeft:5}}>No Drink</Text>
          </View>
          
   
         </View>
         <View style={{flexDirection:"row",marginHorizontal:15,width:"90%",alignItems:"center",marginTop:10}}>
            
         <View style={{width:"40%",flexDirection:"row",height:50}}>
          <CheckBox
           
           isChecked={isGirlEntry}
           onClick={handleGirlEntry}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialIcons name="girl" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK, marginLeft:5,marginTop:2}}>No girls Entry</Text>
          </View>
   
          <View style={{width:"40%",flexDirection:"row",height:50,marginLeft:37}}>
          <CheckBox
           
           isChecked={isBoysEntry}
           onClick={handleBoysEntry}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialIcons name="boy" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,marginTop:2,fontWeight:200,color:Color.BLACK, marginLeft:5}}>No Boys Entry</Text>
          </View>
          
   
         </View>

         <View style={{width:"100%",height:"auto",marginTop:20,alignItems: 'center',
    marginBottom:20}}>
        
        <View style={styles.textAreaContainer}>
        <TextInput
          multiline
          numberOfLines={3}
          style={styles.textArea}
          value={Description}
          onChangeText={setDescription}
          placeholder="Property Description"
          textAlignVertical="top"
          placeholderTextColor={Color.BLACK}
        />
      </View>

      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,marginTop:2

}}>
        
           <View style={{width:"90%",height:height*0.042,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:responsiveFontSize(2),fontWeight:"500"}}>Availability</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,marginBottom:20,alignItems: 'center',borderBottomWidth:1,borderBottomColor:Color.GREY
    }}>
          
          <View style={{width:"100%",height:"auto",marginTop:8,marginBottom:20,alignItems:"center"
    }}>
        <View style={{flexDirection:"row",width:"90%",}}>
      <View style={{width:"45%"}}>
         <View style={{marginVertical:5}}><Text style={{fontSize:12,color:Color.colorRoyalblue_100}}>Starting from</Text></View>
           <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Starting Date"
          editable={true} // Prevent direct input
          value={selectedDate}
          placeholderTextColor={Color.BLACK}
        />
         <TouchableOpacity onPress={showDatePicker}>
          <Icon name="calendar-outline" size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        
        
      />
      </View>
      </View>
      <View style={{width:"45%"}}>
      <View style={{marginVertical:5}}><Text style={{fontSize:12,color:Color.colorRoyalblue_100,marginLeft:15,
      
      }}>End Date</Text></View>
      <View style={[styles.inputContainer,{marginLeft:15}]}>
        <TextInput
          style={styles.inputdate}
          placeholder="End Date"
          editable={true} // Prevent direct input
          value={EndDate}
          placeholderTextColor={Color.BLACK}
        />
         <TouchableOpacity onPress={showDatePickerEnd}>
          <Icon name="calendar-outline" size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>
      </View>
      </View>
      
      <DateTimePickerModal
        isVisible={isDateVisible}
        mode="date"
        onConfirm={handleConfirmEnd}
        onCancel={hideDatePickerEnd}
        
        
      />
      </View>
     


      
      

      </View>

      <View style={{width:"100%",height:"auto",marginTop:5,alignItems: 'center',
    }}>
        
      <View style={styles.formItem}>
        <TextInput
          style={styles.input}
          placeholder="Duration"
          value={Duration}
          onChangeText={setDuration}
          keyboardType="numeric"
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
        //  onPress={()=>navigation.navigate("PGAmenities")}
         onPress={handleRentalConditions}
         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize:responsiveFontSize(1.8), alignItems: 'center',textAlign:"center" }}>
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
    marginBottom: 20,
  },
  formItem1: {
    width: '100%',
    marginBottom: 2,
    flexDirection:"row",
    flex: 1,
    marginLeft:10
  },
  skyscrapersIcon: {
    left:10,
    height: 37,
    width: 30,
    top: 20,
    
  },
  input: {
    height: 42,
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

  icon1: {
    marginLeft: 5,
    marginTop:2
  },
  
  inputP: {
    height: 42,
    
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
    width: 200,
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedGender: {
    fontSize: 16,
  },
  
  selectedOutput: {
    fontSize: 16,
    marginTop: 20,
  },
  textAreaContainer: {
    width: '90%',
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius:8,
    backgroundColor:Color.lightblue,
    borderColor:Color.GREY
    ,color:Color.BLACK
  },
  textArea: {
    flex: 1, // Expand TextInput to fill container vertically,
    color:Color.BLACK
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 14,
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
    height: 40,
    color:Color.BLACK
  },
  icon: {
    marginLeft: 10,
  },
  

  
 
});

export default PGdetails;
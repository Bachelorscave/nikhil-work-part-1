import React,{useRef, useState } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList, } from "react-native";
    import { RadioButton } from 'react-native-paper';
    import moment from "moment";
import HeaderT from "../components/main/SchedulerH"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useNavigation } from '@react-navigation/native';
import { Header } from "@react-navigation/stack";
import Color from '../Utils/Colors'
import { FontSize } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from '@react-navigation/native';
import {AddFlat} from '../apiservice/OwnerApi';
import { responsiveFontSize } from "react-native-responsive-dimensions";
const { width, height } = Dimensions.get("window");



function SchedulerS(props) {
  const route = useRoute();
  const {FlatDetails} = route.params;
  const{PropertyDeatils} =route.params;
  const{RentalCondition} =route.params;
  const {ammenities} =route.params;
  const{Loaclity} =route.params;
  const{Fphotos} =route.params;


    
    
        const [selectedButton, setSelectedButton] = useState(null);
        const [loading,setLoading]=useState(false);
      
        const handleButtonPress = (button) => {
          setSelectedButton(button);
        };
         //time function
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [StartTime,setStartTime] = useState('');

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const [isTimePickerVisible1, setTimePickerVisibility1] = useState(false);
  const [EndTime,setEndTime] = useState('');

  const showEndTimePicker = () => {
    setTimePickerVisibility1(true);
  };
  const hideEndTimePicker = () => {
    setTimePickerVisibility1(false);
  };
  const handleTimeConfirm = (time) => {
    console.warn("A time has been picked: ", time);
  
    // If `time` is a string, provide the format to `moment`
    const timeFormat = 'HH:mm'; // Adjust according to the actual format of your input
    const formattedTime = moment(time, timeFormat).format("HH:mm");
  
    console.log("Formatted Time: ", formattedTime);
  
    setStartTime(formattedTime);
    hideTimePicker();
  };
  
      const handleEndTimeConfirm = (time) => {
        console.warn("A time has been picked: ", time);
        // Format the time as per your requirements, for example: HH:mm
        setEndTime(moment(time).format("HH:mm"));
        hideEndTimePicker();
      };

      const handleFinish = async () => { 
        const schedule ={
          day:selectedButton,
          startTime:StartTime,
          endTime:EndTime
        }
       
        console.log(schedule.startTime);
        

        try {
          setLoading(true);
          const response = await AddFlat(FlatDetails,PropertyDeatils,RentalCondition,ammenities,Loaclity,Fphotos,schedule);
          console.log(response);
          if (response.statusCode == 201) {
             
              navigation.navigate('HomeStack1');
              console.log("successfull");
          } else {
            console.log(error);
          }
      } catch (error) {
          console.log(error);
          
      } finally {
          setLoading(false);
      }
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
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:16,fontWeight:"500"}}>Availability</Text>
               
           </View>

           <View style={{flexDirection:"row",justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,}}>
              <TouchableOpacity
        style={[styles.button, selectedButton === 'Everyday' ? styles.selectedButton : null]}
        onPress={() => handleButtonPress('Everyday')}>
        <View style={{alignItems:"center"}}>
        <EvilIcons
                name="calendar"
                color="black"
                size={24}
                
              />
        <Text style={styles.buttonText}>EveryDay</Text>
        <Text style={{color:Color.BLACK}}>Mon-Sun</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedButton === 'Weekdays' ? styles.selectedButton : null]}
        onPress={() => handleButtonPress('Weekdays')}>
        <View style={{alignItems:"center"}}>
        <EvilIcons
                name="calendar"
                color="black"
                size={24}
                
              />
        <Text style={styles.buttonText}>Weekday</Text>
        <Text style={{color:Color.BLACK}}>Mon-Fri</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedButton === 'Weekends' ? styles.selectedButton : null]}
        onPress={() => handleButtonPress('Weekends')}>
         <View style={{alignItems:"center"}}>
        <EvilIcons
                name="calendar"
                color="black"
                size={24}
                
              />
        <Text style={styles.buttonText}>Weekend</Text>
        <Text style={{color:Color.BLACK}}>Sat-Sun</Text>
        </View>
      </TouchableOpacity>

      
           </View>
           <Text style ={{marginTop:10,marginHorizontal:10,marginVertical:10,fontSize:14,fontWeight:500}}>Select time schedule</Text>
           <View style={{flexDirection:"row", width:"90%"}}>
           <View style={{width:"50%"}}>
      
      <View style={[styles.inputContainer,{marginLeft:15}]}>
        <TextInput
          style={styles.inputdate}
          placeholder="Start Time"
          editable={false} // Prevent direct input
          value={StartTime}
          placeholderTextColor={Color.BLACK}
        />
         <TouchableOpacity onPress={showTimePicker}>
          <MaterialCommunityIcons name="clock-outline" size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
        <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        
      />
      </View>
      
      </View>
      <View style={{width:"50%"}}>
      
      <View style={[styles.inputContainer,{marginLeft:15}]}>
        <TextInput
          style={styles.inputdate}
          placeholder="End Time"
          editable={true} // Prevent direct input
          value={EndTime}
          placeholderTextColor={Color.BLACK}
        />
         <TouchableOpacity onPress={showEndTimePicker}>
          <MaterialCommunityIcons name="clock-outline" size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
        <DateTimePickerModal
        isVisible={isTimePickerVisible1}
        mode="time"
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
        
        
      />
      </View>
      
      </View>
     
      
      
      {/* <View style={{width:"50%"}}>
      
      <View style={[styles.inputContainer,{marginLeft:15}]}>
        <TextInput
          style={styles.inputdate}
          placeholder="Gate closing Time"
          editable={true} // Prevent direct input
          value={selectedTime}
        />
         <TouchableOpacity onPress={showTimePicker}>
          <MaterialCommunityIcons name="clock-outline" size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>
      </View> */}



           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,
    }}>
           

      <View style={{height:height*0.100,width:"95%",alignItems:"center", backgroundColor:Color.midblue,borderRadius:5,marginVertical:15,marginHorizontal:10,marginTop:"35%"}}>

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
        //  onPress={()=>navigation.navigate("PhotoS")}
        onPress={handleFinish}
         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
         Finish Posting
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
    fontSize:15
  },
  inputP: {
    height: height*0.042,
    
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius:8,
    borderColor:Color.GREY,
    backgroundColor:Color.lightblue,
    fontSize:15
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.GREY,
    height:90
  },
  buttonText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '400',
    color:Color.BLACK
  },
  selectedButton: {
    backgroundColor: Color.colorRoyalblue_100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.GREY,
    backgroundColor:Color.lightblue,
    borderRadius: 5,
    paddingHorizontal: 10,
    
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

export default SchedulerS;
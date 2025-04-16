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
import { useRoute } from "@react-navigation/native";


const { width, height } = Dimensions.get("window");


//select object for Guest
const ForGuest = [
    {Gender: '2wheeler'},
    {Gender: '4wheeler'},
    {Gender: 'NoParking'},
];

const ForC=[
    {City:"Kharar"},
    {City:"Chandigarh"},
    {City:"Mohali"},
]

function PGAmenities(props) {
  const route = useRoute();
  const { pgData } = route.params;
  const { PGRoomDetails} = route.params;
  const {Locality} =route.params;
  const {PGdetails} =route.params;



    
        const [text, setText] = useState('');

        const [Laundry, setLaundry] = useState('');
        const [RService, setRService] = useState('');
        const [WardenF, setWardenF] = useState('');

// all for Guest
 const [selectGuest, setselectGuest] = useState(''); 
 const [clickedGuest, setClickedGuest] = useState(false); // for Guest
 const [dataGuest, setdataGuest] = useState(ForGuest);// for Guest





// available ammenities
  const [isTvCommon, SetisTvCommon] = useState(false);
  
    const handleTvCommon = () => {
      SetisTvCommon(!isTvCommon);
    };

    const [isCooking, SetisCooking] = useState(false);
  
    const handleCooking = () => {
      SetisCooking(!isCooking);
    };

    const [isRefrigerator, SetisRefrigerator] = useState(false);
  
    const handleRefrigerator = () => {
      SetisRefrigerator(!isRefrigerator);
    };

  const [isPBackup, SetisPBackup] = useState(false);
  
    const handlePBackup = () => {
      SetisPBackup(!isPBackup);
    };
 const [isWifi, SetisWifi] = useState(false);
  
 const handleWifi = () => {
      SetisWifi(!isWifi);
    };
 const [isMess, SetisMess] = useState(false);
  
 const handleMess= () => {
      SetisMess(!isMess);
    };
 const [isLift, SetisLift] = useState(false);
  
 const handleLift = () => {
         SetisLift(!isLift);
       };

  
  const handleAmmenties =() =>{
    let CommonTv 
    let Cooking 
    let Refregirator 
    let PowerBackup 
    let Mess 
    let Wifi 
    let Lift
    

      CommonTv =isTvCommon,
      Cooking  =isCooking,
      Refregirator = isRefrigerator,
      PowerBackup  =isPBackup,
      Mess =isMess,
      Wifi =isWifi,
      Lift  = isLift
    
  

  const PGAmenities ={
    Laundry:Laundry,
    RoomService:RService,
    Warden:WardenF,
    Parking:selectGuest,
    DTip :text,
    CommonTv,
    Cooking,
      Refregirator,
      PowerBackup,
      Mess,
      Wifi,
      Lift
  }
  console.log(PGAmenities);
  navigation.navigate('PgPhoto', { pgData ,PGRoomDetails,Locality,PGdetails,PGAmenities});

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
        
           <View style={{width:"90%",height:40,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:20,fontWeight:"500"}}>Available Services</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           <View style={{width:"100%",height:"auto",marginTop:16,alignItems: 'center',
    }}>
        
     
      <View style={{width: "90%", height: "auto", marginTop: 5, alignItems: "flex-start",}}>
        <Text style={{marginBottom:10,fontSize:15,fontWeight:"500",color:Color.BLACK}}>Laundry</Text>
        <RadioButton.Group onValueChange={newValue => setLaundry(newValue)} value={Laundry}>
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
      <View style={{width: "90%", height: "auto", marginTop: 5, alignItems: "flex-start",}}>
        <Text style={{marginBottom:10,fontSize:15,fontWeight:"500",color:Color.BLACK}}>Room Service</Text>
        <RadioButton.Group onValueChange={newValue => setRService(newValue)} value={RService}>
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
      <View style={{width: "90%", height: "auto", marginTop: 5, alignItems: "flex-start",}}>
        <Text style={{marginBottom:10,fontSize:15,fontWeight:"500",color:Color.BLACK}}>Warden Facility</Text>
        <RadioButton.Group onValueChange={newValue => setWardenF(newValue)} value={WardenF}>
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
           <View style={{width:"100%",height:"auto",marginTop:8,marginBottom:10,alignItems:"center"
    }}>
        <View style={{width:"90%",}}>
     
         
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
          {selectGuest == '' ? 'Parking' : selectGuest}
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
                    setselectGuest(item.Gender);
                    setClickedGuest(!clickedGuest);
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
     
       
       
       

      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,marginTop:15,marginBottom:15

}}>
        
           <View style={{width:"90%",height:40,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8,marginBottom:10}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:18,fontWeight:"500"}}>Add direction tip for your tenants</Text>
               
           </View>
        

      <View style={{width:"100%",height:"auto",marginTop:20,alignItems: 'center',
    marginBottom:20}}>
        
        <View style={styles.textAreaContainer}>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.textArea}
          value={text}
          onChangeText={setText}
          placeholder="Property Description"
          placeholderTextColor={Color.BLACK}
          textAlignVertical="top"
        />
      </View>

      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10

}}>
        
           <View style={{width:"90%",height:40,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:18,fontWeight:"500"}}>Available Amenities</Text>
               
           </View>
    
         <View style={{flexDirection:"row",marginHorizontal:15,width:"90%",alignItems:"center"}}>
            
         <View style={{width:"40%",flexDirection:"row",height:height*0.050}}>
          <CheckBox
           
           isChecked={isTvCommon}
           onClick={handleTvCommon}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialIcons name="tv" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK, marginLeft:5}}>Common TV</Text>
          </View>
   
          <View style={{width:"40%",flexDirection:"row",height:height*0.050,marginLeft:37}}>
          <CheckBox
           
           isChecked={isCooking}
           onClick={handleCooking}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialCommunityIcons name="chef-hat" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK, marginLeft:5}}>Cooking Allowed</Text>
          </View>
          
   
         </View>
         <View style={{flexDirection:"row",marginHorizontal:15,width:"90%",alignItems:"center"}}>
            
         <View style={{width:"40%",flexDirection:"row",height:height*0.050}}>
          <CheckBox
           
           isChecked={isRefrigerator}
           onClick={handleRefrigerator}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialIcons name="sensor-door" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK, marginLeft:5}}>Refrigerator</Text>
          </View>
   
          <View style={{width:"40%",flexDirection:"row",height:height*0.050,marginLeft:37}}>
          <CheckBox
           
           isChecked={isPBackup}
           onClick={handlePBackup}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialCommunityIcons name="backup-restore" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK, marginLeft:5}}>Power Backup</Text>
          </View>
          
   
         </View>
         <View style={{flexDirection:"row",marginHorizontal:15,width:"90%",alignItems:"center",marginTop:10}}>
            
         <View style={{width:"40%",flexDirection:"row",height:height*0.050}}>
          <CheckBox
           
           isChecked={isMess}
           onClick={handleMess}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialIcons name="food-bank" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK, marginLeft:5,}}>Mess</Text>
          </View>
   
          <View style={{width:"40%",flexDirection:"row",height:height*0.050,marginLeft:37}}>
          <CheckBox
           
           isChecked={isWifi}
           onClick={handleWifi}
           checkedCheckBoxColor={Color.colorRoyalblue_100}
           textStyle={styles.checkboxText}
         />
         <MaterialIcons name="wifi" size={20} color="black" style={[styles.icon1]} />
         <Text style={{fontSize:13,marginTop:15,fontWeight:200,color:Color.BLACK, marginLeft:5}}>Wifi</Text>
          </View>
          
   
         </View>
         <View style={{flexDirection:"row",marginHorizontal:15,width:"90%",alignItems:"center",}}>
            
            <View style={{width:"40%",flexDirection:"row",height:height*0.050}}>
             <CheckBox
              
              isChecked={isLift}
              onClick={handleLift}
              checkedCheckBoxColor={Color.colorRoyalblue_100}
              textStyle={styles.checkboxText}
            />
            <MaterialCommunityIcons name="door-sliding" size={20} color="black" style={[styles.icon1]} />
            <Text style={{fontSize:13,fontWeight:200,color:Color.BLACK, marginLeft:5,}}>Lift</Text>
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
        //  onPress={()=>navigation.navigate("PgPhoto")}
        onPress={handleAmmenties}

         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
         Next, add Photos and Videos
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
    fontSize:12
  },

  icon1: {
    marginLeft: 5,
   
  },
  
  inputP: {
    height: 42,
    
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
    
  },
  icon: {
    marginLeft: 10,
  },
  

  
 
});

export default PGAmenities;
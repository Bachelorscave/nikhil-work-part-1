import React,{useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList, } from "react-native";
    import  CheckBox from "react-native-check-box";
    import { RadioButton } from 'react-native-paper';
    import { useRoute } from '@react-navigation/native';
import HeaderT from "../components/main/GeneralHeader"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import { useNavigation } from '@react-navigation/native';
import { Header } from "@react-navigation/stack";
import Color from '../Utils/Colors'
import { FontSize } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get("window");


function PgRoomDetails() {
  const route = useRoute();
  const { pgData } = route.params;
  const { roomTypes } = pgData;
  const singleRoom = roomTypes.includes('Single');
  const doubleRoom = roomTypes.includes('Double');
  const tripleRoom = roomTypes.includes('Triple');
  const fourRoom = roomTypes.includes('Four');

//four Single Room 
        const [Rent, setRent] = useState('');
        const [Deposite, setDeposite] = useState('');
        

        const [isCloset, SetisCloset] = useState(false);
        const [isTv, SetisTv] = useState(false);
        const [isBedding, SetisBedding] = useState(false);
        const [isGeyser, SetisGeyser] = useState(false);
        const [isAc, SetisAc] = useState(false);
        const [isBathroom, SetisBathroom] = useState(false);
        const [isAttachedB, SetisAttachedB] = useState(false);
        const [isMeal, SetisMeal] = useState(false);
  
   
    const handleCloset = () => SetisCloset(!isCloset);
    const handleTv = () => SetisTv(!isTv);
    const handleBedding = () => SetisBedding(!isBedding);
    const handleGeyser = () => SetisGeyser(!isGeyser);
    const handleAc = () => SetisAc(!isAc);
    const handleBathroom = () => SetisBathroom(!isBathroom);
    const handleAttachedB = () => SetisAttachedB(!isAttachedB);
    const handleMeal = () => SetisMeal(!isMeal);
//four Double Room 
const [RentDR, setRentD] = useState('');
const [DepositeDR, setDepositeD] = useState('');


const [isClosetD, SetisClosetD] = useState(false);
const [isTvD, SetisTvD] = useState(false);
const [isBeddingD, SetisBeddingD] = useState(false);
const [isGeyserD, SetisGeyserD] = useState(false);
const [isAcD, SetisAcD] = useState(false);
const [isBathroomD, SetisBathroomD] = useState(false);
const [isAttachedBD, SetisAttachedBD] = useState(false);
const [isMealD, SetisMealD] = useState(false);


const handleClosetD = () => SetisClosetD(!isClosetD);
const handleTvD = () => SetisTvD(!isTvD);
const handleBeddingD = () => SetisBeddingD(!isBeddingD);
const handleGeyserD = () => SetisGeyserD(!isGeyserD);
const handleAcD = () => SetisAcD(!isAcD);
const handleBathroomD = () => SetisBathroomD(!isBathroomD);
const handleAttachedBD = () => SetisAttachedBD(!isAttachedBD);
const handleMealD = () => SetisMealD(!isMealD);
  
 // for triple Room 
 const [RentTR, setRentT] = useState('');
const [DepositeTR, setDepositeT] = useState('');

const [isClosetT, SetisClosetT] = useState(false);
const [isTvT, SetisTvT] = useState(false);
const [isBeddingT, SetisBeddingT] = useState(false);
const [isGeyserT, SetisGeyserT] = useState(false);
const [isAcT, SetisAcT] = useState(false);
const [isBathroomT, SetisBathroomT] = useState(false);
const [isAttachedBT, SetisAttachedBT] = useState(false);
const [isMealT, SetisMealT] = useState(false);

const handleClosetT = () => SetisClosetT(!isClosetT);
const handleTvT = () => SetisTvT(!isTvT);
const handleBeddingT = () => SetisBeddingT(!isBeddingT);
const handleGeyserT = () => SetisGeyserT(!isGeyserT);
const handleAcT = () => SetisAcT(!isAcT);
const handleBathroomT = () => SetisBathroomT(!isBathroomT);
const handleAttachedBT = () => SetisAttachedBT(!isAttachedBT);
const handleMealT = () => SetisMealT(!isMealT);


//For Four Room 

const [RentFR, setRentF] = useState('');
const [DepositeFR, setDepositeF] = useState('');

const [isClosetF, SetisClosetF] = useState(false);
const [isTvF, SetisTvF] = useState(false);
const [isBeddingF, SetisBeddingF] = useState(false);
const [isGeyserF, SetisGeyserF] = useState(false);
const [isAcF, SetisAcF] = useState(false);
const [isBathroomF, SetisBathroomF] = useState(false);
const [isAttachedBF, SetisAttachedBF] = useState(false);
const [isMealF, SetisMealF] = useState(false);

const handleClosetF = () => SetisClosetF(!isClosetF);
const handleTvF = () => SetisTvF(!isTvF);
const handleBeddingF = () => SetisBeddingF(!isBeddingF);
const handleGeyserF = () => SetisGeyserF(!isGeyserF);
const handleAcF = () => SetisAcF(!isAcF);
const handleBathroomF = () => SetisBathroomF(!isBathroomF);
const handleAttachedBF = () => SetisAttachedBF(!isAttachedBF);
const handleMealF = () => SetisMealF(!isMealF);

// handle Room Details
const handleRoomDeatils = () => {
  
  const roomsDatabase = [];

// Variables for single room details
let ClosetS 
let TVS 
let BeddingS 
let GeyserS
let ACS 
let BathroomS 
let AttachedBS 
let MealS 
let RentS 
let DepositeS 

// Variables for double room details
let ClosetD 
let TVD 
let BeddingD 
let GeyserD 
let ACD 
let BathroomD 
let AttachedBD 
let MealD 
let RentD 
let DepositeD 

// Variables for triple room details
let ClosetT 
let TVT 
let BeddingT 
let GeyserT 
let ACT 
let BathroomT 
let AttachedBT 
let MealT 
let RentT 
let DepositeT 

// Variables for four room details
let ClosetF 
let TVF 
let BeddingF 
let GeyserF 
let ACF 
let BathroomF 
let AttachedBF 
let MealF 
let RentF 
let DepositeF 

if (singleRoom) {
  if (!Rent || !Deposite) {
    Alert.alert('Error', 'Please fill the Rent and Deposite of single room');
    return;
  }
  ClosetS = isCloset;
  TVS = isTv;
  BeddingS = isBedding;
  GeyserS = isGeyser;
  ACS = isAc;
  BathroomS = isBathroom;
  AttachedBS = isAttachedB;
  MealS = isMeal;
  RentS = Rent;
  DepositeS = Deposite;

  const SingleRoomDetails = {
    ClosetS,
    TVS,
    BeddingS,
    GeyserS,
    ACS,
    BathroomS,
    AttachedBS,
    MealS,
    RentS,
    DepositeS
  };
  roomsDatabase.push(SingleRoomDetails);
}

if (doubleRoom) {
  if (!RentDR || !DepositeDR) {
    Alert.alert('Error', 'Please fill the Rent and Deposite of double room');
    return;
  }
  ClosetD = isClosetD;
  TVD = isTvD;
  BeddingD = isBeddingD;
  GeyserD = isGeyserD;
  ACD = isAcD;
  BathroomD = isBathroomD;
  AttachedBD = isAttachedBD;
  MealD = isMealD;
  RentD = RentDR;
  DepositeD = DepositeDR;

  const DoubleRoomDetails = {
    ClosetD,
    TVD,
    BeddingD,
    GeyserD,
    ACD,
    BathroomD,
    AttachedBD,
    MealD,
    RentD,
    DepositeD
  };
  roomsDatabase.push(DoubleRoomDetails);
}

if (tripleRoom) {
  if (!RentTR || !DepositeTR) {
    Alert.alert('Error', 'Please fill the Rent and Deposite of Triple room');
    return;
  }
  ClosetT = isClosetT;
  TVT = isTvT;
  BeddingT = isBeddingT;
  GeyserT = isGeyserT;
  ACT = isAcT;
  BathroomT = isBathroomT;
  AttachedBT = isAttachedBT;
  MealT = isMealT;
  RentT = RentTR;
  DepositeT = DepositeTR;

  const TripleRoomDetails = {
    ClosetT,
    TVT,
    BeddingT,
    GeyserT,
    ACT,
    BathroomT,
    AttachedBT,
    MealT,
    RentT,
    DepositeT
  };
  roomsDatabase.push(TripleRoomDetails);
}

if (fourRoom) {
  if (!RentFR || !DepositeFR) {
    Alert.alert('Error', 'Please fill the Rent and Deposite of Four room');
    return;
  }
  ClosetF = isClosetF;
  TVF = isTvF;
  BeddingF = isBeddingF;
  GeyserF = isGeyserF;
  ACF = isAcF;
  BathroomF = isBathroomF;
  AttachedBF = isAttachedBF;
  MealF = isMealF;
  RentF = RentFR;
  DepositeF = DepositeFR;

  const FourRoomDetails = {
    ClosetF,
    TVF,
    BeddingF,
    GeyserF,
    ACF,
    BathroomF,
    AttachedBF,
    MealF,
    RentF,
    DepositeF
  };
  roomsDatabase.push(FourRoomDetails);
}

const PGRoomDetails = {
  Details: roomsDatabase,
  ClosetS,
  TVS,
  BeddingS,
  GeyserS,
  ACS,
  BathroomS,
  AttachedBS,
  MealS,
  RentS,
  DepositeS,
  ClosetD,
  TVD,
  BeddingD,
  GeyserD,
  ACD,
  BathroomD,
  AttachedBD,
  MealD,
  RentD,
  DepositeD,
  ClosetT,
  TVT,
  BeddingT,
  GeyserT,
  ACT,
  BathroomT,
  AttachedBT,
  MealT,
  RentT,
  DepositeT,
  ClosetF,
  TVF,
  BeddingF,
  GeyserF,
  ACF,
  BathroomF,
  AttachedBF,
  MealF,
  RentF,
  DepositeF
};
console.log(PGRoomDetails.RentS);
  
  navigation.navigate('PGlocality', { pgData ,PGRoomDetails});
};

       
      
     
       

  const navigation = useNavigation();
  return (
    <>
    <View style={styles.container}>
    <HeaderT />
    <ScrollView style={{flex:1,width:"95%",}}
    showsVerticalScrollIndicator={false}
    >
{singleRoom &&(
<View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10, marginBottom:height*0.020

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:height*0.020,color:Color.BLACK,marginTop:4,fontSize:responsiveFontSize(2.2),fontWeight:"500"}}>Single Room</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Rent/Monthly"
          placeholderTextColor={Color.BLACK}
          onChangeText={setRent}
          value={Rent}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Deposite"
          onChangeText={setDeposite}
          placeholderTextColor={Color.BLACK}
          value={Deposite}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      
      

      </View>
      <Text style={{marginVertical:height*0.020,marginHorizontal:height*0.020,fontSize:height*0.020,color:Color.textC}}>
      Equipment of the room
      </Text>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isCloset}
        onClick={handleCloset}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="door-sliding" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Closet</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isTv}
        onClick={handleTv}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="tv" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Tv</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isBedding}
        onClick={handleBedding}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bed" size={22} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bedding</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isGeyser}
        onClick={handleGeyser}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <Entypo name="archive" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Geyser</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isAc}
        onClick={handleAc}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:4}}>AC</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isBathroom}
        onClick={handleBathroom}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bathroom" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bathroom</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"50%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isAttachedB}
        onClick={handleAttachedB}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="shower-head" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Attached Bathroom</Text>
       </View>

       <View style={{width:"50%",flexDirection:"row",height:height*0.040,marginLeft:37}}>
       <CheckBox
        
        isChecked={isMeal}
        onClick={handleMeal}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="food-variant" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),marginTop:4,fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2}}>Meal Included</Text>
       </View>
       

      </View>

    </View>
)}
{doubleRoom &&(
<View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10, marginBottom:height*0.020

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:height*0.020,color:Color.BLACK,marginTop:4,fontSize:height*0.020,fontWeight:"500"}}>Double Room</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Rent/Monthly"
          onChangeText={setRentD}
          value={RentDR}
          placeholderTextColor={Color.BLACK}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Deposite"
          onChangeText={setDepositeD}
          value={DepositeDR}
          placeholderTextColor={Color.BLACK}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      
      

      </View>
      <Text style={{marginVertical:height*0.020,marginHorizontal:height*0.020,fontSize:height*0.020,color:Color.textC}}>
      Equipment of the room
      </Text>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isClosetD}
        onClick={handleClosetD}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="door-sliding" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Closet</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isTvD}
        onClick={handleTvD}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="tv" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Tv</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isBeddingD}
        onClick={handleBeddingD}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bed" size={22} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bedding</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isGeyserD}
        onClick={handleGeyserD}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <Entypo name="archive" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Geyser</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isAcD}
        onClick={handleAcD}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:4}}>AC</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isBathroomD}
        onClick={handleBathroomD}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bathroom" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bathroom</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"50%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isAttachedBD}
        onClick={handleAttachedBD}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="shower-head" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Attached Bathroom</Text>
       </View>

       <View style={{width:"50%",flexDirection:"row",height:height*0.040,marginLeft:37}}>
       <CheckBox
        
        isChecked={isMealD}
        onClick={handleMealD}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="food-variant" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),marginTop:4,fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2}}>Meal Included</Text>
       </View>
       

      </View>

    </View>
)}
{tripleRoom &&(
<View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10, marginBottom:height*0.020

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:height*0.020,color:Color.BLACK,marginTop:4,fontSize:height*0.020,fontWeight:"500"}}>Triple Room</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Rent/Monthly"
          onChangeText={setRentT}
          value={RentTR}
          placeholderTextColor={Color.BLACK}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Deposite"
          onChangeText={setDepositeT}
          value={DepositeTR}
          placeholderTextColor={Color.BLACK}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      
      

      </View>
      <Text style={{marginVertical:height*0.020,marginHorizontal:height*0.020,fontSize:height*0.020,color:Color.textC}}>
      Equipment of the room
      </Text>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isClosetT}
        onClick={handleClosetT}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="door-sliding" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Closet</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isTvT}
        onClick={handleTvT}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="tv" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Tv</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isBeddingT}
        onClick={handleBeddingT}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bed" size={22} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bedding</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isGeyserT}
        onClick={handleGeyserT}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <Entypo name="archive" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Geyser</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isAcT}
        onClick={handleAcT}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:4}}>AC</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isBathroomT}
        onClick={handleBathroomT}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bathroom" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bathroom</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"50%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isAttachedBT}
        onClick={handleAttachedBT}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="shower-head" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Attached Bathroom</Text>
       </View>

       <View style={{width:"50%",flexDirection:"row",height:height*0.040,marginLeft:37}}>
       <CheckBox
        
        isChecked={isMealT}
        onClick={handleMealT}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="food-variant" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),marginTop:4,fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2}}>Meal Included</Text>
       </View>
       

      </View>

    </View>
)}
{fourRoom &&(
<View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10, marginBottom:height*0.020

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:height*0.020,color:Color.BLACK,marginTop:4,fontSize:height*0.020,fontWeight:"500"}}>Four Room</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Rent/Monthly"
          onChangeText={setRentF}
          value={RentFR}
          placeholderTextColor={Color.BLACK}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Deposite"
          onChangeText={setDepositeF}
          value={DepositeFR}
          placeholderTextColor={Color.BLACK}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      
      

      </View>
      <Text style={{marginVertical:height*0.020,marginHorizontal:height*0.020,fontSize:height*0.020,color:Color.textC}}>
      Equipment of the room
      </Text>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isClosetF}
        onClick={handleClosetF}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="door-sliding" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Closet</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isTvF}
        onClick={handleTvF}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="tv" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Tv</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isBeddingF}
        onClick={handleBeddingF}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bed" size={22} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bedding</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isGeyserF}
        onClick={handleGeyserF}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <Entypo name="archive" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Geyser</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isAcF}
        onClick={handleAcF}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:4}}>AC</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isBathroomF}
        onClick={handleBathroomF}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bathroom" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bathroom</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"50%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isAttachedBF}
        onClick={handleAttachedBF}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="shower-head" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Attached Bathroom</Text>
       </View>

       <View style={{width:"50%",flexDirection:"row",height:height*0.040,marginLeft:37}}>
       <CheckBox
        
        isChecked={isMealF}
        onClick={handleMealF}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="food-variant" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),marginTop:4,fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2}}>Meal Included</Text>
       </View>
       

      </View>

    </View>
)}
  
{/* 
    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:height*0.020,color:Color.BLACK,marginTop:4,fontSize:height*0.020,fontWeight:"500"}}>Double Room</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Rent/Monthly"
          onChangeText={setRent}
          value={Rent}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputdate}
          placeholder="Expected Deposite"
          onChangeText={setDeposite}
          value={Deposite}
          keyboardType="numeric"
        />
         
          <MaterialCommunityIcons name="currency-inr" size={height*0.020} color="gray" style={styles.icon} />
        
      </View>
      
      

      </View>
      <Text style={{marginVertical:height*0.020,marginHorizontal:height*0.020,fontSize:height*0.020,color:Color.textC}}>
      Equipment of the room
      </Text>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isLift}
        onClick={handleLift}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="door-sliding" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Closet</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isLift}
        onClick={handleLift}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="tv" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Tv</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isLift}
        onClick={handleLift}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bed" size={22} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bedding</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isLift}
        onClick={handleLift}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <Entypo name="archive" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Geyser</Text>
       </View>

       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isLift}
        onClick={handleLift}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:4}}>AC</Text>
       </View>
       <View style={{width:"30%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isLift}
        onClick={handleLift}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="bathroom" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Bathroom</Text>
       </View>

      </View>
      <View style={{flexDirection:"row",marginHorizontal:height*0.020,width:"90%",alignItems:"center",marginTop:10}}>
         
      <View style={{width:"50%",flexDirection:"row",height:height*0.040}}>
       <CheckBox
        
        isChecked={isLift}
        onClick={handleLift}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="shower-head" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2,marginTop:4}}>Attached Bathroom</Text>
       </View>

       <View style={{width:"50%",flexDirection:"row",height:height*0.040,marginLeft:37}}>
       <CheckBox
        
        isChecked={isLift}
        onClick={handleLift}
        containerStyle={styles.checkboxContainer}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialCommunityIcons name="food-variant" size={height*0.020} color="black" style={[styles.icon1]} />
      <Text style={{fontSize:responsiveFontSize(1.3),marginTop:4,fontWeight:height*0.0200,color:Color.BLACK, marginLeft:2}}>Meal Included</Text>
       </View>
       

      </View>

    </View> */}

   



   </ScrollView>
    </View>
    <View style={{height:height*0.080,width:"100%",backgroundColor:"white"}}>
         <TouchableOpacity
         style={{ 
         backgroundColor: "rgba(97, 85, 233, 100)",
         borderRadius: 10,
         marginHorizontal:height*0.020,
         paddingHorizontal: 23,
         paddingVertical: 12,
         bottom:10,
         position:"absolute",
         
         
         width:"90%"
         }}
         onPress={handleRoomDeatils}
         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize: responsiveFontSize(1.6), alignItems: 'center',textAlign:"center" }}>
         Next, add Locality details   
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
    flexDirection:"row"
  },
  skyscrapersIcon: {
    left:10,
    height: 37,
    width: 30,
    top: height*0.020,
    
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
    fontSize:height*0.020,
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
    fontSize:height*0.020,
    color:Color.BLACK
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: height*0.0200,
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
  },
  selectedGender: {
    fontSize: responsiveFontSize(1.6),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: height*0.020,
    borderRadius: 10,
    width: height*0.0200,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  modalOptionText: {
    fontSize: responsiveFontSize(1.6),
  },
  selectedOutput: {
    fontSize: responsiveFontSize(1.6),
    marginTop: height*0.020,
  },
  icon: {
    marginLeft: 5,
  },
  icon1: {
    marginLeft: 5,
    marginTop:3
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.GREY,
    backgroundColor:Color.lightblue,
    borderRadius: 5,
    paddingHorizontal: 10,
    width:"90%",
    marginBottom:height*0.020,
    color:Color.BLACK
    
  },
  inputdate: {
    flex: 1,
    height: height*0.045,
    color:Color.BLACK
    
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginTop:-8
  },
  checkboxText: {
    fontSize: 10,
  },

  
 
});

export default PgRoomDetails;
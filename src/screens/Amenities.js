import React,{useRef, useState } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList, } from "react-native";
    import { RadioButton } from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import HeaderT from "../components/main/AmenitiesH"
import CheckBox from 'react-native-check-box';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native';
import { Header } from "@react-navigation/stack";
import Color from '../Utils/Colors'
import { FontSize } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get("window");

const ForG = [
    {Gender: 'Corporations'},
    {Gender: 'Borewell'},
    {Gender: 'Both'},
    
];

const ForC=[
    {who:"Need Help"},
    {who:"I will show"},
    {who:"Neighbours"},
    {who:"Security"},
    {who:"Tenant"},
]

function Amenities(props) {

  const route = useRoute();
  const {FlatDetails} = route.params;
  const{PropertyDeatils} =route.params;
  const{RentalCondition} =route.params;

    
        const [Bathroom, setBathroom] = useState('');
        const [mobileNo, setMobileNo] = useState('');
        
        const [Balcony, setBalcony] = useState('');

        const[Water,setWater] =useState('');
        const[Show,setShow] =useState('');
     

        const [text, setText] = useState('');

        const [search, setSearch] = useState('');// for city

  const [clicked, setClicked] = useState(false); // for gender
  const [clickedC, setClickedC] = useState(false); // fro city
  const [data, setData] = useState(ForG);// for gender
  const [dataC, setDataC] = useState(ForC);// for city


  const [Gymavailability, SetGymAvail] = useState('');

  const handleGymAvail = (option) => {
    SetGymAvail(option);
  };

  const [Allowed, SetAllowed] = useState('');

  const handleAllowed = (option) => {
    SetAllowed(option);
  };

  const [Security, SetSecurity] = useState('');

  const handleSecurity = (option) => {
    SetSecurity(option);
  };

  const [Smoking, SetSmoking] = useState('');

  const handleSmoking = (option) => {
    SetSmoking(option);
  };
  

  const [isLift, SetisLift] = useState(false);
  
    const handleLift = () => {
      SetisLift(!isLift);
    };
    const [isW, SetisW] = useState(false);
  
    const handleW = () => {
      SetisW(!isW);
    };

    const [isIC, SetisIC] = useState(false);
  
    const handleIC = () => {
      SetisIC(!isIC);
    };
    const [isAC, SetisAC] = useState(false);
  
    const handleAC = () => {
      SetisAC(!isAC);
    };

    const [isCH, SetisCH] = useState(false);
  
    const handleCH = () => {
      SetisCH(!isCH);
    };

    const [isI, SetisI] = useState(false);
  
    const handleI = () => {
      SetisI(!isI);
    };

    const [isSP, SetisSP] = useState(false);
  
    const handleSP = () => {
      SetisSP(!isSP);
    };

    const [isPB, SetisPB] = useState(false);
  
    const handlePB = () => {
      SetisPB(!isPB);
    };

    const [isFS, SetisFS] = useState(false);
  
    const handleFS = () => {
      SetisFS(!isFS);
    };

    const [isVP, SetisVP] = useState(false);
  
    const handleVP = () => {
      SetisVP(!isVP);
    };

    const [isSC, SetisSC] = useState(false);
  
    const handleSC = () => {
      SetisSC(!isSC);
    };

    const [isGP, SetisGP] = useState(false);
  
    const handleGP = () => {
      SetisGP(!isGP);
    };

    const [isP, SetisP] = useState(false);
  
    const handleP = () => {
      SetisP(!isP);
    };
    const [isSR, SetisSR] = useState(false);
  
    const handleSR = () => {
      SetisSR(!isSR);
    };
    const [isHK, SetisHK] = useState(false);
  
    const handleHK = () => {
      SetisHK(!isHK);
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
      
      
      
      
const navigation = useNavigation();
      
        const HandleAmmenties = () => {
       
          
          // onPress={()=>navigation.navigate("LocalityDetails")}
          const ammenities ={
            Bathroom,
            Balcony,
            Gymavailability,
            Allowed,
            Security,
            Smoking,
            text,
            Water,
            mobileNo,
            Show,
            isLift,
            isW,
            isIC,
            isAC,
            isCH,
            isI,
            isSP,
            isPB,
            isFS,
            isSC,
            isGP,
            isP,
            isSR,
            isHK
          }
         console.log(ammenities);
          navigation.navigate('LocalityDetails', {FlatDetails,PropertyDeatils,RentalCondition,ammenities});
          
      
          // Your submission logic here
          
        };

  
  return (
    <>
    <View style={styles.container}>
    <HeaderT />
    <ScrollView style={{flex:1,width:"95%",}}
    showsVerticalScrollIndicator={false}
    >

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,

}}>
        
           <View style={{width:"90%",height:40,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:18,fontWeight:"500"}}>Characteristics of your accommodation </Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems:"center"

    }}>
        <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between",width:"90%"}}>
        <View style={[styles.formItem1, {justifyContent: "flex-start" }]}>
        <TextInput
          style={styles.input}
          placeholder="Bathroom"
          value={Bathroom}
          onChangeText={setBathroom}
          keyboardType="numeric"
          placeholderTextColor={Color.BLACK}

        />
      </View>
      <View style={[styles.formItem1, { justifyContent: "flex-end" }]}>
        <TextInput
          style={styles.input}
          placeholder="Balcony"
          value={Balcony}
          onChangeText={setBalcony}
          keyboardType="numeric"
          placeholderTextColor={Color.BLACK}
        />
      </View>

      </View>
      <View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"90%"}}>
         
        <View style={styles.container1}>
      <FontAwesome6 name="dumbbell" size={25} color="black" style={[styles.icon,{marginLeft:-5}]} />
      <Text style={styles.text}>Gym Available</Text>
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.optionButton, Gymavailability === 'yes' ? styles.selectedOption : null]}
          onPress={() => handleGymAvail('Yes')}>
          <Text style={[styles.optionText, Gymavailability === 'yes' ? styles.selectedOptionText : null]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, Gymavailability === 'no' ? styles.selectedOption : null]}
          onPress={() => handleGymAvail('no')}>
          <Text style={[styles.optionText,{paddingLeft:7}, Gymavailability === 'no' ? styles.selectedOptionText : null]}>No</Text>
        </TouchableOpacity>
      </View>
    </View>

    </View>
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"90%"}}>
         
         <View style={styles.container1}>
         <FontAwesome6 name="egg" size={25} color="black" style={styles.icon} />
       <Text style={styles.text}>Non-Veg Allowed</Text>
       <View style={styles.options}>
         <TouchableOpacity
           style={[styles.optionButton, Allowed === 'yes' ? styles.selectedOption : null]}
           onPress={() => handleAllowed('yes')}>
           <Text style={[styles.optionText, Allowed === 'yes' ? styles.selectedOptionText : null]}>Yes</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[styles.optionButton, Allowed === 'no' ? styles.selectedOption : null]}
           onPress={() => handleAllowed('no')}>
           <Text style={[styles.optionText,{paddingLeft:7}, Allowed === 'no' ? styles.selectedOptionText : null]}>No</Text>
         </TouchableOpacity>
       </View>
     </View>
 
     </View>

     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"90%"}}>
         
         <View style={styles.container1}>
       <MaterialIcons name="security" size={25} color="black" style={[styles.icon,{marginLeft:-3}]} />
       <Text style={styles.text}> Gated Security</Text>
       <View style={styles.options}>
         <TouchableOpacity
           style={[styles.optionButton, Security === 'yes' ? styles.selectedOption : null]}
           onPress={() => handleSecurity('yes')}>
           <Text style={[styles.optionText, Security === 'yes' ? styles.selectedOptionText : null]}>Yes</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[styles.optionButton, Security === 'no' ? styles.selectedOption : null]}
           onPress={() => handleSecurity('no')}>
           <Text style={[styles.optionText,{paddingLeft:7}, Security === 'no' ? styles.selectedOptionText : null]}>No</Text>
         </TouchableOpacity>
       </View>
     </View>
 
     </View>

     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"90%"}}>
         
         <View style={styles.container1}>
       <MaterialIcons name="smoking-rooms" size={25} color="black" style={styles.icon} />
       <Text style={styles.text}>Smoking Allowed</Text>
       <View style={styles.options}>
         <TouchableOpacity
           style={[styles.optionButton, Smoking === 'yes' ? styles.selectedOption : null]}
           onPress={() => handleSmoking('yes')}>
           <Text style={[styles.optionText, Smoking === 'yes' ? styles.selectedOptionText : null]}>Yes</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[styles.optionButton, Smoking === 'no' ? styles.selectedOption : null]}
           onPress={() => handleSmoking('no')}>
           <Text style={[styles.optionText,{paddingLeft:7}, Smoking === 'no' ? styles.selectedOptionText : null]}>No</Text>
         </TouchableOpacity>
       </View>
     </View>
 
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
          textAlignVertical="top"
          placeholderTextColor={Color.BLACK}
        />
      </View>

      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,

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
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight:'200',color:Color.BLACK}}>
          {Water == '' ? 'Water Supply' : Water}
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
                    setWater(item.Gender);
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

      
      <View style={[styles.formItem,{marginTop:15}]}>
        <TextInput
          style={styles.input}
          placeholder="Mobile No"
          value={mobileNo}
          onChangeText={setMobileNo}
          keyboardType="numeric"
          placeholderTextColor={Color.BLACK}
          
        />
      </View>


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
          {Show == '' ? 'who will show the Property' : Show}
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
                    setShow(item.who);
                    setClickedC(!clickedC);
                    // onSearch('');
                    // setSearch('');
                  }}>
                  <Text style={{fontWeight: '600',color:Color.BLACK}}>{item.who}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}


      </View>
    </View>


    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,marginTop:15,marginBottom:15

}}>
        
           <View style={{width:"90%",height:40,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8,marginBottom:10}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:18,fontWeight:"500"}}>Select the available amenities </Text>
               
           </View>
        

      <View style={{width:"100%",height:"auto",marginTop:20,alignItems: 'center',
    marginBottom:20}}>
        
        
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isLift}
        onClick={handleLift}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Lift</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isW}
        onClick={handleW}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Wifi</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isIC}
        onClick={handleIC}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Internet Connection </Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isAC}
        onClick={handleAC}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Air Conditioner</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isCH}
        onClick={handleCH}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Club house</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isI}
        onClick={handleI}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Intercom</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isSP}
        onClick={handleSP}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Swimming pool</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isPB}
        onClick={handlePB}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Power backup</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isFS}
        onClick={handleFS}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Fire safety</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isSC}
        onClick={handleSC}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Shopping center</Text>
       </View>
      
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isGP}
        onClick={handleGP}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Gas pipeline</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isP}
        onClick={handleP}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Park</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isSR}
        onClick={handleSR}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>Servant room</Text>
       </View>
       <View style={{width:"98%",flexDirection:"row",height:40}}>
       <CheckBox
        
        isChecked={isHK}
        onClick={handleHK}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedCheckBoxColor={Color.colorRoyalblue_100}
      />
      <MaterialIcons name="door-sliding" size={25} color="black" style={[styles.icon]} />
      <Text style={{fontSize:18,fontWeight:500,color:Color.BLACK, marginLeft:20}}>House keeping</Text>
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
        
         onPress={HandleAmmenties}
         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
         Next, add Locality Details 
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
    width: '46%',
    marginBottom: 20,
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
    fontSize:responsiveFontSize(1.5),
    color:Color.BLACK
  },
  inputP: {
    height: 42,
    
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
    width: 200,
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
    fontSize: responsiveFontSize(1.5),
    marginTop: 20,
  },
  textAreaContainer: {
    width: '90%',
    height: height*0.125,
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
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    
    borderRadius: 8,
    borderColor: 'gray',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    marginRight: 10,
    marginLeft:40,
    color:Color.BLACK
  },
  options: {
    flexDirection: 'row',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign:"center",
    borderRadius: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'blue',
    width:40,
    height:40
  },
  optionText: {
    color: 'blue',
    fontSize:12,
    paddingLeft:5
    
    
  },
  
  selectedOption: {
    backgroundColor: 'blue',
  },
  selectedOptionText: {
    color: 'white',
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginTop:-8
  },
  checkboxText: {
    fontSize: 14,
    color:Color.BLACK
  },
  

  
 
});

export default Amenities;
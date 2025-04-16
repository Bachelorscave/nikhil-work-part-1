import React,{useRef, useState } from "react";
import { StyleSheet, View, Modal, Text, Dimensions,TouchableOpacity,ImageBackground,Image,TextInput,
    FlatList, } from "react-native";
    import { RadioButton } from 'react-native-paper';

import HeaderT from "../components/main/SelectPh"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native';
import { Header } from "@react-navigation/stack";
import Color from '../Utils/Colors'
import { FontSize } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const ForG = [
    {Gender: 'Male'},
    {Gender: 'Female'},
    
];

const ForC=[
    {City:"Kharar"},
    {City:"Chandigarh"},
    {City:"Mohali"},
]

function PgRoom(props) {

    
        const [PGName, setPGName] = useState('');
        const [text, settext] = useState('');
        const [selectedButton, setSelectedButton] = useState(null);
        const [SingleRoom,setSingleRoom] =useState(false);
        const [DoubleRoom,setDoubleRoom] =useState(false);
        const [TripleRoom,setTripleRoom] =useState(false);
        const [FourRoom,setFourRoom] =useState(false);
      
        const handleButtonPress = (button) => {
          setSelectedButton(button);
        };
        const handleSingleRoom = () => {
          setSingleRoom(!SingleRoom);
      };
      const handleDoubleRoom = () => {
        setDoubleRoom(!DoubleRoom);
      };
      const handleTripleRoom = () => {
        setTripleRoom(!TripleRoom);
      };
      const handleFourRoom = () => {
        setFourRoom(!FourRoom);
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
const handleSubmit = () => {
  if (!PGName || !text) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  const selectedRoomTypes = [];
  if (SingleRoom) selectedRoomTypes.push('Single');
  if (DoubleRoom) selectedRoomTypes.push('Double');
  if (TripleRoom) selectedRoomTypes.push('Triple');
  if (FourRoom) selectedRoomTypes.push('Four');

  if (selectedRoomTypes.length === 0) {
    Alert.alert('Error', 'Please select at least one room type');
    return;
  }

  const pgData = {
    PGName,
    description: text,
    roomTypes: selectedRoomTypes,
  };
 console.log(pgData);
  navigation.navigate("PgRoomDetails", { pgData });
};   
        
  const navigation = useNavigation();
  return (
    <>
    <View style={styles.container}>
    <HeaderT />
    <ScrollView style={{flex:1,width:"95%",marginTop:height*0.02}}
    showsVerticalScrollIndicator={false}
    >

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,marginBottom:15

}}>
        
           <View style={{width:"90%",height:height*0.040,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:20,fontWeight:"500"}}>Your PG</Text>
               
           </View>
        <View style={{width:"100%",height:"auto",marginTop:8,alignItems: 'center',
    }}>
           <View style={styles.formItem}>
        <TextInput
          style={styles.input}
          placeholder="PG Name"
          placeholderTextColor={Color.BLACK}
          value={PGName}
          onChangeText={setPGName}
        />
      </View>
      <View style={{width:"100%",height:"auto",marginTop:10,alignItems: 'center',
    marginBottom:20}}>
        
        <View style={styles.textAreaContainer}>
        <TextInput
          multiline
          numberOfLines={10}
          placeholderTextColor={Color.BLACK}
          style={styles.textArea}
          value={text}
          onChangeText={settext}
          placeholder="Pg Description"
          textAlignVertical="top"
          
        />
      </View>

      </View>
      

      </View>
    </View>

    <View style={{height:"auto",width:"100%",  borderWidth:1,borderColor:Color.GREY,borderRadius:10,marginTop:15,paddingBottom:15

}}>
        
           <View style={{width:"90%",height:40,borderLeftColor:Color.colorRoyalblue_100
        ,borderLeftWidth:2,marginTop:8,marginBottom:10}}>
               <Text style={{marginLeft:15,color:Color.BLACK,marginTop:4,fontSize:16,fontWeight:"500",height:50}}>Select the type of rooms available in your PG</Text>
               
           </View>
       
        
        <View style={{flexDirection:"row",justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,}}>
              <TouchableOpacity
        style={[styles.button,  SingleRoom ? styles.clickedButton : styles.unclickedButton]}
        
        onPress={handleSingleRoom}>
        <View style={{alignItems:"center"}}>
        <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
        <Text style={styles.buttonText}>Single</Text>
        
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, DoubleRoom ? styles.clickedButton : styles.unclickedButton]}
        onPress={handleDoubleRoom}>
         <View style={{alignItems:"center"}}>
        <View style={{flexDirection:"row"}}>
        <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
              <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
          </View>    
        <Text style={styles.buttonText}>Double</Text>
        
        </View>
      </TouchableOpacity>

      
           </View>
           <View style={{flexDirection:"row",justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,}}>
              <TouchableOpacity
        style={[styles.button,TripleRoom ? styles.clickedButton : styles.unclickedButton]}
        onPress={handleTripleRoom}>
        <View style={{alignItems:"center"}}>
        <View style={{flexDirection:"row"}}>
        <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
              <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
              <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
          </View>    
        <Text style={styles.buttonText}>Triple</Text>
        
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, FourRoom ? styles.clickedButton : styles.unclickedButton]}
        onPress={handleFourRoom}>
       <View style={{alignItems:"center"}}>
        <View style={{flexDirection:"row"}}>
        <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
              <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
              <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
              <MaterialCommunityIcons
                name="bed-single-outline"
                color="black"
                size={30}
                
              />
          </View>    
        <Text style={styles.buttonText}>Four</Text>
        
        </View>
      </TouchableOpacity>

      
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
         onPress={handleSubmit}
         >    
         <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16, alignItems: 'center',textAlign:"center" }}>
         Save & Continue
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
  skyscrapersIcon: {
    left:10,
    height: 37,
    width: 30,
    top: 20,
    
  },
  input: {
    height: height*0.045,
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
    height: height*0.045,
    
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
    width: width*0.400,
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
    width: width*0.400,
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

  textAreaContainer: {
    width: '90%',
    height: height*0.280,
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
    height:height*0.090,
    width:"40%",
    backgroundColor:Color.lightblue
    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color:Color.BLACK
  },
  selectedButton: {
    backgroundColor: Color.colorRoyalblue_100,
  },
  unclickedButton: {
    backgroundColor: Color.lightblue,
    // borderColor:Color.BLACK,
    borderWidth:1,
    
    
},
clickedButton: {
    backgroundColor: Color.colorRoyalblue_100,
    borderWidth: 1,
    borderColor: "white",
    
},
  

  
 
});

export default PgRoom;
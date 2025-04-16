import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import { TextInput, Alert } from 'react-native';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome'; // Import the Eye icon from Expo Icons

import HeaderT from "../components/main/header";
import { useNavigation } from '@react-navigation/native';
import Color from "../Utils/Colors";
import { Signup1 } from "../apiservice/ApiService";

const { width, height } = Dimensions.get("window");

const Register = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleSignUp = async () => {
    if (!fullName || !email || !phoneNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const response = await Signup1(fullName, email, phoneNumber, password);
      if (response.status == 201) {
        navigation.navigate('Login');
      } else {
        console.log('Error:', response);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageStack}>
        <Image
        //   source={require("./src/image/SignUp_Hero.png")}
        source={require("../image/SIgnup.jpg")}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.loremIpsum}>Let's get you signed in</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
  <TouchableOpacity style={{
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Align children vertically
    width: width*0.60,
    height: height*0.035,
    borderColor: "rgba(97, 85, 223, 1)",
    borderWidth: 2,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: width*0.1, // Add horizontal padding
  }}>
    <Image
      source={require("../image/goole.png")}
      style={{ height: 20, width: 20, marginRight: 5,marginLeft:7 }} // Adjust size and margin
    />
    <Text style={{ textAlign: "center" }}>Login with Google</Text>
  </TouchableOpacity>
</View>
<View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 4,marginLeft:100,marginTop:35 }}>
  <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginRight: 10 }} />
  <Text style={{ textAlign: 'center' }}>or</Text>
  <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginLeft: 10,marginRight:100 }} />
</View>
<View style={{height:"50%"}}>
<View style={{ marginTop: 20, width:"80%" }}>
<TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      {/* fgxhhxg */}
      <TextInput
        placeholder="Email"
        placeholderTextColor={Color.BLACK}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor={Color.BLACK}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
        
        
      />
            <View style={{ flexDirection: 'row', alignItems: 'center' ,borderBottomWidth: 1, borderColor: '#ccc',}}>
            <TextInput
          placeholder="Password"
          placeholderTextColor={Color.BLACK}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Use secureTextEntry based on showPassword state
           // Ensure TextInput takes remaining space
          style={styles.input1}
        />
        <FontAwesome
          name={showPassword ? "eye" : "eye-slash"}
          size={20}
          color="#000"
          onPress={() => setShowPassword(!showPassword)} // Toggle showPassword state
          style={{ marginRight: 8 }}
        />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:20 }}>
        <Checkbox
          isChecked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
        />
        <Text>By signing up I agree to <Text style={{color:"rgba(97, 85, 223, 1)"}}>Terms & Conditions!</Text></Text>
      </View> 
      <TouchableOpacity
                          onPress={handleSignUp}
                          style={{
                            backgroundColor: 'rgba(97, 85, 223, 1)', // Just for visibility, you can change or remove this
                            padding: 15, // Just for visibility, you can change or remove this
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            paddingLeft:10,
                            paddingRight:10,
                            width:350,
                            bottom:5,
                            marginTop:20
                          }}
                        >
                          <Text style={{
                            width:"auto",
                            fontSize:14,
                            fontWeight:"600",
                            color:"white"
                          }}>Create Account</Text>
                        </TouchableOpacity>
      <TouchableOpacity style={{alignContent:"center"}} onPress={()=>navigation.navigate("Login1")}>
      <Text style={styles.loremIpsum3}>
        Already have an account? <Text style={{color:Color.colorRoyalblue_100}}> Login Now </Text>
        </Text></TouchableOpacity>
    
  </View>
  </View>
      </View>
  );
};
const Checkbox = ({ isChecked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginTop:2,
        borderColor: isChecked ? '#007bff' : '#ccc',
      }}>
        {isChecked && <View style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: '#007bff',
        }} />}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    
    backgroundColor:"white"
  },
  image: {
    width: width * 0.8, // Adjusted width based on screen width
    height: height * 0.3, // Adjusted height based on screen height
  },
  loremIpsum: {
    fontFamily: "roboto-500",
    color: "#121212",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight:"700"
  },
  imageStack: {
    alignItems: "center",
    marginTop:30
  },
  materialUnderlineTextbox: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 20,
  },
  materialUnderlineTextbox1: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 10,
  },
  materialUnderlineTextbox2: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 10,
  },
  materialRightIconTextbox: {
    width: width * 0.85, // Adjusted width based on screen width
    marginTop: 10,
  },
  materialCheckboxWithLabel: {
    marginTop: 10,
  },
  materialButtonPrimary: {
    height:49,
    width: width * 0.9, // Adjusted width based on screen width
    marginTop: 20,
  },
  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 15,
    marginBottom:20,
    // alignItems:"flex-start",
    // alignContent:"center",
    paddingBottom:20,
    width:"80%"
    
  },
  input: {
    padding: 5,
    borderBottomWidth: 1,
    fontSize:15,
    marginTop:15,
    
    borderColor: '#ccc',
  },
  input1: {
    padding: 5,
    borderBottomWidth: 1,
    fontSize:15,
    marginTop:15,
    flex:1,
    
    borderColor: '#ccc',
  },
  button: {
    marginTop: 20,
  },

});

export default Register;

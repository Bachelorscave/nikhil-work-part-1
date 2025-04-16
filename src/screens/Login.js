import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Correct import for Expo
import user_login from '../apiservice/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header20 from '../components/main/header';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../GlobalStyles';
import Colors from '../Utils/Colors';
const {width, height} = Dimensions.get('screen');
const LoginMain = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    user_login({
      email: email,
      password: password,
    })
      .then(result => {
        if (result.status === 200) {
          AsyncStorage.setItem('AccessToken', result.data.token);
          AsyncStorage.setItem('User_id', result.data._id);
          AsyncStorage.setItem('Name', result.data.fullName);
          AsyncStorage.getItem('AccessToken').then(value =>
            console.log('AccessToken: ', value),
          );
          AsyncStorage.getItem('User_id').then(value =>
            console.log('User_id: ', value),
          );
          AsyncStorage.getItem('Name').then(value =>
            console.log('Name: ', value),
          );
          navigation.replace('HomeStack1');
          ToastAndroid.showWithGravityAndOffset(
            'Login successful!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.showWithGravityAndOffset(
          err.message || 'Login failed',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });

    console.log('Login information:', {email, password, rememberMe});
  };

  const isValidEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <ImageBackground
      source={require('../image/Login1.png')}
      style={styles.container}>
      <Header20 />
      <View style={styles.formContainer}>
        <Text style={styles.loremIpsum}>Login</Text>
        <Text style={styles.loremIpsum3}>
          Enter your credentials and get ready to explore
        </Text>
        <View style={{alignItems: 'center'}}>
          <View style={styles.passwordContainer}>
            <MaterialIcons
              name="email"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.passwordContainer}>
            <MaterialIcons
              name="lock"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.passwordInput}
              placeholder="Your Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeIconContainer}>
              <MaterialIcons
                name={passwordVisible ? 'visibility-off' : 'visibility'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rememberContainer}>
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.checkbox}>
              {rememberMe ? (
                <MaterialIcons name="check-box" size={24} color="black" />
              ) : (
                <MaterialIcons
                  name="check-box-outline-blank"
                  size={24}
                  color="black"
                />
              )}
            </TouchableOpacity>
            <Text style={{marginLeft: -40}}>Remember me</Text>
            <TouchableOpacity style={{alignItems: 'flex-end'}}>
              <Text style={{color: 'rgba(97, 85, 223, 1)', fontWeight: '600'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require('../image/goole.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Login with Google</Text>
          </TouchableOpacity>
          <View style={{marginTop: 50}}>
            <Text style={{textAlign: 'center', color: Colors.BLACK}}>
              Don’t have an account?
              <TouchableOpacity onPress={() => navigation.navigate('Signup1')}>
                <Text style={{color: 'rgba(97, 85, 223, 1)'}}>Sign up now</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: width * 0.85,
    backgroundColor: 'white',
    height: height * 0.55,
    borderRadius: 25,
    marginVertical: height * 0.175,
  },
  loremIpsum: {
    fontFamily: 'roboto-500',
    color: '#121212',
    marginLeft: 20,
    fontSize: 20,
    marginTop: 20,
    fontWeight: '700',
  },
  input: {
    width: '85%',
    height: height * 0.042,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
    fontSize: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '85%',
    height: height * 0.042,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  eyeIconContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginBottom: 10,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  checkbox: {
    alignItems: 'flex-start',
  },
  loginButton: {
    width: '85%',
    height: 45,
    backgroundColor: 'rgba(97, 85, 223, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loremIpsum3: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 15,
    marginBottom: 35,
    width: '85%',
    marginLeft: 20,
  },
  icon: {
    marginRight: 10,
    marginTop: 4,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    justifyContent: 'center',
    height: 45,
    borderColor: 'rgba(97, 85, 223, 1)',
    borderWidth: 2,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  googleIcon: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginLeft: 7,
  },
  googleButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.BLACK,
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
export const checkToken = async () => {
    try {
        const token = await AsyncStorage.getItem('AccessToken');
       // console.log('token',token);
     //   AsyncStorage.getItem("AccessToken").then(value => console.log("AccessToken: ", value));
       // console.log('token',value);
        return token ;
       
    } catch (error) {
        console.error('Error checking token:', error);
        return false;
    }
};
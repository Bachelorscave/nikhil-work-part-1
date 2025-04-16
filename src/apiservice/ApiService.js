import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiManager = axios.create({
    baseURL: 'http://93.127.185.101:8005/',
    responseType:'json',
    withCredentials:true,
});

const retrieveData = async () => {
    try {
      const authToken = localStorage.getItem('AccessToken');
      return authToken;
    } catch (error) {
      console.error('Error retrieving authentication token:', error);
      return null;
    }
  };


export default ApiManager;

const base_url = "http://93.127.185.101:8005/";

// export const Login = async (email, password) => {
//     console.log('----------->', email, password);
//     try {
//       const response = await sendRequestService('POST', `${base_url}/api/users/login`, {
//         "email": email,
//         "password": password
//       }, false);
  
//       await AsyncStorage.setItem('authToken', response.token);
  
//       return response;
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

export const Signup = async (fullName, email, phoneNumber, password) => {
    console.log('----------->', fullName, email, phoneNumber, password);
    try {
        
      return sendRequestService('POST', `${base_url}api/users/register`, {
        "fullName": fullName,
        "email": email,
        "phoneNumber": phoneNumber,
        "password": password,
        "userType": 'tenant'
      }, false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  export const Signup1 = async (fullName, email, phoneNumber, password) => {
    const tenant = 'tenant';
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          userType: tenant
        }),
      };
  
      const response = await fetch(`${base_url}api/users/register`, requestOptions);
      console.log("---> photo -->data");
      console.log(response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      return jsonData;
  
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  export const sendRequestService = async (method, url, body, includeToken) => {
    try {
      let headers = {};
      if (includeToken) {
        const authToken = await retrieveData();
        headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      }
      headers = {
        ...headers,
        "Content-Type": "application/json"
      };
  
      let response;
      if (method === 'GET') {
        // console.log('getcountry-------', url, headers); 
        response = await axios.get(url, { headers });
      } else if (method === 'POST') {
        response = await axios.post(url, body, { headers });
      } else if (method === 'PUT') {
        response = await axios.put(url, body, { headers });
      } else if (method === 'PATCH') {
        response = await axios.patch(url, body, { headers });
        console.log(response, "api responnse===")
      } else if (method === 'DELETE') {
        response = await axios.delete(url, { headers });
      }
      // console.log('getResponse!!!!!!!!!!!', url,  response.data.data);
      return response.data;
    } catch (error) {
      // console.log('error ()', error.response);
      if (error?.response?.status === 401) {
        console.log('Response error:', error);
        // } else if (axios.isCancel(error)) {
        //   console.log('Request canceled:', error.message);
      } else if (error.response) {
        console.log('Response error:', error.response.data);
        console.log('Status code:', error.response.status);
        console.log('Headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request error:', error.request);
      } else {
        console.log('Error:', error.message);
      }
      throw error.response;
    }
  };
  
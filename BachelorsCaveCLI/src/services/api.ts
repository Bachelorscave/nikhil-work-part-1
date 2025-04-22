import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const authAPI = {
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    address: string;
  }) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },
}; 
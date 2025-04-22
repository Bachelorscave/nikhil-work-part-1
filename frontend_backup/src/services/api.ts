import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for API calls - use environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (userData: any) => api.post('/auth/register', userData),
  verifyEmail: (token: string) => api.get(`/auth/verify-email/${token}`),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post(`/auth/reset-password/${token}`, { password }),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
  getMe: () => api.get('/auth/me'),
};

// Owner API calls
export const ownerAPI = {
  login: (email: string, password: string) =>
    api.post('/owner/login', { email, password }),
  register: (ownerData: any) => api.post('/owner/register', ownerData),
  verifyEmail: (token: string) => api.get(`/owner/verify-email/${token}`),
  forgotPassword: (email: string) => api.post('/owner/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post(`/owner/reset-password/${token}`, { password }),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/owner/change-password', { currentPassword, newPassword }),
  getProfile: () => api.get('/owner/me'),
  updateProfile: (profileData: any) => api.put('/owner/profile', profileData),
};

// Property API calls
export const propertyAPI = {
  getAllProperties: () => api.get('/properties'),
  getPropertyById: (id: string) => api.get(`/properties/${id}`),
  createProperty: (propertyData: any) => api.post('/owner/properties', propertyData),
  updateProperty: (id: string, propertyData: any) =>
    api.put(`/owner/properties/${id}`, propertyData),
  deleteProperty: (id: string) => api.delete(`/owner/properties/${id}`),
  getOwnerProperties: () => api.get('/owner/properties'),
};

export default api; 
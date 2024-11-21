import axios from 'axios';
import {BASE_API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_API_URL, // replace with your API base URL
});
// Add a request interceptor
api.interceptors.request.use(
  async config => {
    // Get the token from wherever it’s stored, e.g., localStorage or a React state
    const token = await AsyncStorage.getItem('user'); // or wherever you store the token

    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Check if the request requires 'multipart/form-data'
    if (config.headers['Content-Type'] !== 'multipart/form-data') {
      // Default Content-Type to 'application/json'
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  error => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  },
);

export default api;

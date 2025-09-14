// File: clinic-frontend/src/api/axiosInstance.ts

import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

// Vite exposes environment variables on the `import.meta.env` object.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Use a request interceptor to automatically add the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from your auth store
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===================================================================
// NEW: Add a response interceptor to handle 401 Unauthorized errors
// ===================================================================
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  (error) => {
    // Check if the error is a 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // The token is invalid or expired.
      // Call the logout function from your auth store to clear the user's session.
      useAuthStore.getState().logout();
      // Optional: You could redirect the user to the login page here
      // window.location.href = '/login';
    }
    // Return the error so it can be caught by the component's .catch() block
    return Promise.reject(error);
  }
);


export default axiosInstance;
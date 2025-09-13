// File: clinic-frontend/src/api/axiosInstance.ts

import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

// Vite exposes environment variables on the `import.meta.env` object.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://clinic-project-53n7.onrender.com';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Use an interceptor to automatically add the token to every request
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

export default axiosInstance;
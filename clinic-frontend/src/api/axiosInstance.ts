// File: clinic-frontend/src/api/axiosInstance.ts

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Your FastAPI backend URL
});

// We can add interceptors here later to automatically add the auth token to requests

export default axiosInstance;
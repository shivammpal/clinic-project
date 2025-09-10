// File: clinic-frontend/src/api/axiosInstance.ts

import axios from 'axios';

// Vite exposes environment variables on the `import.meta.env` object.
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  // This is a safety check to ensure the app doesn't run without the backend address.
  throw new Error("VITE_API_BASE_URL is not defined. Please check your .env file.");
}

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
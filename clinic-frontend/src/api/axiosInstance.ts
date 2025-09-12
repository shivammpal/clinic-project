// File: clinic-frontend/src/api/axiosInstance.ts

import axios from 'axios';

// Vite exposes environment variables on the `import.meta.env` object.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
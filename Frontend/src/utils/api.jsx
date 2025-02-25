import axios from "axios";
import Cookies from "js-cookie";
// Base API URL (Replace with your actual backend URL)
const BASE_URL = "http://localhost:8000/api"; 

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include authentication token in requests (if needed)
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Handle API response errors globally
api.interceptors.response.use(
  (response) => response, // If response is successful, just return it
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

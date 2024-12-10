import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1", // Base URL for API requests
  withCredentials: true, // Include cookies or credentials if needed
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any additional headers or configurations here
    console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("Response error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

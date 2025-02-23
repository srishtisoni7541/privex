// import axios from 'axios';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL, // Replace with your API base URL
//   timeout: 10000, // Set a timeout (optional)
//   withCredentials:true,
  
// });

// export default axiosInstance;




import axios from 'axios';

const accessToken = localStorage.getItem("accessToken");
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${accessToken}`, // ✅ Ensure token is correct
  },
  
  withCredentials: true,
});

// Remove large cookies if they cause 431 errors
axiosInstance.interceptors.request.use((config) => {
  if (document.cookie.length > 4000) {
    document.cookie = '';
    console.warn('Cookies cleared to avoid 431 error');
  }
  return config;
});

export default axiosInstance;

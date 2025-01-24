import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the response
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with a status other than 200 range
      const message = error.response.data.message || 'An error occurred';
      console.error('Error response:', error.response);
      toast.error(message);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Error request:', error.request);
      toast.error('Server is not responding');
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
      toast.error('Error in setting up the request');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

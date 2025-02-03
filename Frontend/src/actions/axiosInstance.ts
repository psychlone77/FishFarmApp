import axios from 'axios';
import { notifyError } from '../contexts/ToastContext';

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
      let message = error.response.data.message || 'An unknown error has occurred';
      if (message.length > 50) {
        message = message.substring(0, 47) + '...';
      }
      console.error('This error is from axiosInstance:', error.response);
      switch (error.response.status) {
        case 400:
          notifyError('Bad Request: ' + message);
          break;
        case 401:
          notifyError('Unauthorized: ' + message);
          break;
        case 403:
          notifyError('Forbidden: ' + message);
          break;
        case 404:
          notifyError('Not Found: ' + message);
          break;
        case 500:
          notifyError('Internal Server Error');
          break;
        default:
          notifyError('An Unknow Error has occured: ' + message);
          break;
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Error request:', error.request);
      notifyError('Server is not responding');
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
      notifyError('Error in setting up the request');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

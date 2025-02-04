import axios from 'axios'
import { notifyError } from '../contexts/ToastContext'
import { useNavigate } from 'react-router'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error.response) {
      let message = error.response.data.message || 'An unknown error has occurred'
      if (message.length > 50) {
        message = message.substring(0, 47) + '...'
      }
      console.error('This error is from axiosInstance:', error.response)

      if (error.response.status === 401) {
        try {
          const refreshToken = localStorage.getItem('refreshToken')
          if (refreshToken) {
            const response = await axios.post(`${baseURL}/auth/refresh-token`, {
              refreshToken: refreshToken,
            })
            const newToken = response.data.accessToken
            sessionStorage.setItem('token', newToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
            error.config.headers['Authorization'] = `Bearer ${newToken}`
            return axiosInstance.request(error.config)
          } else {
            notifyError('Session expired. Please log in again.')
            window.location.href = '/app/login'
            return Promise.reject(error)
          }
        } catch (refreshError) {
          notifyError('Session expired. Please log in again.')
          return Promise.reject(refreshError)
        }
      }

      switch (error.response.status) {
        case 400:
          notifyError('Bad Request: ' + message)
          break
        case 403:
          notifyError('Forbidden: ' + message)
          break
        case 404:
          notifyError('Not Found: ' + message)
          break
        case 500:
          notifyError('Internal Server Error')
          break
        default:
          notifyError('An Unknown Error has occurred: ' + message)
          break
      }
    } else if (error.request) {
      console.error('Error request:', error.request)
      notifyError('Server is not responding')
    } else {
      console.error('Error message:', error.message)
      notifyError('Error in setting up the request')
    }
    return Promise.reject(error)
  },
)

export default axiosInstance

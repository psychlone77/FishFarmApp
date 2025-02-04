import axios, { AxiosResponse } from 'axios'
import { LoginRequest, UpdateEmail, UpdatePasswordRequest, UserDetail } from '../types/types'
import axiosInstance from './axiosInstance.ts'

export async function checkSession(): Promise<AxiosResponse> {
  const response = await axiosInstance.get('/auth/validate-token')
  return response
}

export async function getMyDetails(): Promise<UserDetail> {
  const response = await axiosInstance.get('/Auth/me')
  return response.data
}

export async function updateMyEmail(email: UpdateEmail): Promise<AxiosResponse> {
  const response = await axiosInstance.put('/auth/email', email)
  return response
}

export async function changeMyPassword(changePassword: UpdatePasswordRequest): Promise<AxiosResponse> {
  const response = await axiosInstance.put('/auth/password', changePassword)
  return response
}

// export async function refreshToken(): Promise<AxiosResponse> {
//   const response = await axios.post('/auth/refresh-token', {
//     refreshToken: localStorage.getItem('refreshToken'),
//   });
//   return response;
// }

export async function loginAction(loginRequest: LoginRequest): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/auth/login', loginRequest)
  return response
}

export async function logoutAction(): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/auth/logout')
  return response
}

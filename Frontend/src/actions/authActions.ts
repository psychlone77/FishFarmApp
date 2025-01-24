import { AxiosResponse } from 'axios'
import { LoginRequest } from '../types/types'
import axiosInstance from './axiosInstance.ts'

export async function checkSession(): Promise<AxiosResponse> {
  const response = await axiosInstance.get('/Auth/validate-token')
  return response
}

export async function loginAction(loginRequest: LoginRequest): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/auth/login', loginRequest)
  return response
}

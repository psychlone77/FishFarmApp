import axios, { AxiosResponse } from 'axios'
import { baseURL } from '.'
import { LoginRequest } from '../types/types'

export async function checkSession(): Promise<AxiosResponse> {
  const response = await axios.get(`${baseURL}/Auth/validate-token`)
  return response
}

export async function loginAction(loginRequest: LoginRequest): Promise<AxiosResponse> {
  const response = await axios.post(`${baseURL}/auth/login`, loginRequest)
  // localStorage.setItem('token', response.data.token)
  // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
  // axios.defaults.headers.get['Content-Type'] = 'application/json'
  return response
}

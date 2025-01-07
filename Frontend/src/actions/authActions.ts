import axios from 'axios'
import { baseURL } from '.'
import { LoginRequest } from '../types/types'

export async function checkSession(): Promise<any> {
  const response = await axios.get(`${baseURL}/manage/info`, {
    withCredentials: true,
  })
  return response
}

export async function login(loginRequest: LoginRequest): Promise<any> {
  const response = await axios.post(
    `${baseURL}/login?useCookies=true&useSessionCookies=true`,
    loginRequest,
    {
      withCredentials: true,
    },
  )
  return response
}

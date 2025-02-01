import { z } from 'zod'
import {
  FishFarmRequestSchema,
  FishFarmResponseSchema,
  LoginRequestSchema,
  EmployeeRequestSchema,
  EmployeeResponseSchema,
  BoatSchema,
  BoatFullResponseSchema,
  FishFarmUserSchema,
} from './schemas'
import { AxiosResponse } from 'axios'

export type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  role: string
  user: EmployeeResponse | null
  login: (data: LoginRequest) => Promise<AxiosResponse>
  logout: () => void
}

export type LoginRequest = z.infer<typeof LoginRequestSchema>
export type FishFarmResponse = z.infer<typeof FishFarmResponseSchema>
export type FishFarmRequest = z.infer<typeof FishFarmRequestSchema>
export type FishFarmUser = z.infer<typeof FishFarmUserSchema>
export type EmployeeResponse = z.infer<typeof EmployeeResponseSchema>
export type EmployeeRequest = z.infer<typeof EmployeeRequestSchema>
export type Boat = z.infer<typeof BoatSchema>
export type BoatFull = z.infer<typeof BoatFullResponseSchema>

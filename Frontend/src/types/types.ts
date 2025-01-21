import { z } from 'zod'
import {
  FishFarmRequestSchema,
  FishFarmResponseSchema,
  LoginRequestSchema,
  EmployeeRequestSchema,
  EmployeeResponseSchema,
} from './schemas'

export type LoginRequest = z.infer<typeof LoginRequestSchema>
export type FishFarmResponse = z.infer<typeof FishFarmResponseSchema>
export type FishFarmRequest = z.infer<typeof FishFarmRequestSchema>
export type EmployeeResponse = z.infer<typeof EmployeeResponseSchema>
export type EmployeeRequest = z.infer<typeof EmployeeRequestSchema>

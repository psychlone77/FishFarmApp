import { z } from 'zod'
import {
  FishFarmRequestSchema,
  FishFarmResponseSchema,
  LoginRequestSchema,
  WorkerRequestSchema,
  WorkerResponseSchema,
} from './schemas'

export type LoginRequest = z.infer<typeof LoginRequestSchema>
export type FishFarmResponse = z.infer<typeof FishFarmResponseSchema>
export type FishFarmRequest = z.infer<typeof FishFarmRequestSchema>
export type WorkerResponse = z.infer<typeof WorkerResponseSchema>
export type WorkerRequest = z.infer<typeof WorkerRequestSchema>

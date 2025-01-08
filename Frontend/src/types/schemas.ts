import { z } from 'zod'

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const FishFarmResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  cageCount: z.number().positive(),
  hasBarge: z.boolean(),
  imageURL: z.string().url(),
  createdOn: z.date(),
})

export const FishFarmRequestSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  cageCount: z.number().positive(),
  hasBarge: z.boolean(),
  imageURL: z.string().url(),
})

export const WorkerPositionEnum = z.enum(['CEO', 'Captain', 'Worker'])

export const WorkerResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().positive(),
  email: z.string().email(),
  imageURL: z.string().url().optional(),
  workerPosition: WorkerPositionEnum,
  certifiedUntil: z.date(),
})

export const WorkerRequestSchema = z.object({
  name: z.string(),
  age: z.number().positive(),
  email: z.string().email(),
  imageURL: z.string().url().optional(),
  workerPosition: WorkerPositionEnum,
  certifiedUntil: z.date(),
})

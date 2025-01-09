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
  name: z.string().min(3),
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
  imageURL: z.union([z.string().url().optional(), z.literal("")]),
  workerPosition: WorkerPositionEnum,
  certifiedUntil: z.date(),
})

export const WorkerRequestSchema = z.object({
  name: z.string().min(3),
  age: z.number().positive(),
  email: z.string().email(),
  imageURL: z.union([z.string().url().optional(), z.literal("")]),
  workerPosition: WorkerPositionEnum,
  certifiedUntil: z.date(),
})

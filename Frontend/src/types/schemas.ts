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
  imageFile: z.instanceof(File, { message: 'An image is required' }).optional(),
})

export const FishFarmUserSchema = z.object({
  fishFarmId: z.string().uuid(),
  userId: z.string().uuid(),
  permissionLevel: z.string(),
  assignedDate: z.date(),
  fishFarm: FishFarmResponseSchema,
})

export const EmployeeResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().positive(),
  email: z.string().email(),
  imageURL: z.union([z.string().url().optional(), z.literal('')]),
  employeePosition: z.string(),
  certifiedUntil: z.date(),
})

export const EmployeeRequestSchema = z.object({
  name: z.string().min(3),
  age: z.number().positive(),
  email: z.string().email(),
  imageFile: z.instanceof(File).optional(),
  employeePosition: z.string(),
  certifiedUntil: z.date(),
  password: z.string().optional(),
})

export const BoatSchema = z.object({
  id: z.string().nonempty('Boat ID is required'),
  model: z.string().nonempty('Boat model is required'),
  boatType: z.string().nonempty('Boat type is required'),
  latitude: z.number(),
  longitude: z.number(),
})

export const BoatFullResponseSchema = BoatSchema.extend({
  fishFarm: FishFarmResponseSchema,
})

export const UserDetailSchema = z.object({
  email: z.string().email(),
  role: z.string(),
  user: EmployeeResponseSchema,
})

export const UpdateEmailRequestSchema = z.object({
  email: z.string().email(),
})

export const UpdatePasswordRequestSchema = z
  .object({
    oldPassword: z.string().nonempty('Old password is required'),
    newPassword: z.string().nonempty('New password is required'),
    confirmPassword: z.string().nonempty('Confirm password is required'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

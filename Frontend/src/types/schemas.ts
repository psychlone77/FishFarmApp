import {z } from 'zod';

export const FishFarmResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    cageCount: z.number().positive(),
    hasBarge: z.boolean(),
    imageURL: z.string().url(),
    createdOn: z.date(),
});

export const FishFarmRequestSchema = z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    cageCount: z.number().positive(),
    hasBarge: z.boolean(),
    imageURL: z.string().url(),
});
import { z } from "zod";
import { FishFarmRequestSchema, FishFarmResponseSchema } from "./schemas";

export type FishFarmResponse = z.infer<typeof FishFarmResponseSchema>;
export type FishFarmRequest = z.infer<typeof FishFarmRequestSchema>;
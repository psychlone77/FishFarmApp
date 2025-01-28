import { Boat } from "../types/types.ts"
import axiosInstance from "./axiosInstance.ts"

export async function getBoats(fishFarmId: string): Promise<Boat[]> {
  const response = await axiosInstance.get(`/FishFarms/${fishFarmId}/boats`)
  return response.data
}

export async function createBoat(boat: Boat, fishFarmId: string): Promise<void> {
  await axiosInstance.post(`/FishFarms/${fishFarmId}/boats`, boat)
}

export async function updateBoat(boat: Boat, boatId: string, fishFarmId: string): Promise<void> {
  await axiosInstance.put(`/FishFarms/${fishFarmId}/boats/${boatId}`, boat)
}
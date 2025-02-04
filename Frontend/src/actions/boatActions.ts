import { Boat, BoatFull } from '../types/types.ts'
import axiosInstance from './axiosInstance.ts'

export async function getBoats(fishFarmId: string): Promise<Boat[]> {
  const response = await axiosInstance.get(`/Boat/fishfarm/${fishFarmId}/`)
  return response.data
}

export async function getAllBoats(): Promise<BoatFull[]> {
  const response = await axiosInstance.get(`/Boat/all`)
  return response.data
}

export async function getBoatTypes(): Promise<string[]> {
  const response = await axiosInstance.get(`/Boat/types`)
  return response.data
}

export async function createBoat(boat: Boat, fishFarmId: string): Promise<void> {
  await axiosInstance.post(`/Boat/fishfarm/${fishFarmId}`, boat)
}

export async function updateBoat(boat: Boat, boatId: string, fishFarmId: string): Promise<void> {
  await axiosInstance.put(`/Boat/fishfarm/${fishFarmId}/${boatId}`, boat)
}

export async function reassignBoat(
  boatId: string,
  fishFarmId: string,
  newFishFarmId: string,
): Promise<void> {
  await axiosInstance.post(`/Boat/fishfarm/${fishFarmId}/${boatId}/reassign/${newFishFarmId}`)
}

import axiosInstance from './axiosInstance.ts'
import { FishFarmRequest, FishFarmResponse } from '../types/types'

export async function getFishFarms(): Promise<FishFarmResponse[]> {
  const response = await axiosInstance.get(`/FishFarms`)
  return response.data
}

export async function getFishFarm(id: string): Promise<FishFarmResponse> {
  const response = await axiosInstance.get(`/FishFarms/${id}`)
  return response.data
}

export async function createFishFarm(fishFarm: FishFarmRequest): Promise<FishFarmResponse> {
  const response = await axiosInstance.post(`/FishFarms`, fishFarm)
  return response.data
}

export async function updateFishFarm(
  fishFarm: FishFarmRequest,
  fishFarmId: string,
): Promise<FishFarmResponse> {
  const response = await axiosInstance.put(`/FishFarms/${fishFarmId}`, fishFarm, {
    withCredentials: true,
  })
  return response.data
}

export async function deleteFishFarm(fishFarmId: string): Promise<void> {
  await axiosInstance.delete(`/FishFarms/${fishFarmId}`, {
    withCredentials: true,
  })
}

import axios from 'axios'
import { baseURL } from '.'
import { FishFarmRequest, FishFarmResponse } from '../types/types'

export async function getFishFarms(): Promise<FishFarmResponse[]> {
  const response = await axios.get(`https://localhost:7064/api/FishFarms`)
  return response.data
}

export async function getFishFarm(id: string): Promise<FishFarmResponse> {
  const response = await axios.get(`${baseURL}/FishFarms/${id}`)
  return response.data
}

export async function createFishFarm(fishFarm: FishFarmRequest): Promise<FishFarmResponse> {
  const response = await axios.post(`${baseURL}/FishFarms`, fishFarm)
  return response.data
}

export async function updateFishFarm(
  fishFarm: FishFarmRequest,
  fishFarmId: string,
): Promise<FishFarmResponse> {
  const response = await axios.put(`${baseURL}/FishFarms/${fishFarmId}`, fishFarm, {
    withCredentials: true,
  })
  return response.data
}

export async function deleteFishFarm(fishFarmId: string): Promise<void> {
  await axios.delete(`${baseURL}/FishFarms/${fishFarmId}`, {
    withCredentials: true,
  })
}

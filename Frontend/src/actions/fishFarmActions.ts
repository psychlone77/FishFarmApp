import axios from 'axios'
import { baseURL } from '.'
import { FishFarmResponse } from '../types/types'

export async function getFishFarms(): Promise<FishFarmResponse[]> {
  const response = await axios.get(`${baseURL}/FishFarms`, {
    withCredentials: true,
  })
  return response.data
}

export async function getFishFarm(id: string): Promise<FishFarmResponse> {
  const response = await axios.get(`${baseURL}/FishFarms/${id}`, {
    withCredentials: true,
  })
  return response.data
}

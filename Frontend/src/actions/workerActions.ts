import axios from 'axios'
import { baseURL } from '.'
import { WorkerResponse } from '../types/types'

export default async function getWorkers(fishFarmId: string): Promise<WorkerResponse[]> {
  const response = await axios.get(`${baseURL}/FishFarms/${fishFarmId}/workers`, {
    withCredentials: true,
  })
  return response.data
}

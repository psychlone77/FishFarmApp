import axios from 'axios'
import { baseURL } from '.'
import { WorkerRequest, WorkerResponse } from '../types/types'

export default async function getWorkers(fishFarmId: string): Promise<WorkerResponse[]> {
  const response = await axios.get(`${baseURL}/FishFarms/${fishFarmId}/workers`, {
    withCredentials: true,
  })
  return response.data
}

export async function getWorker(fishFarmId: string, workerId: string): Promise<WorkerResponse> {
  const response = await axios.get(`${baseURL}/FishFarms/${fishFarmId}/workers/${workerId}`, {
    withCredentials: true,
  })
  return response.data
}

export async function createWorker(worker: WorkerRequest, fishFarmId: string): Promise<WorkerResponse> {
  const response = await axios.post(`${baseURL}/FishFarms/${fishFarmId}/workers`, worker, {
    withCredentials: true,
  })
  return response.data
}

export async function updateWorker(worker: WorkerRequest, workerId: string, fishFarmId: string): Promise<WorkerResponse> {
  const response = await axios.put(`${baseURL}/FishFarms/${fishFarmId}/workers/${workerId}`, worker, {
    withCredentials: true,
  })
  return response.data
}

export async function deleteWorker(workerId: string, fishFarmId: string): Promise<void> {
  await axios.delete(`${baseURL}/FishFarms/${fishFarmId}/workers/${workerId}`, {
    withCredentials: true,
  })
}

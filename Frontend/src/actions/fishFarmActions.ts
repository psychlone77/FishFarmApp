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
  const formData = new FormData();
  formData.append('Name', fishFarm.name);
  formData.append('Latitude', fishFarm.latitude.toString());
  formData.append('Longitude', fishFarm.longitude.toString());
  formData.append('CageCount', fishFarm.cageCount.toString());
  if (fishFarm.imageFile) {
    formData.append('Image', fishFarm.imageFile);
  }

  const response = await axiosInstance.post('/FishFarms', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function updateFishFarm(
  fishFarm: FishFarmRequest,
  fishFarmId: string,
): Promise<FishFarmResponse> {
  const formData = new FormData();
  formData.append('Name', fishFarm.name);
  formData.append('Latitude', fishFarm.latitude.toString());
  formData.append('Longitude', fishFarm.longitude.toString());
  formData.append('CageCount', fishFarm.cageCount.toString());
  if (fishFarm.imageFile) {
    formData.append('Image', fishFarm.imageFile);
  }

  const response = await axiosInstance.put(`/FishFarms/${fishFarmId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function deleteFishFarm(fishFarmId: string): Promise<void> {
  await axiosInstance.delete(`/FishFarms/${fishFarmId}`, {
    withCredentials: true,
  })
}

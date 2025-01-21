import axios from 'axios'
import { baseURL } from '.'
import { EmployeeRequest, EmployeeResponse } from '../types/types'

export default async function getEmployees(fishFarmId: string): Promise<EmployeeResponse[]> {
  const response = await axios.get(`${baseURL}/FishFarms/${fishFarmId}/employees`)
  return response.data
}

export async function getEmployee(fishFarmId: string, employeeId: string): Promise<EmployeeResponse> {
  const response = await axios.get(`${baseURL}/FishFarms/${fishFarmId}/employees/${employeeId}`, {
    withCredentials: true,
  })
  return response.data
}

export async function createEmployee(
  employee: EmployeeRequest,
  fishFarmId: string,
): Promise<EmployeeResponse> {
  const response = await axios.post(`${baseURL}/FishFarms/${fishFarmId}/employees`, employee, {
    withCredentials: true,
  })
  return response.data
}

export async function updateEmployee(
  employee: EmployeeRequest,
  employeeId: string,
  fishFarmId: string,
): Promise<EmployeeResponse> {
  const response = await axios.put(
    `${baseURL}/FishFarms/${fishFarmId}/employees/${employeeId}`,
    employee,
    {
      withCredentials: true,
    },
  )
  return response.data
}

export async function deleteEmployee(employeeId: string, fishFarmId: string): Promise<void> {
  await axios.delete(`${baseURL}/FishFarms/${fishFarmId}/employees/${employeeId}`, {
    withCredentials: true,
  })
}

import axiosInstance from './axiosInstance.ts'
import { EmployeeRequest, EmployeeResponse } from '../types/types'

export default async function getEmployees(fishFarmId: string): Promise<EmployeeResponse[]> {
  const response = await axiosInstance.get(`/FishFarms/${fishFarmId}/employees`)
  return response.data
}

export async function getEmployee(
  fishFarmId: string,
  employeeId: string,
): Promise<EmployeeResponse> {
  const response = await axiosInstance.get(`/FishFarms/${fishFarmId}/employees/${employeeId}`, {
    withCredentials: true,
  })
  return response.data
}

export async function createEmployee(
  employee: EmployeeRequest,
  fishFarmId: string,
): Promise<EmployeeResponse> {
  const response = await axiosInstance.post(`Auth/employee/register`, employee, {
    withCredentials: true,
  })
  return response.data
}

export async function updateEmployee(
  employee: EmployeeRequest,
  employeeId: string,
  fishFarmId: string,
): Promise<EmployeeResponse> {
  const response = await axiosInstance.put(
    `/FishFarms/${fishFarmId}/employees/${employeeId}`,
    employee,
    {
      withCredentials: true,
    },
  )
  return response.data
}

export async function deleteEmployee(employeeId: string, fishFarmId: string): Promise<void> {
  await axiosInstance.delete(`/FishFarms/${fishFarmId}/employees/${employeeId}`)
}

export async function getUnassignedEmployees(fishFarmId: string): Promise<EmployeeResponse[]> {
  const response = await axiosInstance.get(`/FishFarms/${fishFarmId}/employees/unassigned`)
  return response.data
}

export async function assignEmployee(
  fishFarmId: string,
  employeeId: string,
): Promise<EmployeeResponse> {
  const response = await axiosInstance.post(
    `/FishFarms/${fishFarmId}/employees/assign/${employeeId}`
  )
  return response.data
}

export async function unassignEmployee(
  fishFarmId: string,
  employeeId: string,
): Promise<EmployeeResponse> {
  const response = await axiosInstance.post(
    `/FishFarms/${fishFarmId}/employees/unassign/${employeeId}`
  )
  return response.data
}
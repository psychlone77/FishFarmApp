import axiosInstance from './axiosInstance.ts'
import { EmployeeRequest, EmployeeResponse, FishFarmUser } from '../types/types'

export async function getEmployees(): Promise<EmployeeResponse[]> {
  const response = await axiosInstance.get('Employee/all')
  return response.data
}

export default async function getEmployeesByFishFarm(
  fishFarmId: string,
): Promise<EmployeeResponse[]> {
  const response = await axiosInstance.get(`Employee/FishFarm/${fishFarmId}`)
  return response.data
}

export async function getEmployee(employeeId: string): Promise<EmployeeResponse> {
  const response = await axiosInstance.get(`Employee/${employeeId}`, {
    withCredentials: true,
  })
  return response.data
}

export async function createEmployee(employee: EmployeeRequest): Promise<EmployeeResponse> {
  if (!employee.password) {
    throw new Error('Password is required')
  }
  const formData = new FormData()
  formData.append('Name', employee.name)
  formData.append('Age', employee.age.toString())
  formData.append('Email', employee.email)
  formData.append('EmployeePosition', employee.employeePosition)
  formData.append('CertifiedUntil', employee.certifiedUntil.toISOString())
  formData.append('Password', employee.password)
  if (employee.imageFile) {
    formData.append('Image', employee.imageFile)
  }
  const response = await axiosInstance.post(`Auth/employee/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export async function updateEmployee(
  employee: EmployeeRequest,
  employeeId: string,
): Promise<EmployeeResponse> {
  const formData = new FormData()
  formData.append('Name', employee.name)
  formData.append('Age', employee.age.toString())
  formData.append('Email', employee.email)
  formData.append('EmployeePosition', employee.employeePosition)
  formData.append('CertifiedUntil', employee.certifiedUntil.toISOString())
  if (employee.imageFile) {
    formData.append('Image', employee.imageFile)
  }
  const response = await axiosInstance.put(`Employee/${employeeId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })
  return response.data
}

export async function deleteEmployee(employeeId: string): Promise<void> {
  await axiosInstance.delete(`Employee/${employeeId}`)
}

export async function getEmployeePositions(): Promise<string[]> {
  const response = await axiosInstance.get('Employee/positions')
  return response.data
}

export async function getUnassignedEmployees(fishFarmId: string): Promise<EmployeeResponse[]> {
  const response = await axiosInstance.get(`Employee/FishFarm/${fishFarmId}/unassigned`)
  return response.data
}

export async function assignEmployee(
  fishFarmId: string,
  employeeId: string,
): Promise<EmployeeResponse> {
  const response = await axiosInstance.post(`Employee/FishFarm/${fishFarmId}/assign/${employeeId}`)
  return response.data
}

export async function unassignEmployee(
  fishFarmId: string,
  employeeId: string,
): Promise<EmployeeResponse> {
  const response = await axiosInstance.post(
    `Employee/FishFarm/${fishFarmId}/unassign/${employeeId}`,
  )
  return response.data
}

export async function getFishFarmsByEmployee(employeeId: string): Promise<FishFarmUser[]> {
  const response = await axiosInstance.get(`Employee/${employeeId}/fishfarms`)
  return response.data
}

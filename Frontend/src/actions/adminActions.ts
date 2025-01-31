import { EmployeeResponse } from "../types/types.ts";
import axiosInstance from "./axiosInstance.ts";

export async function getAdmins(fishFarmId: string) : Promise<EmployeeResponse[]> {
    const response = await axiosInstance.get(`/Admin/${fishFarmId}`);
    return response.data;
}

export async function assignAdmin(fishFarmId: string, adminId: string) : Promise<void> {
    await axiosInstance.post(`/Admin/${fishFarmId}/assign/${adminId}`);
}

export async function getUnassignedAdmins(fishFarmId: string) : Promise<EmployeeResponse[]> {
    const response = await axiosInstance.get(`/Admin/${fishFarmId}/unassigned`);
    return response.data;
}

export async function unassignAdmin(fishFarmId: string, adminId: string) : Promise<void> {
    await axiosInstance.post(`/Admin/${fishFarmId}/unassign/${adminId}`);
}
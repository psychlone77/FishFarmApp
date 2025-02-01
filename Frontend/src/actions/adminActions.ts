import { EmployeeRequest, EmployeeResponse } from "../types/types.ts";
import axiosInstance from "./axiosInstance.ts";

export async function getAllAdmins() : Promise<EmployeeResponse[]> {
    const response = await axiosInstance.get('/Admin/all');
    return response.data;
}

export async function getAdmins(fishFarmId: string) : Promise<EmployeeResponse[]> {
    const response = await axiosInstance.get(`/Admin/fishfarms/${fishFarmId}`);
    return response.data;
}

export async function createAdmin(admin: EmployeeRequest): Promise<EmployeeResponse> {
    if (!admin.password) {
        throw new Error('Password is required');
    }
    const formData = new FormData();
    formData.append('Name', admin.name);
    formData.append('Age', admin.age.toString());
    formData.append('Email', admin.email);
    formData.append('EmployeePosition', admin.employeePosition);
    formData.append('CertifiedUntil', admin.certifiedUntil.toISOString());
    formData.append('Password', admin.password);
    if (admin.imageFile) {
        formData.append('Image', admin.imageFile);
    }
    const response = await axiosInstance.post('Auth/admin/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export async function assignAdmin(fishFarmId: string, adminId: string) : Promise<void> {
    await axiosInstance.post(`/Admin/fishfarms/${fishFarmId}/assign/${adminId}`);
}

export async function getUnassignedAdmins(fishFarmId: string) : Promise<EmployeeResponse[]> {
    const response = await axiosInstance.get(`/Admin/fishfarms/${fishFarmId}/unassigned`);
    return response.data;
}

export async function unassignAdmin(fishFarmId: string, adminId: string) : Promise<void> {
    await axiosInstance.post(`/Admin/fishfarms/${fishFarmId}/unassign/${adminId}`);
}
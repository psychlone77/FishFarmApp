import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export async function getFishFarms() {
    const response = await axios.get(`${baseURL}/FishFarms`);
    return response.data;
}
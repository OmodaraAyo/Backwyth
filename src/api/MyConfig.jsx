import axios from 'axios';
import { getAuthToken } from '../Utils/Token';

const url = import.meta.env.VITE_APP_BACKWYTH_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    // timeout: 10000,
})

export const handleError = (error) =>{
    if(error?.response?.data) throw error.response.data;
    throw error;
}

axiosInstance.interceptors.request.use((config)=> {
    const token = getAuthToken();
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`
    }

    return config;
});
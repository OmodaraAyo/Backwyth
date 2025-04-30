import axios from 'axios';

const url = import.meta.env.VITE_APP_BACKWYTH_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
})

export const handleError = (error) =>{
    if(error?.response?.data) throw error.response.data;
    throw error;
}
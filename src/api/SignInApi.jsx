import { axiosInstance, handleError } from "./MyConfig"

export const SignInApi = async (payload)=> {
    try{
        const response = await axiosInstance.post('/company/login', payload)
        const token  = response?.data?.data?.x_y_z
        localStorage.setItem('token', token)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return response
    }catch(error){
        handleError(error)
    }
}
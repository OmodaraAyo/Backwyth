import { axiosInstance, handleError } from "./MyConfig"

export const SignInApi = async (payload)=> {
    try{
        const response = await axiosInstance.post('/company/login', payload)
        const token  = response?.data?.data?.x_y_z
        const ref = response?.data?.data?.ref
        console.log("from sign in: api ", response)
        localStorage.setItem('token', token)
        localStorage.setItem('ref', ref)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return response
    }catch(error){
        handleError(error)
    }
}
import { axiosInstance, handleError } from "./MyConfig"

export const SignInApi = async (payload)=> {
    try{
        const response = await axiosInstance.post('/company/login', payload)
        return response
    }catch(error){
        handleError(error)
    }
}
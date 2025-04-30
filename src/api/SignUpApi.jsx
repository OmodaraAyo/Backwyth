import { axiosInstance, handleError } from "./MyConfig"

export const SignUpApi = async(payload)=>{
    try{
        const response = await axiosInstance.post('/company/register', payload)
        console.log("From sign-up", response)
        return response.data
    }catch(error){
        handleError(error)
    }
}
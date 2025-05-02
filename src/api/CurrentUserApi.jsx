import { axiosInstance, handleError } from "./MyConfig"

export const CurrentUserApi = () => {
    try {
        const response = axiosInstance.get('/company/admin')
        console.log("from fetching current user:  "+response)
        return response      
    } catch (error) {
        handleError(error)
    }
}
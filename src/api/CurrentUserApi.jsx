import { axiosInstance, handleError } from "./MyConfig"

export const CurrentUserApi = () => {
    try {
        const response = axiosInstance.get('/company/admin')
        return response      
    } catch (error) {
        handleError(error)
    }
}
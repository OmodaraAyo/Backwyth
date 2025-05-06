import { axiosInstance, handleError } from "./MyConfig"

export const CurrentUserApi = () => {
    try {
        const companyId = localStorage.getItem('ref')
        const response = axiosInstance.get(`/company/${companyId}`)
        return response      
    } catch (error) {
        handleError(error)
    }
}
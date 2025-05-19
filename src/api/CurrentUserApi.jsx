import { axiosInstance, handleError } from "./MyConfig"

export const CurrentUserApi = async () => {
    try {
        const companyId = localStorage.getItem('ref')
        const response =  await axiosInstance.get(`/company/${companyId}`)
        return response      
    } catch (error) {
        handleError(error)
    }
}
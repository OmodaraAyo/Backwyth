import { companyId } from "../reusables/Ref"
import { axiosInstance, handleError } from "./MyConfig"

export const CurrentUserApi = () => {
    try {
        const response = axiosInstance.get(`/company/${companyId}`)
        return response      
    } catch (error) {
        handleError(error)
    }
}
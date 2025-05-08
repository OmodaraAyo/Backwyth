import { companyId } from "../reusables/Ref"
import { axiosInstance, handleError } from "./MyConfig"

export const UpdateDetailsApi = async( payload ) =>{
    try {
        const response = await axiosInstance.patch(`/company/${companyId}`, payload)
        console.log(response)
        return response
    } catch (error) {
        handleError(error)
    }
}
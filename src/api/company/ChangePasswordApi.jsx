import { companyId } from "../../reusables/Ref"
import { axiosInstance, handleError } from "../MyConfig"

export const ChangePasswordApi = async ( payload ) => {
    try {
         const response = await axiosInstance.patch(`/company/${companyId}/password-reset`, payload)
         return response
    } catch (error) {
        handleError(error)
    }
}
import { companyId } from "../reusables/Ref"
import { axiosInstance, handleError } from "./MyConfig"

export const AddMenuApi = async ( payload ) => {
    try {
        const response = await axiosInstance.post(`/company/${companyId}/menus/addOption`, payload)
        return response;
    } catch (error) {
        handleError(error)
        
    }
}
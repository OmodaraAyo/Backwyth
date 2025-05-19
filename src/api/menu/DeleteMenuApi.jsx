import { companyId } from "../../reusables/Ref"
import { axiosInstance, handleError } from "../MyConfig"

export const deleteMenuApi = async ( optionId ) => {
    try { 
        const response = await axiosInstance.delete(`/company/${companyId}/menus/options/${optionId}`);
        return response;    
    } catch (error) {
        handleError(error)
    }
}
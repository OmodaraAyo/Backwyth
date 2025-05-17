
import { companyId } from "../../reusables/Ref";
import { axiosInstance, handleError } from "../MyConfig";

export const UpdateMenuApi = async ( optionId, payload ) => {
  try {
    const response = await axiosInstance.patch(`/company/${companyId}/menus/options/${optionId}`,payload);
    return response;
  } catch (error) {
    handleError(error);
  }
};

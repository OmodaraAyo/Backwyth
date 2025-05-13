import { CurrentUserApi } from "../api/CurrentUserApi";
import { axiosInstance } from "../api/MyConfig";
import { setUserDetails } from "../store/userSlice";

export const fetchUserDetails = async (dispatch, navigateTo, page) => {
  try {
    const response = await CurrentUserApi();
    if (response?.status === 200) {
      dispatch(setUserDetails(response?.data?.data));
    }
  } catch (error) {
    localStorage.removeItem("token");
    axiosInstance.defaults.headers.common["Authorization"] = null;
    navigateTo(page);
    // console.error("Error fetching current user details: ", error);
  }
};

import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import Context from "../context";
import { clearAuthToken, getAuthToken } from "../Utils/Token";
import { setUserDetails } from "../store/userSlice";
import { PageLoader } from "../Utils/PageLoader";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { fetchCurrentUserDetails } = useContext(Context);

    useEffect(() => {
        const token = getAuthToken();

        if(!user && token){
            fetchCurrentUserDetails().then((response) => {
                if(response.status === 200) {
                    dispatch(setUserDetails(response?.data?.data));
                } else {
                    clearAuthToken();
                    navigate("/auth");
                }
            }).catch(()=> {
                clearAuthToken();
                navigate("/");
            })
        } else if (!token) {
            navigate(window.location.pathname)
        }
    }, [user]);

    if(!user){
        return <PageLoader/>
    }

    return children
}

export default ProtectedRoute;
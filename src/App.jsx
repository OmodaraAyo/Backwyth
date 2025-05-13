import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "./components/Footer";
import { Slide, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { CurrentUserApi } from "./api/CurrentUserApi";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import { axiosInstance } from "./api/MyConfig";
import AuthPage from "./pages/AuthPage";
import { clearAuthToken, getAuthToken } from "./Utils/Token";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const fetchCurrentUserDetails = async () => {
    try {
      const response = await CurrentUserApi();
      console.log("Current User Details: ", response);
      if(response?.status === 200) {
        dispatch(setUserDetails(response?.data?.data));
      }
    } catch (error) {
      clearAuthToken();
      axiosInstance.defaults.headers.common['Authorization'] = null;
      navigate('/auth');
      console.error("Error fetching current user details: ", error);
    }
  };

  useEffect(() => {
    
    const token = getAuthToken();
    if(token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchCurrentUserDetails();
    }else{
      navigate('/');
    }

  }, []);

  return (
    <>
      <Context.Provider value={{ fetchCurrentUserDetails }}>
        <ToastContainer
          position="top-center"
          autoClose={7000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
          transition={Slide}
          toastStyle={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "#07020D",
            color: "#fff",
          }}
          bodyStyle={{ fontSize: "16px", fontWeight: "500" }}
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet location={backgroundLocation || location}/>
          {backgroundLocation && <AuthPage/>}
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;

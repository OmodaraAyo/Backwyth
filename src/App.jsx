import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "./components/Footer";
import { Slide, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Context from "./context";
import { axiosInstance } from "./api/MyConfig";
import AuthPage from "./pages/AuthPage";
import { fetchUserDetails } from "./Utils/FetchCurrentUserDetails";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const fetchCurrentUserDetails = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserDetails(dispatch, navigate, "/auth");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchCurrentUserDetails();
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
          <Outlet location={backgroundLocation || location} />
          {backgroundLocation && <AuthPage />}
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;

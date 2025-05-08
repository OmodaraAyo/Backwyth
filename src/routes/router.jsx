import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import AboutUs from "../pages/AboutUs";
import FAQs from "../pages/FAQs";
import Documentation from "../pages/Documentation";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import AuthPage from "../pages/AuthPage";
import Profile from "../pages/Profile";
import NewMenu from "../pages/NewMenu";
import Feedback from "../pages/Feedback";
import Notification from "../pages/Notification";
import Support from "../pages/Support";
import Settings from "../pages/Settings";
import UpdateDetails from "../pages/UpdateDetails";

const ROUTES = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "", 
                element: <LandingPage/> 
            },
            {
                path: "pricing", 
                element: <Pricing/> 
            },
            { path: "about-us", element: <AboutUs/> 

            },
            {
                path: "faqs", 
                element: <FAQs/> 
            },
            {
                path: "documentation",
                element: <Documentation/> 
            },
            {
                path: "auth", 
                element: <AuthPage/> 
            },
            {
                path: "dashboard",
                element: <Dashboard/>,
                children: [
                    {
                        path: "",
                        element: <Navigate to="profile" replace />
                    }
                    ,
                    {
                        path: "profile",
                        element: <Profile/>,
                        children: [
                            {
                                path: "edit",
                                element: <UpdateDetails/>
                            }
                        ]
                    },
                    {
                        path: "add-menu",
                        element: <NewMenu/>,
                    },
                    {
                        path: "feedback",
                        element: <Feedback/>,
                    },
                    {
                        path: "notifications",
                        element: <Notification/>,
                    },
                    {
                        path: "support",
                        element: <Support/>,
                    },
                    {
                        path: "settings",
                        element: <Settings/>,
                    },
                ]
            },
        ]
    },
])
export default ROUTES;
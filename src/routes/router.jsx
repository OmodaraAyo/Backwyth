import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/navbar/LandingPage";
import Pricing from "../pages/navbar/Pricing";
import AboutUs from "../pages/navbar/AboutUs";
import FAQs from "../pages/navbar/FAQs";
import Documentation from "../pages/navbar/Documentation";
import AuthPage from "../pages/authentication/AuthPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/navbar/Dashboard";
import Profile from "../pages/dashboard/Profile"
import UpdateDetails from "../pages/dashboard/UpdateDetails";
import Menu from "../pages/Menu/Menu"
import AddNewMenu from "../pages/Menu/AddNewMenu";
import UpdateMenu from "../pages/Menu/UpdateMenu";
import Feedback from "../pages/dashboard/Feedback";
import Notification from "../pages/dashboard/Notification"
import Support from "../pages/dashboard/Support"
import Settings from "../pages/dashboard/Settings"
import ChangePassword from "../pages/dashboard/ChangePassword";


const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      { path: "about-us", element: <AboutUs /> },
      {
        path: "faqs",
        element: <FAQs />,
      },
      {
        path: "documentation",
        element: <Documentation />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="profile" replace />,
          },
          {
            path: "profile",
            element: <Profile />,
            children: [
              {
                path: "edit",
                element: <UpdateDetails />,
              },
            ],
          },
          {
            path: "menus",
            element: <Menu />,
            children: [
              {
                path: "add",
                element: <AddNewMenu />,
              },
              {
                path: ":menuId/edit",
                element: <UpdateMenu />,
              },
            ],
          },
          {
            path: "feedback",
            element: <Feedback />,
          },
          {
            path: "notifications",
            element: <Notification />,
          },
          {
            path: "support",
            element: <Support />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "change-password",
            element: <ChangePassword/>
          }
        ],
      },
    ],
  },
]);
export default ROUTES;

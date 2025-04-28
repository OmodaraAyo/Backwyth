import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import AboutUs from "../pages/AboutUs";
import FAQs from "../pages/FAQs";
import Documentation from "../pages/Documentation";

const ROUTES = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "pricing",
                element: <Pricing/>
            },
            {
                path: "about-us",
                element: <AboutUs/>
            },
            {
                path: "faqs",
                element: <FAQs/>
            },
            {
                path: "documentation",
                element: <Documentation/>
            }
        ]
    }
])
export default ROUTES;
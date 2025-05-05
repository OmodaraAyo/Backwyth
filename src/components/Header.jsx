import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import images from "../assets/images";
import clsx from "clsx";
import AuthPage from "../pages/AuthPage.jsx";
import { navBarItems } from "../assets/MultiListView.jsx";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const user = useSelector((state)=> state?.user?.user);
  const filteredNavItems = user?.loggedIn ? navBarItems : navBarItems.filter(item => item.page !== "Dashboard");

  useEffect(()=> {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    
  return (
    <header className={clsx(`border-b-2 sticky top-0 z-40 transition-all duration-300 `, isScrolled && "bg-[#07020D] backdrop-blur-lg backdrop-brightness-110")}>
      <div className="container mx-auto h-full flex justify-between items-center px-4 py-3 ">
        <div>
          <Link to={"/"}>
            <img
              src={images.logo}
              alt="backwyth-logo"
              className="w-[5rem]"
            />
          </Link>
        </div>

        <nav className="hidden md:flex md:gap-2 lg:gap-16 items-center font-semibold text-md transition-all duration-300 ease-in-out">
          {filteredNavItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                clsx(
                  `px-4 py-2 rounded-lg text-center transition-all duration-300 ease-in-out ${isActive ? "" : "hover:bg-[#6315db] hover:text-white"}`,
                  isActive &&
                    "bg-white text-[#07020D] transform transition-all duration-300 ease-in-out"
                )
              }
            >
              {item.page}
            </NavLink>
          ))}
        </nav>

        <div>
            {user?.loggedIn ? (
              <LogOut cursor="pointer" className="text-red-600 hover:text-red-700 w-7 h-7"/>
            ): (
              <Link
              to="/auth"
              state={{ backgroundLocation: location }}
              className="inline-block py-1 px-5 font-semibold text-md border border-[#6315db] transform -skew-x-14 rounded hover:bg-[#6315db] cursor-pointer">
              Get Started
            </Link>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;

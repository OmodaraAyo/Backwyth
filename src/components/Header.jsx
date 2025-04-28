import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../assets/images";
import ShinyText from "./ShinyText.jsx";
import clsx from "clsx";
import Login from "../pages/Login.jsx";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSignUp, setOpenSignIn] = useState(false);

  const navBarItems = [
    { page: "Home", path: "/" },
    { page: "Pricing", path: "/pricing" },
    { page: "About Us", path: "/about-us" },
    { page: "FAQs", path: "/faqs" },
    { page: "Doc", path: "/documentation" },
  ];

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
              loading="lazy"
              className="w-[5.2rem]"
            />
          </Link>
        </div>

        <nav className="hidden md:flex md:gap-2 lg:gap-16 items-center font-semibold text-md">
          {navBarItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                clsx(
                  "px-4 py-2 rounded-lg text-center",
                  isActive &&
                    "bg-white text-[#07020D] transform transition-all duration-300 ease-in-out"
                )
              }
            >
              {item.page}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setOpenSignIn(true)}
          className="py-1 px-5 font-semibold text-md border border-purple-600 transform -skew-x-14 rounded hover:bg-purple-600 cursor-pointer">
          Get Started
        </button>
      </div>
      {openSignUp && <Login onClose={() => setOpenSignIn(false)} />}
    </header>
  );
};

export default Header;

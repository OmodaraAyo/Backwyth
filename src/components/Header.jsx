import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../assets/images";
import clsx from "clsx";
import AuthPage from "../pages/AuthPage.jsx";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthPage, setshowAuthPage] = useState(false);

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
              className="w-[5.8rem]"
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
          onClick={() => setshowAuthPage(true)}
          className="py-1 px-5 font-semibold text-md border border-[#6315db] transform -skew-x-14 rounded hover:bg-[#6315db] cursor-pointer">
          Get Started
        </button>
      </div>
      {showAuthPage && <AuthPage onClose={() => setshowAuthPage(false)} showLogin={true}/>}
    </header>
  );
};

export default Header;

import React from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../assets/images";
import ShinyText from "./ShinyText.jsx";
import clsx from "clsx";

const Header = () => {
  const navBarItems = [
    { page: "Home", path: "/" },
    { page: "Pricing", path: "/pricing" },
    { page: "About Us", path: "/about-us" },
    { page: "FAQs", path: "/faqs" },
    { page: "Doc", path: "/documentation" },
  ];
  return (
    <header className="border-b-2 ">
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

        <NavLink
          className={({ isActive }) =>
            clsx(
              "py-1 px-5 font-semibold text-md border border-purple-600 transform -skew-x-14 rounded hover:bg-purple-600",
              isActive && "bg-purple-600"
            )
          }
          to={"sign-in"}
        >
          {({ isActive }) => (
            <ShinyText
              text="Get Started"
              disabled={false}
              speed={3}
              isActive={isActive}
              className="custom-class"
            />
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default Header;

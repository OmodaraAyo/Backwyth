import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import images from "../assets/images";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { LogOut, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { dashboardChildren, navBarItems } from "../assets/MultiListView.jsx";
import { motion, AnimatePresence } from "framer-motion";
import consoleLog from "../reusables/MyConsoleLog.jsx";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);

  const filteredNavItems = user?.loggedIn
    ? navBarItems
    : navBarItems.filter((item) => item.page !== "Dashboard");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setDashboardOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDashboardDropdown = () => setDashboardOpen((prev) => !prev);

  return (
    <header
      className={clsx(
        "border-b-2 sticky top-0 z-50 transition-all duration-300",
        isScrolled && "bg-[#07020D] backdrop-blur-lg backdrop-brightness-110"
      )}
    >
      <div className="container mx-auto h-full flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            <Menu className="w-10 h-10 text-white" cursor="pointer" />
          </button>
          <Link to="/">
            <img
              src={images.logo}
              alt="logo"
              className="w-[4rem] md:w-[4.6rem]"
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
                  "px-4 py-2 rounded-lg text-center transition-all duration-300 ease-in-out",
                  isActive
                    ? "bg-white text-[#07020D]"
                    : " hover:text-white hover:-translate-y-1 hover:shadow-xl hover:bg-[#6315db]"
                )
              }
            >
              {item.page}
            </NavLink>
          ))}
        </nav>

        <div className="block">
          {user?.loggedIn ? (
            <div title="logout">
              <LogOut
                cursor="pointer"
                className="text-red-600 hover:text-red-700 w-[2.2rem] h-[3rem] md:w-[2.1rem] md:h-[2.1rem]"
              />
            </div>
          ) : (
            <Link
              to="/auth"
              state={{ backgroundLocation: location }}
              className="inline-block py-1 px-5 font-semibold text-md border border-[#6315db] -skew-x-14 rounded hover:bg-[#6315db] cursor-pointer"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-10 h-[100dvh]"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-[100dvh] w-4/5 bg-[#07020D] z-[100] shadow-lg p-6 pt-16 flex flex-col justify-center overflow-y-auto"
            >
              <button
                onClick={toggleMenu}
                className="absolute top-7 right-9 text-white"
              >
                <X className="w-6 h-6 hover:text-gray-300 cursor-pointer" />
              </button>

              <nav className="flex flex-col h-[100dvh] gap-4 font-semibold text-lg">
                {filteredNavItems.map((item, index) =>
                  item.page === "Dashboard" && user?.loggedIn ? (
                    <div key={index}>
                      <div
                        onClick={toggleDashboardDropdown}
                        className="flex items-center justify-between cursor-pointer text-white bg-[#6315db] hover:bg-[#4f10a6] p-2 rounded-lg"
                      >
                        Dashboard
                        {dashboardOpen ? (
                          <ChevronUp className="w-4 h-4 ml-2 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-300" />
                        )}
                      </div>
                      <AnimatePresence>
                        {dashboardOpen && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                              hidden: { opacity: 0, height: 0 },
                              visible: { opacity: 1, height: "auto" },
                            }}
                            transition={{
                              staggerChildren: 0.07,
                              delayChildren: 0.1,
                            }}
                            className="ml-4 mt-2 flex flex-col gap-2 max-h-40 overflow-y-auto scrollbar-custom rounded-md"
                          >
                            {dashboardChildren.map((child, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                              >
                                <NavLink
                                  to={"/dashboard" + child.path}
                                  onClick={toggleMenu}
                                  className={({ isActive }) =>
                                    clsx(
                                      "text-sm inline-block w-full h-full",
                                      isActive
                                        ? "text-white"
                                        : "text-gray-300 hover:text-[#6315db]"
                                    )
                                  }
                                >
                                  {child.page}
                                </NavLink>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      key={index}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        clsx(
                          "transition-all duration-200 p-2 rounded-lg",
                          isActive
                            ? "text-white"
                            : "text-gray-300 hover:text-white hover:bg-[#6315db]/20"
                        )
                      }
                    >
                      {item.page}
                    </NavLink>
                  )
                )}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 w-full py-2 text-center text-[0.65rem] text-gray-500 border-t border-gray-700">
                  <p>
                    © 2025{" "}
                    <span className="font-semibold text-white">Backwyth™</span>
                  </p>
                  <p>All rights reserved. Bringing everyone back with us.</p>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Login from "./Login";
import SignUp from "./SignUp";
import { useNavigate } from "react-router";

const AuthPage = () => {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <section
      id="authentication"
      className="fixed inset-0 w-full h-[100dvh] bg-black/60 z-50 flex justify-end"
    >
      <div className="flex flex-col ml-auto max-w-md bg-[#f5f3f3] w-full sm:max-w-xl h-full rounded-lg p-5 md:p-10 overflow-y-auto scrollbar-custom">
        <button
          onClick={handleClose}
          className="block ml-auto text-[#07020D] hover:text-black/100 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <IoMdClose size={32} />
        </button>

        <div className="flex-grow">
          {showLoginPage ? (
            <Login setShowLogin={setShowLoginPage} />
          ) : (
            <SignUp setShowLogin={setShowLoginPage} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthPage;

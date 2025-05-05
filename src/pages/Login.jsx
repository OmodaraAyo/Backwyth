import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { otherSignInOptions } from "../assets/MultiListView";
import { SignInApi } from "../api/SignInApi";
import { ButtonLoader } from "../Utils/Utils";
import { toast } from "react-toastify";
import Context from "../context";
import { useNavigate } from "react-router";

const Login = ({ setShowLogin }) => {
  const [data, setData] = useState({
    companyEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const { fetchCurrentUserDetails } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...data };

    try {
      setIsLoading(true);
      const response = await SignInApi(payload);
      if (response?.status === 200) {
        setIsLoading(false);
        toast.success(`${response?.data?.data?.response}`);
        fetchCurrentUserDetails();
        navigate("/dashboard");
        // setShowLogin(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("api error: ", error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <section id="login" className="h-full flex flex-col px-4 py-6">
      <div className="flex-grow">
        <h1 className="text-[#07020D] font-semibold text-2xl">Sign In</h1>
        <p className="text-[#838282] font-normal text-md mt-2">
          Enter your email and password to login to your account.
        </p>

        <form className="grid grid-cols-1 gap-5 mt-10" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative rounded-lg bg-white border border-gray-300 focus-within:border-[#6315db] focus-within:ring-2 focus-within:ring-[#6315db]/30 focus-within:shadow-md transition-all duration-300">
            <input
              type="email"
              onChange={handleChange}
              value={data.companyEmail}
              name="companyEmail"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none rounded-lg"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative rounded-lg bg-white border border-gray-300 focus-within:border-[#6315db] focus-within:ring-2 focus-within:ring-[#6315db]/30 focus-within:shadow-md transition-all duration-300">
            <input
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              value={data.password}
              autoComplete="on"
              name="password"
              placeholder="8+ strong character"
              className="w-full px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none rounded-lg"
              required
            />
            <div
              className="cursor-pointer text-black text-xl absolute top-1/2 right-1 transform -translate-x-1/2 -translate-y-1/2 z-40"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isloading}
            className={`w-full px-4 py-3 text-base rounded-lg text-white font-medium transition duration-300 ease-in-out flex items-center justify-center gap-2 
              ${isloading ? 'bg-[#6315db]/70 cursor-not-allowed' : 'bg-[#6315db] hover:bg-[#5111b3] cursor-pointer'} 
              disabled:opacity-60`}
          >
            {isloading ? <ButtonLoader /> : "Sign In"}
          </button>

          {/* Divider and Other Sign In Options */}
          <div className="container mx-auto mt-8 pt-6 border-t border-gray-300 relative flex flex-col items-center">
            <p className="text-[#838282] font-normal text-md mt-2 absolute -top-[1.28rem] bg-[#f5f3f3] px-3">
              Or sign in with
            </p>

            <div className="flex flex-row gap-4 mt-6">
              {otherSignInOptions.map((option, index) => (
                <button
                  key={index}
                  className="flex items-center justify-center w-24 md:w-32 h-12 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-all duration-200 ease-in-out shadow-sm"
                >
                  <img
                    src={option.icon}
                    alt={option.name}
                    className="w-6 h-6 md:w-7 md:h-7"
                  />
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Sign Up Prompt */}
      <div className="pt-6">
        <p className="text-[#07020D] text-sm">
          Want to create an account?{" "}
          <button
            onClick={() => setShowLogin(false)}
            className="font-semibold text-[#6315db] hover:underline hover:underline-offset-2 hover:decoration-1 cursor-pointer transition-all duration-300 ease-in-out"
          >
            Sign up
          </button>
        </p>
      </div>
    </section>
  );
};

export default Login;

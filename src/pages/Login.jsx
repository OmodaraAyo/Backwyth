import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { otherSignInOptions } from "../assets/MultiListView";
import { SignInApi } from "../api/SignInApi";
import { ButtonLoader } from "../Utils/Utils";
import { toast } from "react-toastify";
import Context from "../context";

const Login = ({ setShowLogin}) => {

  const [data, setData] = useState({
    companyEmail: "",
    password: "",
  });
  const [showPassword , setShowPassword] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const { fetchCurrentUserDetails } = useContext(Context)


  const handleChange = (e) =>  {
    
    const { name, value } = e.target;
    setData((preve)=> {
        return {
            ...preve,
            [name]: value,
        };
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        ...data,
    };

    try {

        setIsLoading(true);
        const response = await SignInApi(payload);
        // console.log("api response: ", response);
        if (response?.status === 200) {
            setIsLoading(false);
            toast.success(`${response?.data?.data?.response}`);
            fetchCurrentUserDetails();
            setShowLogin(false);
        }
        
    } catch (error) {
        setIsLoading(false)
        console.log("api error: ", error);
        toast.error(error?.message || "Something went wrong!")    
    }
  }


  return (
    <section id="login" className="min-h-screen flex flex-col px-4 py-6">
        <div className="flex-grow">
            <h1 className="text-[#07020D] font-semibold text-2xl">Sign In</h1>
            <p className="text-[#838282] font-normal text-md mt-2">Enter your email and password to login to your account.</p>

            <form className="grid grid-cols-1 gap-5 mt-10" onSubmit={handleSubmit}>
                    <div className="rounded focus-within:shadow-lg">
                        <label htmlFor="email"></label>
                            <input
                                type="email"
                                onChange={handleChange}
                                value={data.companyEmail}
                                name="companyEmail"
                                placeholder="example@gmail.com"
                                className="text-[#07020D] placeholder:text-[#b5b5b5a4] border w-full px-3 py-2 md:p-3 outline-none focus:outline-none focus:ring-0 focus:border focus:border-[#6315db] rounded"
                                required
                            />
                    </div>

                    <div className="rounded focus-within:shadow-lg text-[#07020D] relative">
                            <input
                                type={showPassword? "text": "password"}
                                onChange={handleChange}
                                value={data.password}
                                autoComplete="on"
                                name="password"
                                placeholder="8+ strong character"
                                className="text-[#07020D] placeholder:text-[#b5b5b5a4] border w-full px-3 py-2 md:p-3 outline-none focus:outline-none focus:ring-0 focus:border focus:border-[#6315db] rounded"
                                required
                            />
                             <div className="cursor-pointer text-xl absolute top-1/2 right-1 transform -translate-x-1/2 -translate-y-1/2 z-40" onClick={() => setShowPassword((prev)=> !prev)}>
                                <span>
                                    {
                                    showPassword? <FaEyeSlash /> : <FaEye />
                                    }
                                </span>
                            </div>
                    </div>
                <button
                   type="submit"
                    disabled={isloading}
                    className="w-full px-4 py-3 bg-[#6315db] text-white font-medium rounded hover:bg-[#5111b3] transition duration-300 ease-in-out cursor-pointer flex items-center justify-center gap-2"
                >
                    {isloading ? <ButtonLoader /> : "Sign In"}
                </button>

                <div className="container mx-auto flex flex-col items-center border-t border-[#07020D] mt-5 pt-5 relative">
                    <p className="text-[#838282] font-normal text-md mt-2 absolute -top-[1.28rem] bg-[#f5f3f3] px-3">Or sign in with</p>
                    <div className="flex flex-row gap-5 mt-5 ">
                        {otherSignInOptions.map((option, index) => (
                            <button key={index} className="flex flex-row items-center gap-2 border border-[#07020D] rounded px-3 py-2 md:p-2 bg-[#f5f3f3] hover:bg-[#eaeaea] cursor-pointer relative w-24 md:w-32 justify-center transition-all duration-300 ease-in-out">
                                <div >
                                    <img src={option.icon} alt={option.name} className="w-6 h-6 md:w-7 md:h-7" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </form>
        </div>
        
        <div className="pt-6">
              <p className="text-[#07020D] text-sm">Want to create an account? <button onClick={() => setShowLogin(false)} className="font-semibold text-[#6315db] hover:underline hover:underline-offset-2 hover:decoration-1 cursor-pointer transition-all duration-300 ease-in-out">Sign up</button></p>
          </div>
    </section>
  );
};

export default Login;

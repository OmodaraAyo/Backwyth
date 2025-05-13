import React, { useState } from "react";
import { SignUpApi } from "../../api/SignUpApi.jsx";
import { ButtonLoader } from "../../Utils/Utils.jsx";
import { toast } from "react-toastify";
import { categories } from "../../assets/MultiListView.jsx";
import { Trash2 } from "lucide-react";

const SignUp = ({ setShowLogin }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    companyName: "",
    companyPhone: [],
    companyEmail: "",
    businessRegistrationNumber: "",
    category: "",
  });

  const addPhoneField = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const updatePhoneNumber = (index, value) => {
    const updatedPhones = [...phoneNumbers];
    updatedPhones[index] = value;
    setPhoneNumbers(updatedPhones);
  };

  const removePhoneField = (index) => {
    const updatedPhones = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedPhones);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...data,
      companyPhone: phoneNumbers,
    };

    try {
      setIsLoading(true);
      const response = await SignUpApi(payload);

      if (response?.status === 200) {
        setIsLoading(false);
        toast.success(`${response?.data?.data?.message}`);
        setShowLogin(true);
      }
    } catch (error) {
      setIsLoading(false);
      // console.log("Error: ", error);
      toast.error("Error creating account: " + error?.message);
    }
  };

  return (
    <section id="sign-up" className="h-[100%] flex flex-col px-4 py-6">
      <div className="flex-grow">
        <h1 className="text-[#07020D] font-semibold text-2xl">
          Create Account
        </h1>
        <p className="text-[#838282] text-md mt-2">
          Fill in your company details to create an account.
        </p>

        <form className="grid grid-cols-1 gap-5 mt-8" onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="relative rounded-lg bg-white border border-gray-300 focus-within:border-[#6315db] focus-within:ring-2 focus-within:ring-[#6315db]/30 focus-within:shadow-md transition-all duration-300">
            <input
              type="text"
              name="companyName"
              onChange={handleChange}
              value={data.companyName}
              placeholder="Company Name"
              className="w-full px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none rounded-lg"
              required
            />
          </div>

          {/* Phone Numbers */}
          <div className="space-y-4">
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="relative flex items-center gap-2">
                <div className="relative rounded-lg bg-white border border-gray-300 focus-within:border-[#6315db] focus-within:ring-2 focus-within:ring-[#6315db]/30 focus-within:shadow-md transition-all duration-300 flex-grow">
                  <input
                    type="text"
                    name="companyPhone"
                    value={phone}
                    onChange={(e) => updatePhoneNumber(index, e.target.value)}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none rounded-lg"
                    required
                  />
                </div>
                {phoneNumbers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhoneField(index)}
                    className="cursor-pointer absolute top-1/2 right-1 -translate-x-1/2 -translate-y-1/2 transform text-red-500 text-xl font-bold hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPhoneField}
              className="text-[#6315db] text-sm font-medium hover:text-[#5111b3] transition-all duration-300 ease-in-out cursor-pointer"
            >
              + Add another phone
            </button>
          </div>

          {/* Email */}
          <div className="relative rounded-lg bg-white border border-gray-300 focus-within:border-[#6315db] focus-within:ring-2 focus-within:ring-[#6315db]/30 focus-within:shadow-md transition-all duration-300">
            <input
              type="email"
              name="companyEmail"
              onChange={handleChange}
              value={data.companyEmail}
              placeholder="Company Email"
              className="w-full px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none rounded-lg"
              required
            />
          </div>

          {/* Business Registration Number */}
          <div className="relative rounded-lg bg-white border border-gray-300 focus-within:border-[#6315db] focus-within:ring-2 focus-within:ring-[#6315db]/30 focus-within:shadow-md transition-all duration-300">
            <input
              type="text"
              name="businessRegistrationNumber"
              onChange={handleChange}
              value={data.businessRegistrationNumber}
              placeholder="Business Registration Number"
              className="w-full px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none rounded-lg"
              required
            />
          </div>

          {/* Business Category (Dropdown) */}
          <select
            name="category"
            onChange={handleChange}
            value={data.category}
            required
            className="w-full px-4 py-3 text-sm md:text-base text-gray-900 border border-gray-300 rounded-lg bg-white outline-none transition-all duration-200 ease-in-out 
                      focus:border-[#6315db] focus:ring-2 focus:ring-[#6315db]/30 focus:shadow-md placeholder:text-gray-400"
          >
            <option value="" disabled>
              Select Business Category
            </option>
            {categories.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={isloading}
            className={`w-full px-4 py-3 text-base rounded-lg text-white font-medium transition duration-300 ease-in-out flex items-center justify-center gap-2 
            ${
              isloading
                ? "bg-[#6315db]/70 cursor-not-allowed"
                : "bg-[#6315db] hover:bg-[#5111b3] cursor-pointer"
            } disabled:opacity-60`}
          >
            {isloading ? <ButtonLoader /> : "Sign Up"}
          </button>
        </form>
      </div>

      {/* Link to Sign In */}
      <div className="mt-8">
        <p className="text-[#07020D] text-sm">
          Already have an account?{" "}
          <button
            className="font-semibold text-[#6315db] hover:underline underline-offset-2 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>
        </p>
      </div>
    </section>
  );
};

export default SignUp;

import React, { useState } from "react";
import { SignUpApi } from "../api/SignUpApi.jsx";

const SignUp = ({ setShowLogin }) => {
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const categories = [
    { value: "finance", label: "Finance" },
    { value: "healthCare", label: "Healthcare" },
    { value: "technology", label: "Technology" },
    { value: "social", label: "Social" },
    { value: "education", label: "Education" },
    { value: "ecommerce", label: "Ecommerce" },
  ];
  const [data, setData] = useState({
    companyName: "",
    companyPhone: [],
    companyEmail: "",
    businessRegistrationNumber: "",
    category: "",
  });
  console.log("from sign-up: okayyy",data)

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

  const handleChange = (e)=> {
    const {name, value} = e.target
    
    setData((preve)=> {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e)=> {
    e.preventDefault()
    const payload = {
      ...data,
      companyPhone: phoneNumbers
    }
    console.log("from sign-up",payload)

    const response = await SignUpApi(payload)
    console.log("from sign-up",response)
    if(response?.status === 200) {
      alert("Account created successfully")
      console.log("Hi dev")
      setShowLogin(true)
    } else {
      alert("Error creating account")
    }

  }

  return (
    <section id="sign-up" className="h-full flex flex-col px-4 py-6">
      <div className="flex-grow">
        <h1 className="text-[#07020D] font-semibold text-2xl">Create Account</h1>
        <p className="text-[#838282] text-md mt-2">
          Fill in your company details to create an account.
        </p>

        <form className="grid grid-cols-1 gap-5 mt-8">
          {/* Company Name */}
          <input
            type="text"
            name="companyName"
            onChange={handleChange}
            value={data.companyName}
            placeholder="Company Name"
            className="text-[#07020D] placeholder:text-[#b5b5b5a4] border w-full px-3 py-2 md:p-3 outline-none focus:outline-none focus:ring-0 focus:border focus:border-[#6315db] rounded"
            required
          />

          {/* Phone Numbers */}
          <div className="space-y-4">
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  name="companyPhone"
                  value={phone}
                  onChange={(e) => updatePhoneNumber(index, e.target.value)}
                  placeholder="Phone number"
                  className="text-[#07020D] placeholder:text-[#b5b5b5a4] border w-full px-3 py-2 md:p-3 outline-none focus:outline-none focus:ring-0 focus:border focus:border-[#6315db] rounded"
                  required
                />
                {phoneNumbers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhoneField(index)}
                    className="text-red-500 text-xl font-bold hover:text-red-700"
                  >
                    &minus;
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
          <input
            type="email"
            name="companyEmail"
            onChange={handleChange}
            value={data.companyEmail}
            placeholder="Company Email"
            className="text-[#07020D] placeholder:text-[#b5b5b5a4] border w-full px-3 py-2 md:p-3 outline-none focus:outline-none focus:ring-0 focus:border focus:border-[#6315db] rounded"
            required
          />

          {/* Business Registration Number */}
          <input
            type="text"
            name="businessRegistrationNumber"
            onChange={handleChange}
            value={data.businessRegistrationNumber}
            placeholder="Business Registration Number"
            className="text-[#07020D] placeholder:text-[#b5b5b5a4] border w-full px-3 py-2 md:p-3 outline-none focus:outline-none focus:ring-0 focus:border focus:border-[#6315db] rounded"
            required
          />

          {/* Business Category (Dropdown) */}
          <select
            name="category"
            onChange={handleChange}
            value={data.category}
            className="text-[#07020D] placeholder:text-[#b5b5b5a4] border w-full px-3 py-2 md:p-3 outline-none focus:outline-none focus:ring-0 focus:border focus:border-[#6315db] rounded"
            required
          >
            <option disabled hidden>Select Business Category</option>
            {categories.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-4 py-3 bg-[#6315db] text-white font-medium rounded hover:bg-[#5111b3] transition duration-300 ease-in-out cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Link to Sign In */}
      <div className="mt-8">
        <p className="text-[#07020D] text-sm">Already have an account?{" "}<button className="font-semibold text-[#6315db] hover:underline underline-offset-2 transition duration-300 ease-in-out cursor-pointer" onClick={() => setShowLogin(true)}>Sign In</button></p>
      </div>
    </section>
  );
};

export default SignUp;

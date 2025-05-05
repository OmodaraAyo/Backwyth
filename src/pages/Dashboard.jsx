import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Particles from "../components/Particles";

const Dashboard = () => {
  const [companyInfo, setCompanyInfo] = useState({
    companyPhone: [""],
    businessRegistrationNumber: "",
    category: "",
    companyApiKey: "",
    baseUrl: ""
  });

  const adminPanelItems = [
    { name: "Profile", path: "/profile" },
    { name: "Add New Menu", path: "/add-menu" },
    { name: "Feedback", path: "/feedback" },
    { name: "Notifications", path: "/notifications" },
    { name: "Support", path: "/support" },
    { name: "Settings", path: "/settings" }
  ]
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "companyPhone") {
      const phones = [...companyInfo.companyPhone];
      phones[index] = value;
      setCompanyInfo({ ...companyInfo, companyPhone: phones });
    } else {
      setCompanyInfo({ ...companyInfo, [name]: value });
    }
  };

  const addPhoneField = () => {
    setCompanyInfo({ 
      ...companyInfo, 
      companyPhone: [...companyInfo.companyPhone, ""]
    });
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#07020D] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#07020D] border-r border-[#6315db]/30 p-6">
        <h2 className="px-2 text-2xl font-bold mb-8 text-[#6315db]">Admin Panel</h2>
        <aside className="space-y-3">
          {adminPanelItems.map((item, index) => (
            <Link
              to={"/dashboard"+item.path}
              key={index}
              className="block py-2 px-4 hover:bg-[#6315db]/20 rounded-lg transition"
            >
              {item.name}
            </Link>
          ))}
        </aside>
      </div>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>

      {/* Main Content */}
      {/* <div className="flex-1 p-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Particles
            particleColors={["#6315db", "#ffffff"]}
            particleCount={100}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={2}
          />
        </div>

        <h1 className="text-3xl font-bold mb-8">Company Information</h1>

        <form className="max-w-2xl bg-[#07020D]/90 backdrop-blur-sm p-6 rounded-xl border border-[#6315db]/30">
          <div className="space-y-6">
            {companyInfo.companyPhone.map((phone, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-2">
                  Phone Number {index + 1}
                </label>
                <input
                  type="tel"
                  name="companyPhone"
                  value={phone}
                  onChange={(e) => handleInputChange(e, index)}
                  className="w-full bg-[#07020D] border border-[#6315db]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6315db] outline-none"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addPhoneField}
              className="text-[#6315db] hover:text-[#8a4cff] text-sm font-medium"
            >
              + Add Phone Number
            </button>

            Other Fields
            {[
              { label: "Business Registration Number", name: "businessRegistrationNumber" },
              { label: "Category", name: "category" },
              { label: "Company API Key", name: "companyApiKey" },
              { label: "Base URL", name: "baseUrl" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-2">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={companyInfo[field.name]}
                  onChange={handleInputChange}
                  className="w-full bg-[#07020D] border border-[#6315db]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6315db] outline-none"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#6315db] hover:bg-[#7a2fff] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Update Information
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default Dashboard;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Particles from "../components/Particles";
import moment from "moment/moment";
import { formatLabelName } from "../helper/Formatter";
import CustomEyeButton from "../reusables/CustomEyeButton";

const Profile = () => {
  const user = useSelector((state) => state?.user.user);
  const [visibility, setVisibility] = useState({});

  const toggleFieldVisibility = (fieldLabel) => {
    setVisibility((prev) => ({
      ...prev,
      [fieldLabel]: !prev[fieldLabel],
    }));
  };

  const userDetails = [
    { label: "Name", data: user?.companyName?.toUpperCase() },
    { label: "Email", data: formatLabelName(user?.companyEmail) },
    { label: "USSD Code", data: user?.ussdShortCode, sensitive: true },
    { label: "Access Key", data: user?.apiKey, sensitive: true },
    { label: "Phone Number", data: user?.companyPhone },
    { label: "Category", data: user?.category },
    { label: "Business Reg/No", data: user?.businessRegistrationNumber },
    { label: `${formatLabelName(user?.companyName)} API access Key`, data: user?.companyApiKey, sensitive: true, },
    { label: `${formatLabelName(user?.companyName)} API base URL`, data: user?.baseUrl, sensitive: true, },
    { label: "Created At", data: moment(user?.createAt).format("LLL") },
  ];

  return (
    <section id="profile">
      <div className="flex-1 px-8 py-3 relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-8">Company Information</h1>

        <div className="max-w-2xl bg-[#07020D]/90 backdrop-blur-sm p-6 rounded-xl border border-[#6315db]/30">
          <div className="space-y-6">
            {userDetails.map((info, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-2">
                  {info.label}
                </label>
                <div className="w-full h-10 bg-[#07020D] border border-[#6315db]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6315db] outline-none">
                  {info.data === null ? (
                    <span className="text-gray-500 italic">Not provided</span>
                  ) : info.sensitive ? (
                    <div className="relative flex justify-between items-center">
                      <p className="truncate">
                        {visibility[info.label] ? info.data : "••••••••••••••"}
                      </p>
                      <CustomEyeButton
                        showData={visibility[info.label]}
                        setShowData={() => toggleFieldVisibility(info.label)}
                        textColor="text-white"
                      />
                    </div>
                  ) : (
                    <span>{info.data}</span>
                  )}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#6315db] hover:bg-[#7a2fff] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Update Information
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

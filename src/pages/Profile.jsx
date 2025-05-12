import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { formatLabelName } from "../helper/Formatter";
import CustomEyeButton from "../reusables/CustomEyeButton";
import { Link, Outlet, useLocation } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state?.user.user);
  const [visibility, setVisibility] = useState({});
  const location = useLocation();
  const isEditing = location.pathname.endsWith("/edit");

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
    {
      label: `${formatLabelName(user?.companyName)} API access Key`,
      data: user?.companyApiKey,
      sensitive: true,
    },
    {
      label: `${formatLabelName(user?.companyName)} API base URL`,
      data: user?.baseUrl,
      sensitive: true,
    },
    { label: "Created At", data: moment(user?.createAt).format("LLL") },
  ];

  useEffect(() => {
    if (isEditing) {
      document.getElementById("profile").scrollIntoView({ behavior: "smooth" });
    }
  }, [isEditing]);

  return (
    <section id="profile" className="min-h-screen bg-[#07020D]/90 text-white">
      <div className="flex-1 px-2 sm:px-8 py-3 relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-8">Company Information</h1>

        {isEditing && (
          <div className="md:max-w-2xl mb-4">
            <Link
              to=".."
              className="text-sm text-[#6315db] hover:underline inline-block"
            >
              ← Back to Profile
            </Link>
          </div>
        )}

        {!isEditing && (
          <div className="md:max-w-2xl bg-[#07020D]/90 backdrop-blur-sm py-6 px-4 rounded-xl border border-[#6315db]/30">
            <div className="space-y-6">
              {userDetails.map((info, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-2">
                    {info.label}
                  </label>
                  <div className="w-full min-h-10 bg-[#07020D] border border-[#6315db]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6315db] outline-none">
                    {info.data === null ? (
                      <span className="text-gray-500 italic">Not provided</span>
                    ) : info.sensitive ? (
                      <div className="relative flex justify-between items-center">
                        <p className="truncate">
                          {visibility[info.label]
                            ? info.data
                            : "••••••••••••••"}
                        </p>
                        <CustomEyeButton
                          showData={visibility[info.label]}
                          setShowData={() => toggleFieldVisibility(info.label)}
                          textColor="text-white"
                        />
                      </div>
                    ) : Array.isArray(info.data) ? (
                      <ul className="flex flex-wrap gap-2">
                        {info.data.map((num, index) => (
                          <li key={index} className="text-sm px-3 py-1 rounded-full border border-[#6315db]/30 bg-[#1a0b2d] text-white hover:bg-[#240c3f] transition-colors">
                             {num}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>{info.data}</span>
                    )}
                  </div>
                </div>
              ))}

              <Link
                to="edit"
                className="flex justify-center w-full bg-[#6315db] hover:bg-[#7a2fff] text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Update Information
              </Link>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="md:max-w-2xl bg-[#07020D]/90 backdrop-blur-sm py-6 px-4 rounded-xl border border-[#6315db]/30 mt-6">
            <Outlet />
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;

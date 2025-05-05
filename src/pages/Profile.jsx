import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state?.user.user);
  console.log("from profile: ", user);
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="bg-[#120b1e] w-full py-1 rounded-l-2xl">
        <div className="animate-marquee text-sm font-normal italic text-[#5e4c81]">
          Welcome back, admin! Your last login was on {user?.lastLoginDate}.
          We're here to support you in delivering seamless services
          to your users.
        </div>
      </div>
      Profile
    </div>
  );
};

export default Profile;

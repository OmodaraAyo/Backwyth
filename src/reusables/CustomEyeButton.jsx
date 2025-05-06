import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CustomEyeButton = ({ showData, setShowData, textColor }) => {
  return (
    <div className={`cursor-pointer ${textColor} text-xl absolute top-1/2 right-1 transform -translate-x-1/2 -translate-y-1/2 z-40`} onClick={() => setShowData((prev) => !prev)}>
      <span>{showData ? <FaEyeSlash /> : <FaEye />}</span>
    </div>
  );
};

export default CustomEyeButton;

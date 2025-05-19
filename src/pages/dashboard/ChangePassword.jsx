import React, { useContext, useState, useRef, useEffect } from "react";
import { ButtonLoader } from "../../Utils/Utils";
import CustomEyeButton from "../../reusables/CustomEyeButton";
import { changePasswordFormData } from "../../assets/MultiListView";
import consoleLog from "../../reusables/MyConsoleLog";
import { ChangePasswordApi } from "../../api/company/ChangePasswordApi";
import Context from "../../context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState({});
  const { fetchCurrentUserDetails } = useContext(Context);
  const navigate = useNavigate();

  const [isError, setIsError] = useState({ message: null, field: null });

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Refs for all fields
  const fieldRefs = {
    oldPassword: useRef(null),
    newPassword: useRef(null),
    confirmPassword: useRef(null),
  };

  useEffect(() => {
    if (isError?.field && fieldRefs[isError.field]?.current) {
      fieldRefs[isError.field].current.focus();
    }
  }, [isError]);

  const toggleFieldVisibility = (fieldLabel) => {
    setVisibility((prev) => ({
      ...prev,
      [fieldLabel]: !prev[fieldLabel],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the error if user is typing in the affected field
    if (isError?.field === name) {
      setIsError({ message: null, field: null });
    }

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Client-side validation
    const minLength = 9;
    const invalidField = Object.keys(data).find(
      (key) => data[key].length < minLength
    );

    if (invalidField) {
      setIsError({
        message: `Password must be at least ${minLength} characters long.`,
        field: invalidField,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await ChangePasswordApi(data);
      consoleLog("api response from change password:", response);
      if (response?.status === 200) {
        fetchCurrentUserDetails();
        toast.success(`${response?.data?.data?.message}`);
        navigate("/");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "An error occurred. Please try again.";
      // If API returns a specific field, use it; otherwise fallback to newPassword
      setIsError({ message: errorMsg, field: "newPassword" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="change-password"
      className="bg-[#07020D]/90 text-white px-2 sm:px-8 py-3"
    >
      <div className="md:max-w-xl bg-[#07020D]/90 backdrop-blur-sm py-6 px-4 rounded-xl border border-[#6315db]/30 mt-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {changePasswordFormData.map((field, index) => (
            <div key={index}>
              <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                {field.label}
              </label>
              <div className="relative">
                <input
                  id={field.name}
                  name={field.name}
                  value={data[field.name]}
                  type={visibility[field.label] ? "text" : "password"}
                  placeholder={field.placeHolder || ""}
                  autoComplete="on"
                  onChange={handleChange}
                  ref={fieldRefs[field.name]}
                  className="w-full h-10 bg-[#07020D] border border-[#6315db]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6315db] outline-none"
                  required
                />
                <CustomEyeButton
                  showData={visibility[field.label]}
                  setShowData={() => toggleFieldVisibility(field.label)}
                  textColor="text-white"
                />
              </div>

              {isError?.field === field.name && (
                <p className="mt-2 text-sm text-red-400">{isError.message}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className={`flex justify-center w-full text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out items-center gap-2 
              ${
                isLoading
                  ? "bg-[#6315db]/70 cursor-not-allowed"
                  : "bg-[#6315db] hover:bg-[#5111b3] cursor-pointer"
              } disabled:opacity-60`}
          >
            {isLoading ? <ButtonLoader size={18} /> : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;

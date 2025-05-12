import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatLabelName } from "../helper/Formatter";
import { Trash2 } from "lucide-react";
import { UpdateDetailsApi } from "../api/UpdateDetailsApi";
import { toast } from "react-toastify";
import { ButtonLoader } from "../Utils/Utils";
import { categories } from "../assets/MultiListView";

const UpdateDetails = () => {
  const user = useSelector((state) => state?.user.user);
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    companyPhone: [""],
    businessRegistrationNumber: "",
    category: "",
    companyApiKey: "",
    baseUrl: "",
  });
  const [initialFormValues, setInitialFormValues] = useState(null);

  useEffect(() => {
    if (user) {
      const phoneList = user?.companyPhone?.length ? user.companyPhone : [""];
      const populated = {
        companyPhone: phoneList,
        businessRegistrationNumber: user?.businessRegistrationNumber || "",
        category: user?.category || "",
        companyApiKey: user?.companyApiKey || "",
        baseUrl: user?.baseUrl || "",
      };
      setPhoneNumbers(phoneList);
      setFormValues(populated);
      setInitialFormValues(populated);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updatePhoneNumber = (index, value) => {
    const updatedPhones = [...phoneNumbers];
    updatedPhones[index] = value;
    setPhoneNumbers(updatedPhones);
  };

  const addPhoneField = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const removePhoneField = (index) => {
    const updatedPhones = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedPhones);
  };

  const isFormUnchanged = () => {
    if (!initialFormValues) return true;
    const currentValues = {
      ...formValues,
      companyPhone: phoneNumbers,
    };

    const isEmptyPhonePresent = phoneNumbers.some((phone) => phone.trim() === "");

    return (
      JSON.stringify(currentValues) === JSON.stringify(initialFormValues) ||
      isEmptyPhonePresent
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formValues,
      companyPhone: phoneNumbers,
    };
    try {
      setIsLoading(true);
      const response = await UpdateDetailsApi(payload);
      if (response?.status === 200) {
        toast.success(`${response?.data?.data?.message}`);
        setInitialFormValues(payload);
      }
    } catch (error) {
      toast.error("Error saving changes: " + error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formData = [
    { label: "Category", name: "category" },
    { label: "Business Reg/No", name: "businessRegistrationNumber" },
    {
      label: `${formatLabelName(user?.companyName)} API access Key`,
      name: "companyApiKey",
    },
    {
      label: `${formatLabelName(user?.companyName)} API base URL`,
      name: "baseUrl",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[#6315db]">
        Edit Company Information
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Phone Numbers */}
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          {phoneNumbers.map((phone, index) => (
            <div key={index} className="relative flex items-center gap-2">
              <div className="relative block text-sm font-medium mb-2 w-full">
                <input
                  type="text"
                  name="companyPhone"
                  value={phone}
                  onChange={(e) => updatePhoneNumber(index, e.target.value)}
                  className="w-full h-10 bg-[#07020D] border border-[#6315db]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6315db] outline-none"
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

        {/* Other Form Fields */}
        {formData.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name} className="block text-sm font-medium mb-2">
              {field.label}
            </label>
            {field.name === "category" ? (
              <select
                name="category"
                onChange={handleChange}
                value={formValues.category}
                required
                className="w-full h-10 bg-[#07020D] border border-[#6315db]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6315db] outline-none"
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
            ) : (
              <input
                type="text"
                name={field.name}
                id={field.name}
                value={formValues[field.name]}
                onChange={handleChange}
                className="w-full h-10 bg-[#07020D] border border-[#6315db]/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6315db] outline-none"
                required
              />
            )}
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isFormUnchanged()}
          className={`flex justify-center w-full text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out items-center gap-2 
            ${(isLoading || isFormUnchanged()) ? 'bg-[#6315db]/70 cursor-not-allowed' : 'bg-[#6315db] hover:bg-[#5111b3] cursor-pointer'} 
            disabled:opacity-60`}
        >
          {isLoading ? <ButtonLoader /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateDetails;
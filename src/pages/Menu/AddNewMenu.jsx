import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import { AddMenuApi } from "../../api/AddMenuApi";
import { toast } from "react-toastify";
import { ButtonLoader } from "../../Utils/Utils";
import Context from "../../context";

const AddNewMenu = () => {
  const [data, setData] = useState({ title: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { fetchCurrentUserDetails } = useContext(Context);
  const navigate = useNavigate();
  const isDisabled = data.title.trim() === "";

  const handleClose = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...data,
    };

    console.log("payload:", payload);

    try {
      setIsLoading(true);
      const response = await AddMenuApi(payload);

      if (response?.status === 200) {
        fetchCurrentUserDetails();
        setIsLoading(false);
        toast.success(`${response?.data?.data?.response}`);
        navigate(-1);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to add menu: " + error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/40">
      <div className="w-full mx-4 sm:mx-auto bg-white shadow-lg p-6 max-w-md rounded-xl border border-[#6315db]/30 text-[#07020D]">
        <button
          className="block ml-auto mb-2 cursor-pointer"
          onClick={handleClose}
          title="close"
        >
          <IoMdClose size={24} />
        </button>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-[#07020D]">
              Menu Title
            </label>
            <div className="relative rounded-lg bg-white border border-gray-300 focus-within:border-[#6315db] focus-within:ring-2 focus-within:ring-[#6315db]/30 focus-within:shadow-md transition-all duration-300 flex-grow">
              <input
                type="text"
                name="title"
                placeholder="Enter menu title"
                value={data.title}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base text-[#07020D] placeholder:text-gray-400 bg-transparent outline-none rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isDisabled || isLoading}
              className={`w-full font-medium py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out items-center justify-center cursor-pointer ${
                isDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#6315db] hover:bg-[#7a2fff] text-white"
              } ${isLoading && "cursor-progress"}`}
            >
              {isLoading ? <ButtonLoader /> : "Save Menu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewMenu;

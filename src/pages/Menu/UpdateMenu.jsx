import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router';
import Context from '../../context';
import { toast } from 'react-toastify';
import { formatLabelName } from '../../helper/Formatter';
import { formatDateTime } from '../../Utils/DateFormatter';
import { UpdateMenuApi } from '../../api/menu/UpdateMenuApi';
import { deleteMenuApi } from '../../api/menu/DeleteMenuApi';
import { ButtonLoader } from '../../Utils/Utils';
import { Trash2 } from 'lucide-react';
import { consoleLog } from '../../reusables/MyConsoleLog';

const UpdateMenu = () => {
  const location = useLocation();
  const { menu } = location.state || {};
  consoleLog("from update page: ", menu)
  const [data, setData] = useState({ newMenuTitle: formatLabelName(menu?.title) || "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { fetchCurrentUserDetails } = useContext(Context);
  const navigate = useNavigate();
  const [currentTitle] = useState(menu?.title || "");
  const isDisabled = data.newMenuTitle.trim() === "" || formatLabelName(data.newMenuTitle.trim()) === formatLabelName(currentTitle.trim());

  const handleClose = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...data,
    };

    try {
      setIsLoading(true);
      const response = await UpdateMenuApi(menu.optionId, payload);
      if (response?.status === 200) {
        fetchCurrentUserDetails();
        toast.success(`${response?.data?.data?.message}`);
        navigate(-1);
      }
    } catch (error) {
      toast.error("Failed to update menu: " + error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    const payload = menu?.optionId
    try {
      const response = await deleteMenuApi( payload )
      if(response?.status === 200){
        fetchCurrentUserDetails();
        toast.success(`${response?.data?.data?.message}`)
        navigate(-1);
      }
    } catch (error) {
      toast.error("Failed to delete menu: " + error?.message);
    }finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!menu) {
      navigate(-1);
    }
  }, [menu, navigate]);

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/40'>
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
                name="newMenuTitle"
                placeholder="Enter menu title"
                value={data.newMenuTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base text-[#07020D] placeholder:text-gray-400 bg-transparent outline-none rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
                className="cursor-pointer absolute top-1/2 right-1 -translate-x-1/2 -translate-y-1/2 transform text-red-500 text-xl font-bold hover:text-red-700"
                title="Delete Menu"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {menu?.updatedAt && (
              <p className="text-xs text-gray-500 mt-1">
                Last updated on {formatDateTime(menu.updatedAt)}
              </p>
            )}

            {showDeleteConfirm && (
              <div className="mt-3 p-4 border border-red-300 bg-red-50 rounded-md">
                <p className="text-sm text-red-700 mb-2">Are you sure you want to delete this menu?</p>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <ButtonLoader size={14}/> : "Yes"}
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 rounded"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isDisabled || isLoading || isDeleting}
              className={`w-full font-medium py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out items-center justify-center cursor-pointer ${
                isDisabled || isDeleting
                  ? "bg-[#6315db]/70 text-[#FFFA] cursor-not-allowed"
                  : "bg-[#6315db] hover:bg-[#5111b3] text-white"
              } ${isLoading && "cursor-progress"}`}
            >
              {isLoading ? <ButtonLoader size={18}/> : "Save Menu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;

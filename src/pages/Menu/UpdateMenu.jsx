import React from 'react'
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router'

const UpdateMenu = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1)
  }
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
        Edit menu
      </div>
    </div>
  )
}

export default UpdateMenu
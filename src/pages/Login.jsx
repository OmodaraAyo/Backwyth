import React from 'react'
import { IoMdClose } from "react-icons/io";

const Login = ({ onClose }) => {
  return (
    <section id='login' className='fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-black/60 z-50 justify-content-end'>
        <div className='block ml-auto bg-[#f5f3f3] w-[40%] h-full rounded-lg p-10'>

            <button onClick={onClose} className='block ml-auto text-black/90 hover:text-black/100 transition-all duration-300 ease-in-out cursor-pointer'>
                <IoMdClose size={32}/>
            </button>
        </div>
    </section>
  )
}

export default Login

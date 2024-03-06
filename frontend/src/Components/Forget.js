import React, { useState } from "react";
import Logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
const Forget = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleOTP = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    try {
      axios.defaults.baseURL = process.env.REACT_APP_API;
      setLoading(true);
      const resp = await axios.post("/user/forgetpassword", {
        email: document.getElementById("email").value,
      });

      if (resp.status == 200) {
        sessionStorage.setItem(
          "toResetPassEmail",
          document.getElementById("email").value
        );
        setLoading(false);
        handleShowToast("OTP sent to your email.", "success");
        navigate("/forget/OTP");
      } else {
        setLoading(false);
        handleShowToast("Email is not registered.", "error");
      }
    } catch (error) {
      setLoading(false);
      handleShowToast("Email is not registered.", "error");
    }
  };
  const handleShowToast = (message, type) => {
    if (type === "error") {
      toast.error(message, {
        position: "bottom-center",
        duration: 3000,
      });
      return;
    } else if (type === "success") {
      toast.success(message, {
        position: "bottom-center",
        duration: 3000,
      });
      return;
    }
  };

  return (
    <>
      {/* <div> this is forget page </div> */}
      <div className='Background bg-slate-400 h-screen flex items-center justify-center'>
        <div className='BoxOfForget bg-slate-300 sm:w-[80%] md:w-[55%] w-[90%] backdrop-blur-md rounded-2xl p-4'>
          <Toaster />
          <div className='Heading'>
            <img
              className='sm:m-auto mt-2 m-auto h-[70px] w-auto sm:mt-2 sm:h-[70px] sm:w-auto sm:mix-blend-multiply rounded-md'
              src={Logo}
              alt='Your Company'
            />
            <div className='font-bold md:mt-2 sm:mt-2 mt-3 text-center md:font-bold sm:font-bold sm:text-3xl md:text-3xl text-3xl'>
              Request for new Password
            </div>
          </div>
          <div className=' sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-transparent py-8 sm:rounded-lg sm:px-10'>
              <form className='space-y-6' method='POST'>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-md font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      placeholder='example@gmail.com'
                      className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    />
                    {emailError && (
                      <p className='text-red-600 text-sm mt-1'>{emailError}</p>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleOTP}
                    disabled={loading}
                    className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    {loading ? "Sending OTP..." : "Get OTP"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forget;

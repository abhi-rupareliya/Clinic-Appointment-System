import React, {  useState } from "react";
import Logo from "../Images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
const OTP = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false); 
  const [resend, setResend] = useState(false);
  // eslint-disable-next-line
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cnfPasswordError, setCnfPasswordError] = useState("");
  const handleSubmition = async (e) => {
    try {
      e.preventDefault();
      let psw = document.getElementById("password").value;
      let cnfPsw = document.getElementById("cnfPassword").value;
      let otp = document.getElementById("OTP").value;
      if (psw !== cnfPsw) {
        handleShowToast("Password and Confirm Password are not same.", "error");
        return;
      }

      // Password validation
      if (psw.length < 6) {
        setPasswordError(
          "Password must be alphanumeric with special character and length must be 8"
        );
        return;
      } else {
        setPasswordError(""); // Clear the password validation error
      }

      // Confirm Password validation
      if (psw !== cnfPsw) {
        setCnfPasswordError("Passwords do not match");
        return;
      } else {
        setCnfPasswordError(""); // Clear the confirm password validation error
      }
      setLoading(true);

      axios.defaults.baseURL = process.env.REACT_APP_API;
      const resp = await axios.post("/user/resetpassword", {
        otp: otp,
        password: psw,
        email: sessionStorage.getItem("toResetPassEmail"),
      });
      if (resp.status === 200) {
        setLoading(false);
        handleShowToast("Password changed successfully.", "success");
        navigate("/login");
      } else {
        setLoading(false);
        handleShowToast("Wrong OTP", "error");
        document.getElementById("OTP").value = "";
        document.getElementById("password").value = "";
        document.getElementById("cnfPassword").value = "";
      }
    } catch (error) {
      handleShowToast("Wrong OTP", "error");
    }
  };

  const handleResendOTP = async (e) => {
    try {
      e.preventDefault();
      setResend(true);
      axios.defaults.baseURL = process.env.REACT_APP_API;
      const resp = await axios.post("/user/forgetpassword", {
        email: sessionStorage.getItem("toResetPassEmail"),
      });
      if (resp.status === 200) {
        setResend(false);
        handleShowToast("OTP sent to your email.", "success");
      } else {
        setResend(false);
        handleShowToast("Email is not registered.", "error");
      }
    } catch (error) {
      setResend(false);
      handleShowToast("Email is not registered.", "error");
    }
  };

  const handleShowToast = (message, type) => {
    if (type === "error") {
      toast.error(message, {
        position: "bottom-center",
      });
      return;
    } else if (type === "success") {
      toast.success(message, {
        position: "bottom-center",
      });
      return;
    }
  };

  return (
    <div className='Background bg-slate-400 h-screen flex items-center justify-center'>
      <div className='BoxOfForget bg-slate-300 sm:w-[80%] md:w-[55%] w-[90%] backdrop-blur-md rounded-2xl p-4'>
        <div className='Heading'>
          <img
            className='sm:m-auto mt-2 m-auto h-[70px] w-auto sm:mt-2 sm:h-[70px] sm:w-auto sm:mix-blend-multiply rounded-md'
            src={Logo}
            alt='Your Company'
          />
          <div className='font-bold md:mt-2 sm:mt-2 mt-3 text-center md:font-bold sm:font-bold sm:text-3xl md:text-3xl text-3xl'>
            Enter the OTP and new Password
          </div>
        </div>
        <div className=' sm:mx-auto sm:w-full sm:max-w-md'>
          <Toaster />
          <div className='bg-transparent py-8 sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmition}>
              <div>
                <label
                  htmlFor='OTP'
                  className='block text-md font-medium text-gray-700'
                >
                  OTP
                </label>
                <div className='mt-1'>
                  <input
                    id='OTP'
                    name='OTP'
                    type='number'
                    placeholder='Enter OTP from email'
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  />
                  {otpError && (
                    <p className='text-red-600 text-sm mt-1'>{otpError}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    placeholder='Enter new password'
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  />
                  {passwordError && (
                    <p className='text-red-600 text-sm mt-1'>{passwordError}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='cnfPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Confirm Password
                </label>
                <div className='mt-1'>
                  <input
                    id='cnfPassword'
                    name='cnfPassword'
                    type='Password'
                    autoComplete='current-cnfPassword'
                    placeholder='Confirm new password'
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  />
                  {cnfPasswordError && (
                    <p className='text-red-600 text-sm mt-1'>
                      {cnfPasswordError}
                    </p>
                  )}
                </div>
              </div>

              <div>
                {!resend ? (
                  <p
                    className='sm:font-medium sm:cursor-pointer sm:relative sm:top-2 relative top-2 font-medium sm:text-[14px] text-indigo-900 sm:text-indigo-900 sm:hover:text-slate-950 sm:duration-100'
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </p>
                ) : null}
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;

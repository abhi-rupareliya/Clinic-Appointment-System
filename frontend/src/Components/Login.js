import React, { useState } from "react";
import Logo from "../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [Role, setRole] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const validateForm = () => {
    let isValid = true;

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (
      !password.match(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
      )
    ) {
      setPasswordError(
        "Password must contain at least 8 characters, including letters, numbers, and a special character."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(Role);
    if (!validateForm()) {
      setShowErrorMessage(true);
      return;
    }

    try {
      axios.defaults.baseURL = process.env.REACT_APP_API;
      axios.withCredentials = true;
      const res = await axios.post("/user/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        rememberMe: true,
      });

      // console.warn(res.data);
      setUser({
        uid: res.data.user.uid,
        email: res.data.user.email,
        role: res.data.user.role,
      });
      handleShowToast("Login Successful", "success");
      navigate("/");
    } catch (error) {
      handleShowToast("Login Failed. Try again", "error");
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
    <>
      <div className='Background bg-slate-400 bg-cover relative h-screen overflow-hidden'>
        <div className='flex justify-center items-center h-screen'>
          <div className='Card bg-slate-300 flex sm:w-2/5 sm:h-auto h-4/5 flex-col justify-center m-auto items-center shadow-custom6 drop-shadow-md py-10 sm:px-6 lg:px-8 backdrop-blur-lg rounded-2xl'>
            <Toaster />
            <div className='sm:mx-auto sm:w-full sm:max-w-md mix-blend-multiply'>
              <img
                className='sm:m-auto m-auto mt-5 h-12 w-auto mix-blend-multiply rounded-md'
                src={Logo}
                alt='Your Company'
              />
              <h2 className='mt-6 text-center sm:text-3xl text-2xl font-bold tracking-tight text-gray-900'>
                Sign in to your account
              </h2>
            </div>
            <div className='sm:mt-5 sm:mx-auto sm:w-full sm:max-w-md'>
              <div className='bg-transparent py-4  px-4 sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email address
                    </label>
                    <div className='mt-1'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='email'
                        placeholder='example@gmail.com'
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                    {emailError && (
                      <span className='text-red-500 text-sm'>{emailError}</span>
                    )}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='current-password'
                        placeholder='********'
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                    {passwordError && (
                      <span className='text-red-500 text-sm'>
                        {passwordError}
                      </span>
                    )}
                  </div>

                  <div>
                    <div>
                      <label
                        htmlFor='Role'
                        className='block mb-2 text-sm font-medium text-gray-900'
                      >
                        Select your work
                      </label>
                      <select
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                        value={Role}
                        name='Role'
                        id='Role'
                        className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'
                      >
                        <option value='' disabled selected>
                          Select Role
                        </option>
                        <option value='doctor'>Doctor</option>
                        <option value='receptionist'>Receptionist</option>
                      </select>
                    </div>
                  </div>

                  <div className='sm:flex sm:items-center sm:justify-between items-center p-1'>
                    <div className='flex items-center'>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                      />
                      <label
                        htmlFor='remember-me'
                        className='sm:ml-2 sm:font-medium font-medium sm:block sm:text-[15px] text-sm ml-1 text-black'
                      >
                        Remember me
                      </label>
                    </div>

                    <div className='text-sm mt-5 sm:mt-0'>
                      {" "}
                      {/* Add mt-2 to create space on mobile */}
                      <Link
                        to='/forget'
                        className='sm:font-medium font-medium sm:text-[14px] text-indigo-900 sm:text-indigo-900 sm:hover:text-slate-950 sm:duration-100'
                      >
                        Forgot your password ?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Sign in
                    </button>
                  </div>
                  {showErrorMessage && (!email || !password) && (
                    <div className='text-red-500 text-sm mt-2'>
                      Please fill in both email and password fields.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

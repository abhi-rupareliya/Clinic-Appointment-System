import React, { useState } from "react";
import Logo from "../Images/logo.png";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [roleError, setRoleError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    // Validation for User Name
    if (!userName.trim()) {
      setUserNameError("Invalid user name");
      isValid = false;
    } else {
      setUserNameError("");
    }

    // Validation for Email
    if (
      !email.trim() ||
      !email.includes("@") ||
      (!email.includes(".com") && !email.includes(".in"))
    ) {
      setEmailError("Invalid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validation for Password
    if (
      !password.trim() ||
      !password.match(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
      )
    ) {
      setPasswordError("Invalid password format");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validation for Role
    if (!Role) {
      setRoleError("Please select a role");
      isValid = false;
    } else {
      setRoleError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowErrorMessage(true);
      return;
    }
    // fetch call to backend
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName, email, password, role: Role }),
      });
      if (response.status === 201) {
        handleShowToast("User added successfully", "success");
        // navigate to previous page
        navigate("/");
      } else {
        handleShowToast("User already exists", "error");
      }
    } catch (error) {
      handleShowToast(error.message, "error");
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
      <div className='Background bg-slate-400 bg-cover relative h-screen'>
        <div className='flex justify-center items-center h-full'>
          <Toaster />
          <div className='Card bg-slate-300 flex flex-col justify-center m-auto items-center w-4/5 sm:h-auto sm:w-2/5 shadow-custom6 drop-shadow-md sm:py-2 py-2 sm:px-6 lg:px-8 backdrop-blur-md rounded-2xl'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md mix-blend-multiply'>
              <img
                className='m-auto mt-2 h-12 w-auto mix-blend-multiply rounded-md'
                src={Logo}
                alt='Your Company'
              />
              <h2 className=' text-center mt-5 sm:text-3xl text-2xl font-bold tracking-tight text-gray-900'>
                Sign up for account
              </h2>
            </div>

            <div className=' sm:mx-auto sm:w-full sm:max-w-md'>
              <div className='bg-transparent py-8 sm:rounded-lg sm:px-10'>
                <form className='space-y-6' action='#' method='POST'>
                  <div>
                    <label
                      htmlFor='usrname'
                      className='block text-sm font-medium text-gray-700'
                    >
                      User Name
                    </label>
                    <div className='mt-1'>
                      <input
                        id='usrname'
                        name='usrname'
                        type='usrname'
                        autoComplete='usrname'
                        value={userName}
                        placeholder='User_Name'
                        onChange={(e) => setUserName(e.target.value)}
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                    {userNameError && (
                      <span className='text-red-500 text-sm'>
                        {userNameError}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email
                    </label>
                    <div className='mt-1'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        value={email}
                        placeholder='example@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
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
                        autoComplete='current-password'
                        value={password}
                        placeholder='********'
                        onChange={(e) => setPassword(e.target.value)}
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
                        Select Account Role
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
                        <option value=''>Select Role</option>
                        <option value='doctor'>Doctor</option>
                        <option value='receptionist'>Receptionist</option>
                      </select>
                      {roleError && (
                        <span className='text-red-500 text-sm'>
                          {roleError}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleSubmit}
                      className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Sign up
                    </button>
                    {showErrorMessage &&
                      (!userName || !email || !password || !Role) && (
                        <div className='text-red-500 text-sm mt-2'>
                          Please fill in all fields.
                        </div>
                      )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
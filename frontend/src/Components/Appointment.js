import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Appointment() {
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const inputData = {
    name: "",
    phone: 0,
    email: "",
    gender: "",
    date_registration: Date.now(),
    age: 0,
    address: "",
  };
  const [data, setData] = useState(inputData);

  const navigate = useNavigate();

  const handleData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    // Reset all error states
    setNameError("");
    setPhoneError("");
    setGenderError("");
    setEmailError("");
    // setTimeslotError("");
    setAgeError("");
    setAddressError("");
    setGeneralError("");

    // Perform validation
    let isValid = true;

    // Name validation
    if (!data.name.trim()) {
      setNameError("Full name is required");
      isValid = false;
    }

    // Phone validation (assuming it's a number)
    // if (!data.phone.toString().trim()) {
    //   setPhoneError("Mobile number is required");
    //   isValid = false;
    // }

    // Age validation (assuming it's a number)
    if (data.age <= 0) {
      setAgeError("Age must be a positive number");
      isValid = false;
    }

    // Phone validation (assuming it's a number)
    if (data.phone <= 0) {
      setPhoneError("Mobile number is required");
      isValid = false;
    }

    // Gender validation
    if (!data.gender.trim()) {
      setGenderError("Gender is required");
      isValid = false;
    }

    // Email validation
    if (
      !data.email.trim() ||
      !data.email.includes("@") ||
      !data.email.includes(".")
    ) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    // Timeslot validation (if required)
    // You can add validation logic for timeslot here

    // Age validation (assuming it's a number)
    // if (!data.age.toString().trim()) {
    //   setAgeError("Age is required");
    //   isValid = false;
    // }

    // Address validation
    if (!data.address.trim()) {
      setAddressError("Address is required");
      isValid = false;
    }

    if (!isValid) {
      setGeneralError("Please fill in all required fields");
      return false;
    }

    return true;
  };

  const apiURL = process.env.REACT_APP_API + "/patient";
  const handleSubmit = (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      // If all validations passed, proceed to axios post request
      axios
        .post(apiURL, data)
        .then((response) => {
          console.log(response);
          // Redirect to the desired page upon successful submission
          navigate("/receptiondashb");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  console.log(generalError);

  const timeslots = [
    { id: 1, time: "10:00 AM" },
    { id: 2, time: "10:30 AM" },
    { id: 3, time: "11:00 AM" },
    { id: 4, time: "4:00 PM" },
    { id: 5, time: "4:30 AM" },
    { id: 6, time: "5:00 AM" },
    { id: 7, time: "5:30 AM" },
    { id: 8, time: "6:00 AM" },
    { id: 9, time: "6:30 AM" },
    { id: 10, time: "7:00 AM" },
  ];

  let tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  tomorrow = tomorrow.toISOString().slice(0, 10);
  // console.log(tomorrow);

  let afterweek = new Date();
  afterweek.setDate(new Date().getDate() + 15);
  afterweek = afterweek.toISOString().slice(0, 10);

  return (
    <>
      <section className='bg-slate-100 md:pt-7 object-top bg-cover'>
        <div className='backdrop-blur-sm bg-opacity-60'>
          <Navbar />
          <form className='space-y-8 divide-y divide-gray-200 p-20'>
            <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
              <div className='space-y-6 sm:space-y-5'>
                <div>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    Personal Information
                  </h3>
                </div>
                <div className='space-y-6 sm:space-y-5'>
                  <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Full name
                    </label>
                    <div className='mt-1 sm:col-span-2 sm:mt-0'>
                      <input
                        type='text'
                        name='name'
                        id='first-name'
                        autoComplete='given-name'
                        placeholder='First Middle Last'
                        className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                        value={data.name}
                        onChange={handleData}
                      />
                      {nameError && (
                        <p className='mt-2 text-sm text-red-600'>{nameError}</p>
                      )}
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Mobile Number
                    </label>
                    <div className='mt-1 sm:col-span-2 sm:mt-0'>
                      <input
                        type='tel'
                        name='phone'
                        id='phone'
                        autoComplete='family-name'
                        placeholder='+910000000000'
                        className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                        onChange={handleData}
                        value={data.phone === 0 ? "" : data.phone}
                      />
                      {phoneError && (
                        <p className='mt-2 text-sm text-red-600'>
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='gender'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Gender
                    </label>
                    <div className='mt-1 sm:col-span-2 sm:mt-0'>
                      <input
                        type='text'
                        name='gender'
                        id='gender'
                        autoComplete='given-name'
                        placeholder='male / female'
                        className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                        value={data.gender}
                        onChange={handleData}
                      />
                      {genderError && (
                        <p className='mt-2 text-sm text-red-600'>
                          {genderError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Email address
                    </label>
                    <div className='mt-1 sm:col-span-2 sm:mt-0'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        placeholder='example@gmail.com'
                        className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                        onChange={handleData}
                        value={data.email}
                      />
                      {emailError && (
                        <p className='mt-2 text-sm text-red-600'>
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='timeslot'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Available Time Slot and Date
                    </label>
                    <div className='mt-1 sm:col-span-2 sm:mt-0 flex space-x-8'>
                      <select
                        id='timeslot'
                        name='timeslot'
                        autoComplete='timeslot'
                        className='w-32 block max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                        // onChange={handleData}
                        // value={data.timeslot}
                      >
                        {timeslots.map((timeslot) => (
                          <option key={timeslot.id}>{timeslot.time}</option>
                        ))}
                      </select>
                      <input
                        className='max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                        type='date'
                        id='birthday'
                        name='birthday'
                        min={tomorrow}
                        max={afterweek}
                      ></input>
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='age'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Age
                    </label>
                    <div className='mt-1 sm:col-span-2 sm:mt-0'>
                      <input
                        type='number'
                        name='age'
                        id='age'
                        autoComplete='address-level2'
                        placeholder='Enter Age'
                        className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                        onChange={handleData}
                        value={data.age === 0 ? "" : data.age}
                      />
                      {ageError && (
                        <p className='mt-2 text-sm text-red-600'>{ageError}</p>
                      )}
                    </div>
                  </div>

                  <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='address'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Address
                    </label>
                    <div className='mt-1 sm:col-span-2 sm:mt-0'>
                      <textarea
                        name='address'
                        id='address'
                        autoComplete='address'
                        placeholder='h-no, village, landmark, district'
                        className='block h-20 resize-y w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                        onChange={handleData}
                        value={data.address}
                      ></textarea>
                      {addressError && (
                        <p className='mt-2 text-sm text-red-600'>
                          {addressError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='pt-5'>
              <div className='flex justify-end'>
                <Link to={"/"}>
                  <button
                    type='button'
                    className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type='submit'
                  className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  onClick={handleSubmit}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Appointment;

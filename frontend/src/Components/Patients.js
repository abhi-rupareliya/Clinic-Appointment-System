import React from "react";
import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Navigation";

const getURL = "http://localhost:4000/";

function Patients() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const cancelButtonRef = useRef(null);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [people, setPeople] = useState([]);
  const [deletionID, setDeletionID] = useState(0);
  const [updationID, setUpdatetionID] = useState(0);
  const [currentPatient, setCurrentPatient] = useState({});
  const [isUpdating, setIsUpdating] = useState(false); // eslint-disable-line no-unused-vars
  const [nameError, setNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [generalError, setGeneralError] = useState(""); // eslint-disable-line no-unused-vars
  const [addressError, setAddressError] = useState("");
  const [schedulePatient, setSchedulePatient] = useState(0);
  const [isScheduling, setIsScheduling] = useState(false); // eslint-disable-line no-unused-vars
  const nav = useNavigate();

  const insert = () => {
    axios
      .get(getURL + "patient")
      .then((response) => {
        console.log(response);
        setPeople(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    insert();
  }, []);

  const handleUpdate = (personId) => {
    axios
      .get(`${getURL}patient/${personId}`)
      .then((response) => {
        console.log(response);
        setCurrentPatient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setOpenEdit(true);
    setUpdatetionID(personId);
  };

  const validateForm = (data) => {
    var isValid = true;
    setNameError("");
    setGenderError("");
    setPhoneError("");
    setEmailError("");
    setAgeError("");
    setGeneralError("");
    setAddressError("");

    // Validate fields
    if (data.name === undefined || data.name === "") {
      setNameError("Name is required");
      isValid = false;
    }
    if (data.gender === undefined || data.gender === "") {
      setGenderError("Gender is required");
      isValid = false;
    }
    if (data.phone === undefined || data.phone === "") {
      setPhoneError("Phone number is required");
      isValid = false;
    }
    if (data.email === undefined || data.email === "") {
      setEmailError("Email address is required");
      isValid = false;
    }
    if (data.age === undefined || data.age === "") {
      setAgeError("Age is required");
      isValid = false;
    }
    if (data.address === undefined || data.address === "") {
      setAddressError("Address is required");
      isValid = false;
    }
    return isValid;
  };

  const updateRecord = (changedData) => {
    if (!validateForm(changedData)) {
      return;
    }

    axios
      .put(`${getURL}patient/${updationID}`, changedData)
      .then((response) => {
        console.log("Patient updated successfully:", response);
        setOpenEdit(false);
        setPeople((prevPeople) =>
          prevPeople.map((person) =>
            person._id === updationID ? { ...person, ...changedData } : person
          )
        );
        handleShowToast("Patient updated successfully", "success");
      })
      .catch((error) => {
        handleShowToast(error.response.data.errors[0], "error");
      });
  };

  const handleDelete = (personId) => {
    setOpenDelete(true);
    setDeletionID(personId);
  };

  const deleteRecord = () => {
    axios
      .delete(`${getURL}patient/${deletionID}`)
      .then((response) => {
        console.log(response);
        setPeople(people.filter((person) => person._id !== deletionID));
        handleShowToast("Patient deleted successfully", "success");
      })
      .catch((error) => {
        console.log(error);
        handleShowToast("Error deleting patient", "error");
      });
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
  const handleSchedule = (person) => {
    setOpenSchedule(true);
    setSchedulePatient(person);
  };

  const scheduleRecord = (insertedData) => {
    axios
      .post(`${getURL}appointment`, insertedData)
      .then((response) => {
        console.log("Schduled succesfully : ", response);
        setOpenSchedule(false);
        handleShowToast("Patient scheduled successfully", "success");
      })
      .catch((error) => {
        console.log("error in scheduling : ", error);
        handleShowToast("Error scheduling patient", "error");
      });
  };

  return (
    <>
      {/* <div> */}
      <Sidebar />
      <div className='flex flex-1 flex-col md:pl-64'>
        <main className='flex-1'>
          <div className='py-6'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'></div>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
              <div className='py-4'>
                <div className='h-auto'>
                  <>
                    <div className='px-4 sm:px-6 lg:px-8'>
                      <div className='sm:flex sm:items-center'>
                        <Toaster />
                        <div className='sm:flex-auto'>
                          <h1 className='text-xl font-semibold text-gray-900'>
                            Patients Details
                          </h1>
                        </div>
                        <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                          <button
                            type='button'
                            className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                            onClick={(e) => {
                              e.preventDefault();
                              nav("/add-patient");
                            }}
                          >
                            Add Patient
                          </button>
                        </div>
                      </div>
                      <div className='mt-8 flex flex-col'>
                        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                              <table className='min-w-full divide-y divide-gray-300'>
                                <thead className='bg-gray-50'>
                                  <tr>
                                    <th
                                      scope='col'
                                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                                    >
                                      Name
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Mobile Number
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Email
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Gender
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Age
                                    </th>
                                    {/* <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Date
                                    </th> */}
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Schedule
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Edit
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Delete
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='bg-white'>
                                  {people.map((person, personIdx) => (
                                    <tr
                                      key={person._id}
                                      className={
                                        personIdx % 2 === 0
                                          ? undefined
                                          : "bg-gray-50"
                                      }
                                    >
                                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                        {person.name}
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        {person.phone}
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        {person.email}
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        {person.gender}
                                      </td>
                                      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                        {person.age}
                                      </td>
                                      {/* <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                        {person.date_registration}
                                      </td> */}
                                      <td className='relative text-blue-500 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                        <button
                                          key={person._id}
                                          onClick={() => handleSchedule(person)}
                                        >
                                          Schedule
                                        </button>
                                      </td>
                                      <td className='relative text-blue-500 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                        <button
                                          key={person._id}
                                          onClick={() =>
                                            handleUpdate(person._id)
                                          }
                                        >
                                          Edit
                                        </button>
                                      </td>
                                      <td className='relative text-red-500 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                        <button
                                          key={person._id}
                                          onClick={() =>
                                            handleDelete(person._id)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Transition.Root show={openEdit} as={Fragment}>
                      <Dialog
                        as='div'
                        className='relative z-30'
                        initialFocus={cancelButtonRef}
                        onClose={() => {
                          setOpenEdit(false);
                          setNameError("");
                          setGenderError("");
                          setPhoneError("");
                          setEmailError("");
                          setAgeError("");
                          setGeneralError("");
                          setAddressError("");
                        }}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter='ease-out duration-300'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                        </Transition.Child>

                        <div className='fixed inset-0 z-10 overflow-y-auto'>
                          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                            <Transition.Child
                              as={Fragment}
                              enter='ease-out duration-300'
                              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                              enterTo='opacity-100 translate-y-0 sm:scale-100'
                              leave='ease-in duration-200'
                              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            >
                              <Dialog.Panel className='relative rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:m-5 xl:mx-64'>
                                <form
                                  className='space-y-8 divide-y divide-gray-200 px-20 py-10'
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    updateRecord({
                                      name: document.getElementById("name")
                                        .value,
                                      phone:
                                        document.getElementById("phone").value,
                                      email:
                                        document.getElementById("email").value,
                                      age: document.getElementById("age").value,
                                      address:
                                        document.getElementById("address")
                                          .value,
                                    });
                                  }}
                                >
                                  <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                                    <div className='space-y-6 sm:space-y-5'>
                                      <div>
                                        <h3 className='text-lg font-medium leading-6 text-gray-900'>
                                          Patient Information
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
                                              id='name'
                                              value={currentPatient.name}
                                              onChange={(e) => {
                                                setCurrentPatient({
                                                  ...currentPatient,
                                                  name: e.target.value,
                                                });
                                              }}
                                              autoComplete='given-name'
                                              className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                                            />
                                            {nameError && (
                                              <div className='text-red-500'>
                                                {nameError}
                                              </div>
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
                                            <div className='flex items-center space-x-4'>
                                              <label className='inline-flex items-center'>
                                                <input
                                                  type='radio'
                                                  name='gender'
                                                  value='male'
                                                  checked={
                                                    currentPatient.gender ===
                                                    "male"
                                                  }
                                                  onChange={(e) => {
                                                    setCurrentPatient({
                                                      ...currentPatient,
                                                      gender: e.target.value,
                                                    });
                                                  }}
                                                  className='form-radio h-5 w-5 text-indigo-600'
                                                />
                                                <span className='ml-2'>
                                                  Male
                                                </span>
                                              </label>

                                              <label className='inline-flex items-center'>
                                                <input
                                                  type='radio'
                                                  name='gender'
                                                  value='female'
                                                  checked={
                                                    currentPatient.gender ===
                                                    "female"
                                                  }
                                                  onChange={(e) => {
                                                    setCurrentPatient({
                                                      ...currentPatient,
                                                      gender: e.target.value,
                                                    });
                                                  }}
                                                  className='form-radio h-5 w-5 text-indigo-600'
                                                />
                                                <span className='ml-2'>
                                                  Female
                                                </span>
                                              </label>

                                              <label className='inline-flex items-center'>
                                                <input
                                                  type='radio'
                                                  name='gender'
                                                  value='other'
                                                  checked={
                                                    currentPatient.gender ===
                                                    "other"
                                                  }
                                                  onChange={(e) => {
                                                    setCurrentPatient({
                                                      ...currentPatient,
                                                      gender: e.target.value,
                                                    });
                                                  }}
                                                  className='form-radio h-5 w-5 text-indigo-600'
                                                />
                                                <span className='ml-2'>
                                                  Other
                                                </span>
                                              </label>
                                              {genderError && (
                                                <div className='text-red-500'>
                                                  {genderError}
                                                </div>
                                              )}
                                            </div>
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
                                              value={currentPatient.phone}
                                              onChange={(e) => {
                                                setCurrentPatient({
                                                  ...currentPatient,
                                                  phone: e.target.value,
                                                });
                                              }}
                                              autoComplete='family-name'
                                              className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                                            />
                                            {phoneError && (
                                              <div className='text-red-500'>
                                                {phoneError}
                                              </div>
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
                                              value={currentPatient.email}
                                              onChange={(e) => {
                                                setCurrentPatient({
                                                  ...currentPatient,
                                                  email: e.target.value,
                                                });
                                              }}
                                              autoComplete='email'
                                              className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                                            />
                                            {emailError && (
                                              <div className='text-red-500'>
                                                {emailError}
                                              </div>
                                            )}
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
                                              value={currentPatient.age}
                                              onChange={(e) => {
                                                setCurrentPatient({
                                                  ...currentPatient,
                                                  age: e.target.value,
                                                });
                                              }}
                                              autoComplete='address-level2'
                                              className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                                            />
                                            {ageError && (
                                              <div className='text-red-500'>
                                                {ageError}
                                              </div>
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
                                              value={currentPatient.address}
                                              onChange={(e) => {
                                                setCurrentPatient({
                                                  ...currentPatient,
                                                  address: e.target.value,
                                                });
                                              }}
                                              autoComplete='address'
                                              className='block h-20 resize-y w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                                            ></textarea>
                                            {addressError && (
                                              <div className='text-red-500'>
                                                {addressError}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='bg-gray-50 py-3 flex flex-row-reverse px-6 rounded-xl gap-x-5'>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        updateRecord(currentPatient);
                                      }}
                                      type='submit'
                                      disabled={isUpdating}
                                      className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                    >
                                      {isUpdating ? "Updating..." : "Update"}
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenEdit(false);
                                        setNameError("");
                                        setGenderError("");
                                        setPhoneError("");
                                        setEmailError("");
                                        setAgeError("");
                                        setGeneralError("");
                                        setAddressError("");
                                      }}
                                      type='button'
                                      className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>

                    <Transition.Root show={openDelete} as={Fragment}>
                      <Dialog
                        as='div'
                        className='relative z-10'
                        initialFocus={cancelButtonRef}
                        onClose={setOpenDelete}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter='ease-out duration-300'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <div className='fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity' />
                        </Transition.Child>
                        <div className='fixed inset-0 z-10 overflow-y-auto'>
                          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                            <Transition.Child
                              as={Fragment}
                              enter='ease-out duration-300'
                              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                              enterTo='opacity-100 translate-y-0 sm:scale-100'
                              leave='ease-in duration-200'
                              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            >
                              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 content-center '>
                                  <div className='flex justify-center'>
                                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                      <Dialog.Title
                                        as='h3'
                                        className='text-lg font-bold text-center leading-6 text-gray-900'
                                      >
                                        Remove Patient
                                      </Dialog.Title>
                                      <div className='mt-2'>
                                        <div className='grid justify-center p-3 md:gap-5'>
                                          <div className='relative z-0 w-full group text-center'>
                                            Are you sure, you want to remove
                                            this patient Details?
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row space-x-11 justify-center'>
                                  <button
                                    type='button'
                                    className='inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      deleteRecord();
                                      setOpenDelete(false);
                                    }}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type='button'
                                    className='inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      setOpenDelete(false);
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>

                    <Transition.Root show={openSchedule} as={Fragment}>
                      <Dialog
                        as='div'
                        className='relative z-30'
                        initialFocus={cancelButtonRef}
                        onClose={() => {
                          setOpenSchedule(false);
                          // setNameError("");
                          // setGenderError("");
                          // setPhoneError("");
                          // setEmailError("");
                          // setAgeError("");
                          // setGeneralError("");
                          // setAddressError("");
                        }}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter='ease-out duration-300'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                        </Transition.Child>

                        <div className='fixed inset-0 z-10 overflow-y-auto'>
                          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                            <Transition.Child
                              as={Fragment}
                              enter='ease-out duration-300'
                              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                              enterTo='opacity-100 translate-y-0 sm:scale-100'
                              leave='ease-in duration-200'
                              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            >
                              <Dialog.Panel className='relative rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:m-5 xl:mx-64'>
                                <form
                                  className='space-y-8 divide-y divide-gray-200 px-20 py-10'
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    scheduleRecord({
                                      patient: schedulePatient._id,
                                      status:
                                        document.getElementById("status").value,
                                      timestamp: Date.now(),
                                    });
                                  }}
                                >
                                  <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                                    <div className='space-y-6 sm:space-y-5'>
                                      <div>
                                        <h3 className='text-lg font-medium leading-6 text-gray-900'>
                                          Patient Scheduling
                                        </h3>
                                      </div>
                                      <div className='space-y-6 sm:space-y-5'>
                                        <div className='sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                          <label
                                            htmlFor='name'
                                            className='block text-sm font-medium text-gray-700 sm:mt-px'
                                          >
                                            Patient Name
                                          </label>
                                          <div className='mt-1 sm:col-span-2 sm:mt-0'>
                                            <p className='block w-full max-w-lg rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'>
                                              {schedulePatient.name}
                                            </p>
                                          </div>
                                        </div>
                                        <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                          <label
                                            htmlFor='phone'
                                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                                          >
                                            Status
                                          </label>
                                          <div className='mt-1 sm:col-span-2 sm:mt-0'>
                                            <select
                                              name='status'
                                              id='status'
                                              className='w-32 block max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
                                            >
                                              <option>pending</option>
                                              <option>in</option>
                                              <option>reject</option>
                                            </select>
                                          </div>
                                        </div>

                                        <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                          <label
                                            htmlFor='email'
                                            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                                          >
                                            Time Slots
                                          </label>
                                          <div className='mt-1 sm:col-span-2 sm:mt-0 flex gap-x-5'>
                                            <input
                                              type='time'
                                              id='time'
                                              step='60'
                                            />

                                            <button
                                              id='currentTime'
                                              name='currentTime'
                                              onClick={(time) => {
                                                time.preventDefault();
                                                document.getElementById("time").value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                                              }}
                                              className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                            >
                                              Current time
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='bg-gray-50 py-3 flex flex-row-reverse px-6 rounded-xl gap-x-5'>
                                    <button
                                      type='submit'
                                      disabled={isScheduling}
                                      className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                    >
                                      {isScheduling
                                        ? "Scheduling..."
                                        : "Schedule"}
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenSchedule(false);
                                      }}
                                      type='button'
                                      className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>
                  </>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Patients;

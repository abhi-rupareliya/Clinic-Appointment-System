import React from "react";
import Sidebar from "./Navigation";
import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";
import axios from "axios";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
const getURL = process.env.REACT_APP_API + "/";

function PreviousRecord() {
  const [openDetails, setOpenDetails] = useState(false);
  const cancelButtonRef = useRef(null);
  const [people, setPeople] = useState([]);
  const [peopleCopy, setPeopleCopy] = useState([]);
  const [currentPatient, setCurrentPatient] = useState({});
  const [tabs, setTabs] = useState([]);
  const [currentApp, setCurrentApp] = useState();

  const insert = () => {
    axios
      .get(getURL + "patient")
      .then((response) => {
        console.log(response);
        setPeople(response.data);
        setPeopleCopy(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    insert();
  }, []);

  const handeDetails = (personId) => {
    axios
      .get(`${getURL}patient/${personId}`)
      .then((response) => {
        setCurrentPatient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${getURL}appointment/p/${personId}`)
      .then((response) => {
        setTabs(response.data);
        if (response.data.length !== 0) {
          setCurrentApp(response.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setOpenDetails(true);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSearch = (searchKey) => {
    const filteredPeople = peopleCopy.filter((person) => {
      return person.name.toLowerCase().includes(searchKey.toLowerCase());
    });
    setPeople(filteredPeople);
  };

  return (
    <>
      <Sidebar />
      <div>
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
                          <div className='sm:flex-auto'>
                            <h1 className='text-xl font-semibold text-gray-900'>
                              Previous Records
                            </h1>
                          </div>
                          <div>
                            <p
                              htmlFor='email'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Search Patients
                            </p>
                            <div className='mt-1 flex rounded-md shadow-sm'>
                              <div className='relative flex flex-grow items-stretch focus-within:z-10'>
                                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                                  <UsersIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </div>
                                <input
                                  id='search'
                                  className='block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                  placeholder='Enter Here'
                                  onChange={(e) => {
                                    handleSearch(e.target.value);
                                  }}
                                />
                              </div>
                              <button
                                type='button'
                                className='relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                              >
                                <MagnifyingGlassIcon
                                  className='h-5 w-5 text-gray-400'
                                  aria-hidden='true'
                                />
                              </button>
                            </div>
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
                                      <th
                                        scope='col'
                                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                      >
                                        Date
                                      </th>
                                      <th
                                        scope='col'
                                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                      >
                                        Details
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
                                        <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                          {new Date(person.date_registration).toLocaleDateString() + "-" + new Date(person.date_registration).toLocaleTimeString()}
                                        </td>
                                        <td className='relative text-blue-500 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                          <button
                                            key={person._id}
                                            onClick={() => {
                                              handeDetails(person._id);
                                            }}
                                          >
                                            <ChevronDoubleRightIcon
                                              className='h-5 w-5  text-blue-500'
                                              aria-hidden='true'
                                            />
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
                      <Transition.Root show={openDetails} as={Fragment}>
                        <Dialog
                          as='div'
                          className='relative z-30'
                          initialFocus={cancelButtonRef}
                          onClose={() => {
                            setOpenDetails(false);
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

                          <div
                            auto
                            className='fixed inset-0 z-10 overflow-y-auto'
                          >
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
                                    }}
                                  >
                                    <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
                                      {tabs.length !== 0 ? (
                                        <div className='space-y-6 sm:space-y-5'>
                                          <div>
                                            <h3
                                              autoFocus
                                              className='text-lg font-medium leading-6 text-gray-900'
                                            >
                                              Patient Information
                                              <Link
                                                to='/'
                                                className='h-0 w-0'
                                                autoFocus
                                              />{" "}
                                              {/* for focus on top jugad */}
                                            </h3>
                                          </div>
                                          <div className='space-y-6 sm:space-y-5 '>
                                            <div className='relative'>
                                              <div
                                                className='absolute inset-0 flex items-center'
                                                aria-hidden='true'
                                              >
                                                <div className='w-full border-t border-gray-200' />
                                              </div>
                                              <div className='relative flex justify-center'>
                                                <span className='bg-white px-3 text-lg font-medium text-gray-900'>
                                                  Appointments Date
                                                </span>
                                              </div>
                                            </div>
                                            <div className='sm:hidden'>
                                              <label
                                                htmlFor='tabs'
                                                className='sr-only'
                                              >
                                                Select a tab
                                              </label>
                                              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                                              <select
                                                id='tabs'
                                                name='tabs'
                                                className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                                defaultValue={
                                                  currentApp
                                                    ? new Date(
                                                        currentApp.timestamp
                                                      ).toLocaleDateString() +
                                                      "-" +
                                                      new Date(
                                                        currentApp.timestamp
                                                      ).toLocaleTimeString()
                                                    : "-"
                                                }
                                              >
                                                {tabs.map((tab) => (
                                                  <option key={tab._id}>
                                                    {new Date(
                                                      tab.timestamp
                                                    ).toLocaleDateString() +
                                                      "-" +
                                                      new Date(
                                                        tab.timestamp
                                                      ).toLocaleTimeString()}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                            <div className='hidden sm:block'>
                                              <nav
                                                className='flex space-x-4'
                                                aria-label='Tabs'
                                              >
                                                {tabs.map((tab) => (
                                                  <Link
                                                    onClick={() => {
                                                      setCurrentApp(tab);
                                                    }}
                                                    key={tab._id}
                                                    //   to={tab.href}
                                                    className={classNames(
                                                      tab.current
                                                        ? "bg-gray-100 text-gray-700"
                                                        : "text-gray-500 hover:text-gray-700",
                                                      "px-3 py-2 font-medium text-sm rounded-md"
                                                    )}
                                                    aria-current={
                                                      tab.current
                                                        ? "page"
                                                        : undefined
                                                    }
                                                  >
                                                    {new Date(
                                                      tab.timestamp
                                                    ).toLocaleDateString() +
                                                      "-" +
                                                      new Date(
                                                        tab.timestamp
                                                      ).toLocaleTimeString()}
                                                  </Link>
                                                ))}
                                              </nav>
                                            </div>
                                            {/* <div className='sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                              <p
                                                htmlFor='name'
                                                className='block text-sm font-medium text-gray-700 sm:mt-px'
                                              >
                                                Full name
                                              </p>
                                              <div className='sm:justify-center sm:col-span-4 sm:mt-px'>
                                                <p className='text-sm text-gray-700 content-center'>
                                                  {currentPatient.name}
                                                </p>
                                              </div>
                                            </div> */}
                                            <div className='sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                              <p
                                                htmlFor='name'
                                                className='block text-sm font-medium text-gray-700 sm:mt-px'
                                              >
                                                Full name
                                              </p>
                                              <div className='sm:justify-center sm:col-span-4 sm:mt-px'>
                                                <p className='text-sm text-gray-700 content-center'>
                                                  {currentPatient.name}
                                                </p>
                                              </div>
                                            </div>
                                            <div className='sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                              <p
                                                htmlFor='gender'
                                                className='block text-sm font-medium text-gray-700 sm:mt-px'
                                              >
                                                Gender
                                              </p>
                                              <p className='text-sm text-gray-700 content-center sm:col-span-4 capitalize'>
                                                {currentPatient.gender}
                                              </p>
                                            </div>
                                            <div className='sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                              <p
                                                htmlFor='age'
                                                className='block text-sm font-medium text-gray-700 sm:mt-px'
                                              >
                                                Age
                                              </p>
                                              <p className='text-sm text-gray-700 content-center sm:col-span-4'>
                                                {currentPatient.age}
                                              </p>
                                            </div>
                                            {currentApp ? (
                                              <>
                                                <div className='sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                                  <p
                                                    htmlFor='diagnosis'
                                                    className='block text-sm font-medium text-gray-700 sm:mt-px'
                                                  >
                                                    Diagnosis
                                                  </p>
                                                  <p className='text-sm text-gray-700 content-center sm:col-span-4'>
                                                    {currentApp &&
                                                    currentApp.diagnosis
                                                      ? currentApp.diagnosis
                                                      : "-    "}
                                                  </p>
                                                </div>
                                                <div className='sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                                  <p
                                                    htmlFor='address'
                                                    className='block text-sm font-medium text-gray-700 sm:mt-px'
                                                  >
                                                    Treatment
                                                  </p>
                                                  <p className='text-sm text-gray-700 content-center sm:col-span-4'>
                                                    {currentApp &&
                                                    currentApp.treatment
                                                      ? currentApp.treatment
                                                      : "-    "}
                                                  </p>
                                                </div>
                                                <div className='sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
                                                  <p
                                                    htmlFor='remark'
                                                    className='block text-sm font-medium text-gray-700 sm:mt-px'
                                                  >
                                                    Remark
                                                  </p>
                                                  <p className='text-sm text-gray-700 content-center sm:col-span-4'>
                                                    {currentApp &&
                                                    currentApp.remarks
                                                      ? currentApp.remarks
                                                      : "-    "}
                                                  </p>
                                                </div>
                                              </>
                                            ) : (
                                              <p>
                                                No data found for this patient
                                              </p>
                                            )}
                                          </div>
                                          <div className='mt-8 flex flex-col'>
                                            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                                              <div className='w-full py-2 align-middle md:px-6 lg:px-8'>
                                                {currentApp.Prescriptions
                                                  .length !== 0 ? (
                                                  <div
                                                    className='overflow-hidden  md:rounded-lg'
                                                    id='prescription'
                                                  >
                                                    <table className='min-w-full divide-y divide-gray-300'>
                                                      <thead className='bg-gray-50'>
                                                        <tr className='rounded-2xl'>
                                                          <th
                                                            scope='col'
                                                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                                                          >
                                                            Sr. No.
                                                          </th>
                                                          <th
                                                            scope='col'
                                                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                                          >
                                                            Medicine
                                                          </th>
                                                          <th
                                                            scope='col'
                                                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                                          >
                                                            Dosage
                                                          </th>
                                                          <th
                                                            scope='col'
                                                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                                          >
                                                            Before/After
                                                          </th>

                                                          <th
                                                            scope='col'
                                                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-20'
                                                          >
                                                            Day
                                                          </th>
                                                        </tr>
                                                      </thead>
                                                      <tbody className='divide-y divide-gray-200 bg-white'>
                                                        {currentApp.Prescriptions.map(
                                                          (prsc, idx) => {
                                                            return (
                                                              <tr>
                                                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                                                  {idx + 1}
                                                                </td>
                                                                <td className='whitespace-wrap px-3 py-4 text-sm text-gray-500'>
                                                                  <div className='flex max-w-lg rounded-lg'>
                                                                    <p className='w-full sm:text-sm'>
                                                                      {
                                                                        prsc.name
                                                                      }
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                                                  <div className='flex max-w-lg rounded-lg'>
                                                                    <p className='w-full sm:text-sm'>
                                                                      {prsc.morning
                                                                        ? " 1 -"
                                                                        : " 0 -"}
                                                                      {prsc.afternoon
                                                                        ? " 1 -"
                                                                        : " 0 -"}
                                                                      {prsc.night
                                                                        ? " 1 "
                                                                        : " 0 "}
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                                                  <div className='flex max-w-lg rounded-lg'>
                                                                    <p className='w-full sm:text-sm'>
                                                                      {prsc.before
                                                                        ? "Before meal"
                                                                        : "After meal"}
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                                                  <div className='flex'>
                                                                    <p className='w-full sm:text-sm'>
                                                                      {prsc.day}
                                                                    </p>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            );
                                                          }
                                                        )}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                ) : (
                                                  <p>prescription : -</p>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <p>No Data found</p>
                                      )}
                                    </div>
                                    <div className='bg-gray-50 py-3 flex flex-row-reverse px-6 rounded-xl gap-x-5'>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenDetails(false);
                                        }}
                                        className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                      >
                                        Done
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
      </div>
    </>
  );
}

export default PreviousRecord;

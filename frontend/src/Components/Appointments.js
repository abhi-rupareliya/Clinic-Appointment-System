import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Navigation";
const getURL = process.env.REACT_APP_API+"/";

function Appointments() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [appointments, setAppointments] = useState([]);
  const [all, setAll] = useState([]);
  const nav = useNavigate();

  const insert = () => {
    fetch(getURL + "appointment").then((response) => {
      response.json().then((result) => {
        setAppointments(result);
        setAll(result);
      });
    });
  };
  useEffect(() => {
    insert();
  }, []);

  const handleSearch = (search) => {
    if (search === "") {
      setAppointments(all);
    } else {
      const filtered = all.filter((app) => {
        return app.Patient.name.toLowerCase().includes(search.toLowerCase());
      });
      setAppointments(filtered);
    }
  };

  return (
    <>
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
                        <div className='sm:flex-auto'>
                          <h1 className='text-xl font-semibold text-gray-900'>
                            Appointments
                          </h1>
                        </div>
                        <div>
                          <p className='block text-sm font-medium text-gray-700'>
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
                                      Status
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
                                      Treatment
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='bg-white'>

                                  {Array.isArray(appointments) && appointments ? (appointments.map((app, idx) => (
                                    <tr
                                      key={app._id}
                                      className={
                                        idx % 2 === 0 ? undefined : "bg-gray-50"
                                      }
                                    >
                                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                        {app.Patient.name}
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        {app.Patient.phone}
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        {app.Patient.email}
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        {app.Patient.gender}
                                      </td>
                                      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                        {app.status}
                                      </td>
                                      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                        {app.timestamp}
                                      </td>
                                      <td className='relative text-blue-500 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
                                        <button
                                          key={app._id}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            nav(`/treatment/${app._id}`, {
                                              state: { app },
                                            });
                                          }}
                                        >
                                          <IdentificationIcon
                                            className='h-5 w-5  text-blue-500 '
                                            aria-hidden='true'
                                          />
                                        </button>
                                      </td>
                                    </tr>
                                  ))) : (<></>)}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Appointments;
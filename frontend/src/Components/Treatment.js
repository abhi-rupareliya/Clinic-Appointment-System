import React from "react";
import { useState, useEffect } from "react";
import PrintPrescriptionComponent from "./PrintPrescriptionComponent";
import ReactDOM from "react-dom";
import Sidebar from "./Navigation";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Treatment() {
  const api = process.env.REACT_APP_API;
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    const fetchAppointment = () => {
      try {
        fetch(`${api}/appointment/${id}`).then((response) => {
          response.json().then((result) => {
            setData(result);
          });
        });
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchAppointment();
  }, [api]);

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      name: "",
      day: 0,
      morning: false,
      afternoon: false,
      night: false,
      before: true,
      after: false,
    },
  ]);

  function addMore() {
    setPrescriptions((prevPrescriptions) => [
      ...prevPrescriptions,
      {
        id: Date.now(),
        name: "",
        day: 0,
        morning: false,
        afternoon: false,
        night: false,
        before: true,
        after: false,
      },
    ]);
  }

  function removeMedicine(index) {
    setPrescriptions((prevPrescriptions) => {
      const updatedPrescriptions = [...prevPrescriptions];
      updatedPrescriptions.splice(index, 1);
      return updatedPrescriptions;
    });
  }

  function handlePropertyChange(index, property, value) {
    setPrescriptions((prevPrescriptions) => {
      const updatedPrescriptions = [...prevPrescriptions];
      if (property === "increment") {
        updatedPrescriptions[index].day += 1;
      } else if (property === "decrement") {
        updatedPrescriptions[index].day = Math.max(
          0,
          updatedPrescriptions[index].day - 1
        );
      } else {
        updatedPrescriptions[index][property] = value;
      }

      return updatedPrescriptions;
    });
  }

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    // Render the PrintPrescriptionComponent in the new window
    ReactDOM.render(
      <PrintPrescriptionComponent
        prescriptionData={prescriptions}
        data={data}
        diagnosis={document.getElementById("diagnosis").value}
        treatments={document.getElementById("treatments").value}
      />,
      printWindow.document.body
    );
    // Print the new window
    printWindow.print();
    printWindow.close();
  };

  const handleSave = async () => {
    const diagnosis = document.getElementById("diagnosis").value;
    const treatment = document.getElementById("treatments").value;

    const prescription = prescriptions.map((prescription) => {
      const { id, ...rest } = prescription;
      return rest;
    });

    // remove empty prescriptions
    prescription.forEach((prc, index) => {
      if (prc.name === "" || prc.day === 0) {
        prescription.splice(index, 1);
      }
    });
    const id = window.location.pathname.split("/")[2];

    const data = {
      diagnosis,
      treatment,
      prescription,
      status: "completed",
    };

    try {
      fetch(`${api}/appointment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);
        });
        navigate("/appointments");
      });
    } catch (error) {
      console.error("Error saving treatment data:", error);
      toast.error("Error saving treatment data");
    }
  };

  return (
    <div>
      <Sidebar />
      <Toaster />
      {!data ? (
        <p>Loading...</p>
      ) : (
        <div className='flex flex-1 flex-col md:pl-64'>
          <main className='flex-1'>
            <div className='py-6'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'></div>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
                  <div className='flex px-4 py-5 sm:px-6 justify-between'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                      Patient Details
                    </h3>
                    <button
                      className='inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto'
                      onClick={() => {
                        handleSave();
                      }}
                    >
                      Save
                    </button>
                  </div>
                  <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
                    <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Name
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {data.Patient.name || "N/A"}
                        </dd>
                      </div>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Age
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {data.Patient.age || "N/A"}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Gender
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {data.Patient.gender || "N/A"}
                        </dd>
                      </div>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          App. Date
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {new Date(data.timestamp).toLocaleDateString() ||
                            "N/A"}
                        </dd>
                      </div>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          App. Time
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {new Date(data.timestamp).toLocaleTimeString() ||
                            "N/A"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
                    <dl className='grid grid-cols-1 gap-y-8 sm:grid-cols-2 divide-x-2'>
                      <div className='sm:col-span-1 p-3 justify-center flex'>
                        <div className='sm:w-[500px]'>
                          <label
                            htmlFor='comment'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Diagnosis
                          </label>
                          <div className='mt-1'>
                            <textarea
                              rows={7}
                              name='comment'
                              id='diagnosis'
                              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none'
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='sm:col-span-1 p-3 justify-center flex'>
                        <div className='sm:w-[500px]'>
                          <label
                            htmlFor='comment'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Treatments
                          </label>
                          <div className='mt-1'>
                            <textarea
                              rows={7}
                              name='comment'
                              id='treatments'
                              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none'
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    </dl>
                  </div>
                  <div className='flex sm:p-3 border-t border-gray-200 px-4 py-5 sm:px-6'>
                    <div className='px-4 sm:px-6 lg:px-8 w-full'>
                      <div className='sm:flex sm:items-center'>
                        <div className='sm:flex-auto'>
                          <h1 className='text-lg font-semibold text-gray-900'>
                            Prescriptions
                          </h1>
                        </div>
                      </div>
                      <div className='flex justify-end sm:pr-9 gap-x-4'>
                        <button
                          type='button'
                          className='inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto'
                          onClick={handlePrint}
                        >
                          Print
                        </button>

                        <button
                          type='button'
                          className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                          onClick={addMore}
                        >
                          Add More
                        </button>
                      </div>

                      <div className='mt-8 flex flex-col'>
                        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                          <div className='w-full py-2 align-middle md:px-6 lg:px-8'>
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
                                      Name of Prescription
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Day
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-20'
                                    >
                                      Morning
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-20'
                                    >
                                      Afternoon
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-20'
                                    >
                                      Night
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-20'
                                    >
                                      Before Meal
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-20'
                                    >
                                      After Meal
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                    >
                                      Remove
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200 bg-white'>
                                  {prescriptions.map((prescription, index) => (
                                    <tr key={prescription.id}>
                                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                        {index + 1}
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        <div className='flex max-w-lg rounded-lg shadow-sm'>
                                          <input
                                            type='text'
                                            name='medicine'
                                            id={`medicine-${index}`}
                                            autoComplete='medicine'
                                            className='block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                            value={prescription.name}
                                            onChange={(e) =>
                                              handlePropertyChange(
                                                index,
                                                "name",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        <div className='flex flex-row h-10 rounded-lg relative bg-transparent mt-1 '>
                                          <button
                                            data-action='decrement'
                                            className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-10 rounded-l cursor-pointer outline-none'
                                            onClick={() =>
                                              handlePropertyChange(
                                                index,
                                                "decrement"
                                              )
                                            }
                                          >
                                            <span className='m-auto text-2xl font-thin'>
                                              -
                                            </span>
                                          </button>
                                          <input
                                            type='number'
                                            className='w-14 outline-none focus:outline-none bg-white text-center text-md hover:text-black focus:text-black md:text-base cursor-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-gray-700'
                                            name={`quantity-${index}`}
                                            value={prescription.day}
                                            onChange={(e) =>
                                              handlePropertyChange(
                                                index,
                                                "day",
                                                e.target.value
                                              )
                                            }
                                          />
                                          <button
                                            data-action='increment'
                                            className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-10 rounded-l cursor-pointer outline-none'
                                            onClick={() =>
                                              handlePropertyChange(
                                                index,
                                                "increment"
                                              )
                                            }
                                          >
                                            <span className='m-auto text-2xl font-thin'>
                                              +
                                            </span>
                                          </button>
                                        </div>
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        <input
                                          id={`morning-${index}`}
                                          aria-describedby={`morning-${index}-description`}
                                          name={`morning-${index}`}
                                          type='checkbox'
                                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                          checked={prescription.morning}
                                          onChange={(e) =>
                                            handlePropertyChange(
                                              index,
                                              "morning",
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        <input
                                          id={`afternoon-${index}`}
                                          aria-describedby={`afternoon-${index}-description`}
                                          name={`afternoon-${index}`}
                                          type='checkbox'
                                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                          checked={prescription.afternoon}
                                          onChange={(e) =>
                                            handlePropertyChange(
                                              index,
                                              "afternoon",
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        <input
                                          id={`night-${index}`}
                                          aria-describedby={`night-${index}-description`}
                                          name={`night-${index}`}
                                          type='checkbox'
                                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                          checked={prescription.night}
                                          onChange={(e) =>
                                            handlePropertyChange(
                                              index,
                                              "night",
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        <div className='flex items-start'>
                                          <input
                                            id={`before-${index}`}
                                            name={`whentotake-${index}`}
                                            type='radio'
                                            value='before'
                                            checked={
                                              prescription.whentotake ===
                                              "before"
                                            }
                                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                            onChange={() =>
                                              handlePropertyChange(
                                                index,
                                                "whentotake",
                                                "before"
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        <div className='flex items-start'>
                                          <input
                                            id={`after-${index}`}
                                            name={`whentotake-${index}`}
                                            type='radio'
                                            value='after'
                                            checked={
                                              prescription.whentotake ===
                                              "after"
                                            }
                                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                            onChange={() =>
                                              handlePropertyChange(
                                                index,
                                                "whentotake",
                                                "after"
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                        <button
                                          type='button'
                                          className='inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto'
                                          onClick={() => removeMedicine(index)}
                                        >
                                          Remove
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
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default Treatment;

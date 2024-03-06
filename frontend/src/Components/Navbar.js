import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, Link } from "react-router-dom";
import Logo from "../Images/logo.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  let location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { name: "Home", path: "/user/home" },
    { name: "Book Appointment", path: "/appointment" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <div className='md:mx-36 md:rounded-full overflow-visible md:bg-white'>
      <Disclosure as='nav' className='bg-transparent'>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 backdrop-blur-3xl rounded-full'>
              <div className='relative flex h-16 justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex flex-shrink-0 items-center'>
                    <img
                      className='block h-8 w-auto lg:hidden rounded-full'
                      src={Logo}
                      alt='Your Company'
                    />
                    <img
                      className='hidden h-8 w-auto lg:block rounded-full'
                      src={Logo}
                      alt='Your Company'
                    />
                  </div>
                  <div className='hidden sm:ml-10 sm:flex sm:space-x-8'>
                    {links.map((link) => (
                      <Link
                        to={link.path}
                        className={classNames(
                          currentPath === link.path
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-500 hover:text-gray-700",
                          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 '>
                  <div className='justify-center'>
                    <Link
                      to='/login'
                      className='-mx-3 block rounded-lg py-2.5 px-5 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='space-y-1 pt-2 pb-4'>
                {/* Current: "" */}
                {links.map((link) => (
                  <Disclosure.Button
                    as={Link}
                    to={link.path}
                    // className=""
                    className={classNames(
                      currentPath === link.path
                        ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                        : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    )}
                  >
                    {link.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Homebody() {
  return (
    <>
      <main className='-z-10'>
        <div id='home' className='relative px-6 lg:px-8 h-screen'>
          <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:my-auto'>
            <div className='text-center'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                Ashirwad Dental Clinic
              </h1>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                "Smile Brighter: Your Geteway to Dental Excellence"
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <Link
                  to='/Appointment'
                  className='rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Book Appointment
                </Link>
                <a
                  href='#cause-heading'
                  className='text-base font-semibold leading-7 text-gray-900 scroll-smooth md:scroll-auto'
                >
                  Know More <span aria-hidden='true'>→</span>
                </a>
              </div>
            </div>
          </div>
          <div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-40 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
            <svg
              className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
              viewBox='0 0 1155 678'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)'
                fillOpacity='.3'
                d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
              />
              <defs>
                <linearGradient
                  id='ecb5b0c9-546c-4772-8c71-4d3f06d544bc'
                  x1='1155.49'
                  x2='-78.208'
                  y1='.177'
                  y2='474.645'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#9089FC' />
                  <stop offset={1} stopColor='#FF80B5' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Featured section */}
        <section aria-labelledby='cause-heading'>
          <div className='relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16'>
            <div className='absolute inset-0 overflow-hidden'>
              <img
                src='https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div
              aria-hidden='true'
              className='absolute inset-0 bg-gray-900 bg-opacity-50'
            />
            <div className='relative mx-auto flex max-w-3xl flex-col items-center text-center'>
              <h2
                id='cause-heading'
                className='text-3xl font-bold tracking-tight text-white sm:text-4xl'
              >
                About us
              </h2>
              <div className='containerCard'></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Homebody;

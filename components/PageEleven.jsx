import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout'
import InputField from '../components/InputField';
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import { useState } from 'react';
import PriceField from './PriceField';
import Minus from '../pages/images/minus.png'
import Plus from '../pages/images/plus.png'
import Link from 'next/link';
import logopic from '../public/images/qoo_logo.png';
import Head from 'next/head';


const PageEleven = ({ prevStep }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state) => state.propertyBookingPrice);

    const handleInputChange = (e) => {
        dispatch({ type: 'SET_PROPERTY_BOOKING_PRICE', payload: e.target.value });
    };

    const handleNextClick = () => {
        if (!inputValue) return; // Do not proceed if input field is empty
        dispatch({ type: 'SET_PROPERTY_BOOKING_PRICE', payload: inputValue });
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 14 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 12 }))
    }

  return (
    <div className='bg-white'>
      {/* <Head>
        <title>QuooSpace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
        <div className="pl-10 p-6 h-screen flex flex-col justify-between max-w-[40rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <div className="relative w-14 h-14 cursor-pointer mb-5">
              <Link href='/'>
                <Image src={logopic} layout='fill' objectFit='cover' />
              </Link>
            </div>

            <div>
              <h1 className='text-2xl xl:text-4xl font-medium md:font-semibold mb-7 font-sora'>Now, set your price</h1>
              <div className="flex justify-center space-x-4 items-center border pb-10 rounded-md bg-[#F7F7F7]">
                  {/* <button className="border w-10 rounded-lg p-1 relative text-center bg-white">
                          <Image src={Minus} className="border p-10"/>
                  </button> */}
                  <div className='flex flex-col items-center mt-6'>
                    <PriceField
                        label="Enter your name:"
                        placeholder="Name"
                        value={inputValue}
                        onChange={handleInputChange}
                        setPageInput={(option) => ({
                            type: 'SET_PROPERTY_BOOKING_PRICE',
                            payload: option,
                        })}
                    />
                    <p className='mt-3 text-black'>Per night</p>
                  </div>
                  {/* <button className="border w-10 rounded-lg p-1 relative text-center bg-white" >
                          <Image src={Plus} className="border p-10"/>
                  </button> */}
              </div>
            </div>

            <div className='flex justify-between items-center'>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${!inputValue ? "bg-gray-300 pointer-events-none" : ""}`}
                disabled={!inputValue}
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
        </div>
        
    </div>
  );
};

export default PageEleven;

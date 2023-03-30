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


const PageEleven = ({ prevStep }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state) => state.propertyBookingPrice);

    const handleInputChange = (e) => {
        dispatch({ type: 'SET_PROPERTY_BOOKING_PRICE', payload: e.target.value });
    };

    const handleNextClick = () => {
        if (!inputValue) return; // Do not proceed if input field is empty
        dispatch({ type: 'SET_PROPERTY_BOOKING_PRICE', payload: inputValue });
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 13 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 11 }))
    }

  return (
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div>
              <h1 className='font-bold'>Set your price</h1>
              <div className="flex space-x-4 items-center">
                  <button className="border w-10 rounded-lg p-1 relative text-center">
                          <Image src={Minus} className="border p-10"/>
                  </button>
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
                    <p className='mt-3 text-gray-500'>Per night</p>
                  </div>
                  <button className="border w-10 rounded-lg p-1 relative text-center" >
                          <Image src={Plus} className="border p-10"/>
                  </button>
              </div>
            </div>


            {/* <div className="">
                <h1>Price</h1>
            <InputField
                label="Enter your name:"
                placeholder="Name"
                value={inputValue}
                onChange={handleInputChange}
                setPageInput={(option) => ({
                    type: 'SET_PROPERTY_BOOKING_PRICE',
                    payload: option,
                })}
            />
            </div> */}

            <div>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200"
                // disabled={!setValue}
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
        </div>
        <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
            {/* <!-- Content for the right side --> */}
            <div className='h-10 w-10'>
                <Image src={HostFrame}  />
            </div>

            <div className='font-sora font-bold mb-36 flex flex-col space-y-5'>
                <p className='text-3xl text-white'>2.</p>
                <p className='text-4xl text-white'>Now set your price</p>
            </div>

            <div>

            </div>
        </div>
    </Layout>
  );
};

export default PageEleven;

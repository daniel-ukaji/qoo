import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBedroomsSelection,
  setBedsSelection,
  setBathroomsSelection,
} from '../store';
import Link from 'next/link';
import logopic from '../public/images/qoo_logo.png';
import Image from 'next/image';


function CounterPage({ prevStep }) {
  const dispatch = useDispatch();
  const bedrooms = useSelector((state) => state.propertyBedroomNum);
  const beds = useSelector((state) => state.propertyGuestNum);
  const bathrooms = useSelector((state) => state.propertyBathroomNum);

  const handleNextClick = () => {
    if (!bedrooms || !beds || !bathrooms) {
      return; // Do not proceed if any selection is empty
    }
dispatch({ type: 'SET_BEDROOMS_SELECTION', payload: bedrooms });
dispatch({ type: 'SET_BEDS_SELECTION', payload: beds });
dispatch({ type: 'SET_BATHROOMS_SELECTION', payload: bathrooms });
dispatch({ type: 'SET_PAGE_NUMBER', payload: 6 });
};

const handleBackClick = () => {
    prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 4 }))
  }

  const incrementBedrooms = () => {
    dispatch(setBedroomsSelection(bedrooms + 1));
  };

  const decrementBedrooms = () => {
    dispatch(setBedroomsSelection(bedrooms - 1));
  };

  const incrementBeds = () => {
    dispatch(setBedsSelection(beds + 1));
  };

  const decrementBeds = () => {
    dispatch(setBedsSelection(beds - 1));
  };

  const incrementBathrooms = () => {
    dispatch(setBathroomsSelection(bathrooms + 1));
  };

  const decrementBathrooms = () => {
    dispatch(setBathroomsSelection(bathrooms - 1));
  };

  return (
    <div className='bg-white font-sora'>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between max-w-[50rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <div className="relative w-14 h-14 cursor-pointer">
              <Link href='/'>
                <Image src={logopic} layout='fill' objectFit='cover' />
              </Link>
            </div>
            <div className="">
              <h1 className='text-2xl xl:text-4xl font-semibold mb-5 max-w-[40rem]'>Let's start with the basics</h1>
              <p className='text-md mt-5 font-medium'>How many people can stay here?</p>

            <div className='flex flex-col space-y-8 mt-8'>
              <div className='flex justify-between items-center border-b pb-5'>
                <p className='text-xl'>Guests</p>
                <div className='flex items-center space-x-5'>
                    <button className="block px-4 py-2 text-xl font-bold border rounded-full hover:border-black text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={decrementBeds}>-</button>
                    <p className='text-black'>{beds}</p>
                    <button className="block px-4 py-2 text-xl font-bold border rounded-full hover:border-black text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={incrementBeds}>+</button>
                </div>
              </div>

              <div className='flex justify-between items-center border-b pb-5'>
                <p className='text-xl'>Bedrooms</p>
                <div className='flex items-center space-x-5'>
                    <button className="block px-4 py-2 text-xl font-bold border rounded-full hover:border-black text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={decrementBedrooms}>-</button>
                    <p className='text-black'>{bedrooms}</p>
                    <button className="block px-4 py-2 text-xl font-bold border rounded-full hover:border-black text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={incrementBedrooms}>+</button>
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <p className='text-xl'>Bathrooms</p>
                <div className='flex items-center space-x-5'>
                    <button className="block px-4 py-2 text-xl font-bold border rounded-full hover:border-black text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={decrementBathrooms}>-</button>
                    <p className='text-black'>{bathrooms}</p>
                    <button className="block px-4 py-2 text-xl font-bold border rounded-full hover:border-black text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={incrementBathrooms}>+</button>
                </div>
              </div>
            </div>
              
            </div>

            <div className='mt-6 flex justify-between items-center'>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${!bedrooms || !beds || !bathrooms ? "bg-gray-300 pointer-events-none" : ""}`}
                disabled={!beds || !bedrooms || !bathrooms}
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
        </div>
        
    {/* </Layout> */}
    </div>
  );
}

export default CounterPage;

import React from 'react'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import hostpic from '../public/images/hostpic.jpg';
import Image from 'next/image';
import logopic from '../public/images/qoo_logo.png';
import Link from 'next/link';


function PageStepTwo() {

    const dispatch = useDispatch()

    const handleNextClick = () => {
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 6 });
      };

      const handleBackClick = () => {
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 4 });
      };

  return (
    <Layout className="">
      <div className="pl-10 p-6 h-screen flex flex-col justify-between bg-white">
        {/* <!-- Content for the left side --> */}

        <div className="relative w-14 h-14 cursor-pointer mb-5">
              <Link href='/'>
                <Image src={logopic} layout='fill' objectFit='cover' />
              </Link>
            </div>
        <div className="flex flex-col lg:ml-20 space-y-5 font-sora">
            <p className='text-lg mb-5 font-bold'>Step 2</p>
            <h1 className="text-6xl font-medium mb-5 text-black">Make your place stand out</h1>
            <p className='text-md'>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
        </div>
        <div className="flex justify-between md:justify-start">
          <button onClick={handleBackClick} className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">
            Back
          </button>
          <button
            className={`md:hidden py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 `}
            onClick={handleNextClick}
          >
            Proceed
          </button>
        </div>
      </div>
      <div className="hidden md:flex flex-col bg-white justify-between  min-h-screen">
        {/* <!-- Content for the right side --> */} 
        <div></div>
        <div className='relative w-[20rem] h-[20rem] mx-auto'>
          <Image src={hostpic} layout='fill' objectFit='cover' />
        </div>
        <div className='flex justify-end mb-5 mr-5'>
        <button
            className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 `}
            onClick={handleNextClick}
          >
            Proceed
          </button>
        </div>
        

      </div>
    </Layout>
  )
}

export default PageStepTwo
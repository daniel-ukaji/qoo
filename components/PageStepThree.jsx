import React from 'react'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import hostpic from '../public/images/hostpic.jpg';
import Image from 'next/image';
import logopic from '../public/images/qoo_logo.png';
import Link from 'next/link';


function PageStepThree() {

    const dispatch = useDispatch()

    const handleNextClick = () => {
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 11 });
      };

  return (
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between bg-white">
        {/* <!-- Content for the left side --> */}
        <div className="relative w-14 h-14 cursor-pointer mb-5">
              <Link href='/'>
                <Image src={logopic} layout='fill' objectFit='cover' />
              </Link>
            </div>
            <div className="flex flex-col xl:ml-20 space-y-5 font-sora">
            <p className='text-md xl:text-lg mb-5 font-bold'>Step 3</p>
            <h1 className="text-4xl xl:text-6xl font-medium mb-5 text-black">Finish up and publish</h1>
            <p className='text-sm xl:text-md'>Finally, you’ll choose if you'd like to start with an experienced guest, then you'll set your nightly price. Answer a few quick questions and publish when you're ready.</p>
        </div>
        <div className="flex justify-between md:justify-start">
          <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">
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
      <div className="hidden md:flex flex-col bg-white justify-between min-h-screen">
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

export default PageStepThree
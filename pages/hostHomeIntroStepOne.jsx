import React from 'react'
import Layout from '../components/Layout'
import hostlogo from '../public/images/hostlogo.png'
import Image from 'next/image'
import HostFrame from '../public/images/HostFrame.png'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'


function hostHomeIntroStepOne() {
    const [selectedBox, setSelectedBox] = useState("");

    const handleBoxClick = (boxValue) => {
        setSelectedBox(boxValue);
    };
  return (
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <div className="">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </div>
        <div className="">
        <div className="grid grid-cols-3 gap-3">
          <button
            className={`bg-transparent flex flex-col text-black border px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "House" ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => handleBoxClick("House")}
          >
            <Image src={hostlogo} alt="" />
            House
          </button>
          <button
            className={`bg-transparent flex flex-col border text-black px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Apartment" ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => handleBoxClick("Apartment")}
          >
            <Image src={hostlogo} alt="" />
            Apartment
          </button>
          <button
            className={`bg-transparent flex flex-col border text-black px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Barn" ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => handleBoxClick("Barn")}
          >
            <Image src={hostlogo} alt="" />
            Barn
          </button>
          <button
            className={`bg-transparent flex flex-col border text-black px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Bed & Breakfast" ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => handleBoxClick("Bed & Breakfast")}
          >
            <Image src={hostlogo} alt="" />
            Bed & Breakfast
          </button>
          <button
            className={`bg-transparent flex flex-col border text-black px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Boat" ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => handleBoxClick("Boat")}
          >
            <Image src={hostlogo} alt="" />
            Boat
          </button>
          <button
            className={`bg-transparent flex flex-col border text-black px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Cabin" ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => handleBoxClick("Cabin")}
          >
            <Image src={hostlogo} alt="" />
            Cabin
          </button>
        </div>
        </div>
        
        <div>
        <Link href={`/hostHomeIntroStepTwo?selectedBox=${selectedBox}`}>
          <button
            className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${
              selectedBox ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!selectedBox}
          >
            Proceed
          </button>
        </Link>
        </div>
      </div>
      <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */}
        <div className='h-10 w-10'>
            <Image src={HostFrame}  />
        </div>

        <div className='font-sora font-bold mb-36'>
            <p className='text-3xl text-white'>1.</p>
            <p className='text-4xl text-white'>Which of these best describes your place?</p>
        </div>

        <div>

        </div>
        
      </div>

    </Layout>
  )
}

export default hostHomeIntroStepOne
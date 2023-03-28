import React from 'react'
import Layout from '../components/Layout'
import hostlogo from '../public/images/hostlogo.png'
import Image from 'next/image'
import HostFrame from '../public/images/HostFrame.png'
import { useState } from "react";
import { useRouter } from 'next/router'

function hostHomeIntroStepThree() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleProceedClick = () => {
    router.push(
      `/hostHomeIntroStepFour?selectedBox=${router.query.selectedBox}&selectedOption=${selectedOption}`
    );
  };

    // const handleTextareaChange = (e) => {
    //     setTextareaValue(e.target.value);
    // };

  return (
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <div className="">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </div>

        <div>
        <form>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="border-gray-200 border-2 rounded-md p-4 font-sora mt-1 mb-4 w-full outline-none"
                placeholder='Enter your address'
            />
            {/* <textarea
                value={textareaValue}
                onChange={handleTextareaChange}
                className="border-gray-200 border-2 rounded-md p-2 mt-1 w-full h-64 outline-none"
            /> */}
        </form>
        </div>

        <div className="flex space-x-2">
          <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200" onClick={handleBackClick}>
            Back
          </button>
          <button
            className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 `}
            
            onClick={handleProceedClick}
          >
            Proceed
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */}
        <div className='h-10 w-10'>
            <Image src={HostFrame}  />
        </div>

        <div className='font-sora mb-36 space-y-5'>
            <p className='text-3xl text-white font-bold mb-10'>3.</p>
            <p className='text-4xl text-white font-bold'>Where's your place located?</p>
            <p className='text-md text-white'>We will send your address to guests only when they've made reservations</p>
        </div>

        <div>

        </div>
        
      </div>

    </Layout>
  )
}

export default hostHomeIntroStepThree
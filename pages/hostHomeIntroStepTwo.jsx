import React from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/router';

function hostHomeIntroStepTwo() {

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleProceedClick = () => {
    router.push(
      `/hostHomeIntroStepFour?selectedBox=${router.query.selectedBox}&selectedOption=${selectedOption}`
    );
  };


  return (
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <div className="">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </div>
      
        <div className="space-y-5 font-sora font-bold">
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                      <label className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Entire Place</label>
                      <input id="bordered-radio-1" type="radio" value="Entire Place" name="options" checked={selectedOption === "Entire Place"} onChange={handleOptionChange} className="w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
          </div>
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                      <label className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Private Room</label>
                      <input id="bordered-radio-1" type="radio" value="Entire Place" name="options" checked={selectedOption === "Private Room"} onChange={handleOptionChange} className="w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
          </div>
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                      <label className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Shared Room</label>
                      <input id="bordered-radio-1" type="radio" value="Entire Place" name="options" checked={selectedOption === "Shared Room"} onChange={handleOptionChange} className="w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
          </div>
          {/* <form onSubmit={handleSubmit} className='space-y-5 font-sora font-bold'>
            {options.map((option) => (
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <label key={option.id} for="bordered-radio-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{option.label}</label>
                    <input id="bordered-radio-1" type="radio" value={option.value} name="bordered-radio" class="w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                </div>
              ))}
          </form> */}
        </div>

        <div className="flex space-x-2">
          <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200" onClick={handleBackClick}>
            Back
          </button>
          <button
            className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${
              selectedOption ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!selectedOption}
            onClick={handleProceedClick}
          >
            Proceed
          </button>
        </div>

        {/* <div>
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Back</button>
            <button onClick={handleSubmit} className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">Proceed</button>
        </div> */}
      </div>
      <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */}
        
        
      </div>

    </Layout>
  )
}

export default hostHomeIntroStepTwo
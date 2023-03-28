import React from 'react'
import Layout from '../components/Layout'
import hostlogo from '../public/images/hostlogo.png'
import Image from 'next/image'
import HostFrame from '../public/images/HostFrame.png'
import { useState } from "react";
import { MdClose, MdOutlineMonitor } from "react-icons/md";
import { RiSpotifyLine } from "react-icons/ri";
import { GiFairyWings } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";

function hostHomeIntroStepFive() {

  const options = [
    { category: 'Bedroom', label: '1' },
    { category: 'Bedroom', label: '2' },
    { category: 'Bedroom', label: '3' },
    { category: 'Bedroom', label: '4' },
    { category: 'Bedroom', label: '4+' },
    { category: 'Bed', label: '1' },
    { category: 'Bed', label: '2' },
    { category: 'Bed', label: '3' },
    { category: 'Bed', label: '4' },
    { category: 'Bed', label: '4+' },
    { category: 'Bathroom', label: '1' },
    { category: 'Bathroom', label: '2' },
    { category: 'Bathroom', label: '3' },
    { category: 'Bathroom', label: '4' },
    { category: 'Bathroom', label: '4+' },
  ];


  const categories = [
    {
      id: 1,
      name: "Bedroom",
      options: [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
        { id: 5, name: "4+" },
      ]
    },
    {
      id: 2,
      name: "Bed",
      options: [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
        { id: 5, name: "4+" },
      ]
    },
    {
      id: 3,
      name: "Bathroom",
      options: [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
        { id: 5, name: "4+" },
      ]
    },
    {
      id: 4,
      name: "Amenities",
      options: [
        { id: 1, name: "Wifi" },
        { id: 2, name: "Air Condition" },
        { id: 3, name: "TV" },
        { id: 4, name: "Pool" },
      ]
    }
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (categoryId, optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = prevSelectedOptions.filter(
        (category) => category.id !== categoryId
      );
  
      const category = categories.find((cat) => cat.id === categoryId);
      const option = category.options.find((opt) => opt.id === optionId);
  
      return [
        ...newSelectedOptions,
        {
          id: categoryId,
          name: category.name,
          options: [{ id: optionId, name: option.name }],
        },
      ];
    });
  };
  

  const handleSubmit = () => {
    const data = {
      options: selectedOptions
    };
    console.log(data);

    // submit data to API here
  };

  const [selected, setSelected] = useState([]);

  const handleSelect = (category, label) => {
    const newSelection = [...selected];
    const index = newSelection.findIndex((option) => option.category === category);
    if (index === -1) {
      newSelection.push({ category, label });
    } else {
      newSelection[index] = { category, label };
    }
    setSelected(newSelection);
  };

  // const handleSubmit = () => {
  //   // Submit selected options to API
  // };

  return (
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <div className="">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </div>

        <div className="">
          <div className="mb-5">
            <h1 className="text-base font-bold text-secondary">
              Rooms & Bathroom
            </h1>
          </div>

          {/* <div className="">
            <h1 className="text-base font-bold text-secondary">
              Rooms & Bathroom
            </h1>

            <h1 className="mt-6 text-sm font-normal text-secondary text-opacity-70">
              Bedrooms
            </h1>

            <div className="flex mt-4 space-x-4 text-sm font-medium text-secondary">
              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                1
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                2
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                3
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4+
              </div>
            </div>

            <h1 className="mt-6 text-sm font-normal text-secondary text-opacity-70">
              Bed
            </h1>

            <div className="flex mt-4 space-x-4 text-sm font-medium text-secondary">
              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                1
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                2
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                3
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4+
              </div>
            </div>

            <h1 className="mt-6 text-sm font-normal text-secondary text-opacity-70">
              Bathroom
            </h1>

            <div className="flex mt-4 space-x-4 text-sm font-medium text-secondary">
              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                1
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                2
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                3
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4+
              </div>
            </div>
          </div> */}

          {/* <div className="mt-6">
          <h1 className="text-base font-bold text-secondary">Amenities</h1>

          <div className="flex mt-4 space-x-4 text-xs font-normal text-secondary text-opacity-90">
            <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
              <RiSpotifyLine className="w-4 h-4" />
              <div>Wi-Fi</div>
            </div>

            <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
              <GiFairyWings className="w-4 h-4" />
              <div> Air Condition</div>
            </div>

            <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
              <MdOutlineMonitor className="w-4 h-4" />
              <div>TV</div>
            </div>

            <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
              <FaSwimmingPool className="w-4 h-4" />
              <div>Pool</div>
            </div>
          </div>
        </div> */}

          {/* <div className="mt-6 mb-10">
            <h1 className="text-base font-bold text-secondary">Amenities</h1>

            <div className="flex mt-4 space-x-4 text-xs font-normal text-secondary text-opacity-90">
                <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
                <RiSpotifyLine className="w-4 h-4" />
                <div>Wi-Fi</div>
                </div>

                <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
                <GiFairyWings className="w-4 h-4" />
                <div> Air Condition</div>
                </div>

                <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
                <MdOutlineMonitor className="w-4 h-4" />
                <div>TV</div>
                </div>

                <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
                <FaSwimmingPool className="w-4 h-4" />
                <div>Pool</div>
                </div>
            </div>
        </div> */}  



      <div>
      {categories.map((category) => (
        <div key={category.id} className=''>
          <h2 className="text-xs text-gray-500">{category.name}</h2>
          <div className="flex flex-wrap space-x-4 my-4">
            {category.options.map((option) => (
              <button
                key={option.id}
                className={`px-8 py-4 border rounded-[80px] ${
                  selectedOptions.find((selectedCategory) => selectedCategory.id === category.id &&
                    selectedCategory.options.find((selectedOption) => selectedOption.id === option.id)
                  )
                    ? "border-gray-500"
                    : "border"
                }`}
                onClick={() => handleOptionSelect(category.id, option.id)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
      </div>
    </div>

        {/* <div className="flex flex-col items-center">
      {options.map((option) => (
        <div
          key={`${option.category}-${option.label}`}
          className={`w-40 h-20 border-2 rounded-lg flex items-center justify-center cursor-pointer ${
            selected.some(
              (sel) => sel.category === option.category && sel.label === option.label
            )
              ? 'border-blue-500'
              : 'border-gray-400'
          }`}
          onClick={() => handleSelect(option.category, option.label)}
        >
          {option.label}
        </div>
      ))}
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleSubmit}>
        Submit
      </button>
    </div> */}

        

        <div className='mt-5'>
        <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Back</button>
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">Proceed</button>
        </div>
      </div>
      <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */}
        <div className='h-10 w-10'>
            <Image src={HostFrame}  />
        </div>

        <div className='font-sora mb-36 space-y-5'>
            <p className='text-3xl text-white font-bold mb-10'>5.</p>
            <p className='text-4xl text-white font-bold'>How many bathrooms & bedroom does your apartment have?</p>
        </div>

        <div>

        </div>
        
      </div>

    </Layout>
  )
}

export default hostHomeIntroStepFive
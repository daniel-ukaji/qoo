import Image from 'next/image'
import React from 'react'
import { MdClose, MdOutlineMonitor } from "react-icons/md";
import { RiSpotifyLine } from "react-icons/ri";
import { GiFairyWings } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";



function hostHome4() {
  return (
      <div className='grid grid-cols-2 h-screen'>
            <div className='p-16'>
              <div className='flex flex-shrink mb-20'>
                      <h1 className='bg-[#EAECF0] px-5 py-2 rounded'>Exit</h1>
              </div>
            <div className="">
            <div className="">
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
            </div>
            </div>

            <div className="mt-6">
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
          </div>
          <div className="space-y-5">
                <div className='flex space-x-6 pt-14'>
                  <div className='pt-10'>
                      <button className='py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200'>Back</button>
                  </div>
                  <div className='pt-10'>
                      <button className='py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200'>Proceed</button>
                  </div>
                </div>
            </div>
        </div>
        <div className='relative'>
        <Image 
            src="https://i.ibb.co/sb6DMFV/Rectangle-17722.png" 
            layout="fill" 
            objectFit="cover" 
        />
        <section className='absolute p-16 ml-7'>
            <div className='relative h-12 w-12 mb-16'>
                <Image 
                    src="https://i.ibb.co/6n2PxW0/Subtract.png" 
                    layout="fill" 
                    objectFit="contain"  
                />
            </div>
                <div className='space-y-7'>
                    <h1 className='text-4xl text-white font-bold'>2.</h1>
                    <h1 className='text-4xl text-white pt-3 font-bold'>How many<br /> bathrooms &<br /> bedroom does your<br /> apartment have?</h1>
                </div>
            </section>
    </div>
        </div>
  )
}

export default hostHome4
import Image from 'next/image'
import React from 'react'



function hostHome2() {
  return (
      <div className='grid grid-cols-2  border h-screen'>
            <div className='p-16'>
              <div className='flex flex-shrink mb-20'>
                      <h1 className='bg-[#EAECF0] px-5 py-2 rounded'>Exit</h1>
              </div>
            <div className="space-y-5">
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <label for="bordered-radio-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Entire place</label>
                    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                </div>
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <label for="bordered-radio-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Private room</label>
                    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                </div>
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                    <label for="bordered-radio-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Shared room</label>
                    <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                </div>

                <div className='flex space-x-6 pt-20'>
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
                    <h1 className='text-4xl text-white pt-3 font-bold'>What kind of space<br /> will guests have?</h1>
                </div>
            </section>
    </div>
        </div>
  )
}

export default hostHome2
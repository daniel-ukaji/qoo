import Image from 'next/image'
import React from 'react'



function hostHome3() {
  return (
      <div className='grid grid-cols-2  border h-screen'>
            <div className='p-16'>
              <div className='flex flex-shrink mb-20'>
                      <h1 className='bg-[#EAECF0] px-5 py-2 rounded'>Exit</h1>
              </div>
                <div class="mb-6">
                    <input type="email" id="email" class="bg-white-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg  block w-full p-3   dark:placeholder-gray-400 dark:text-white " placeholder="Enter your house address" required />
                </div>
            <div className="space-y-5">
                <div className='flex space-x-6 pt-60'>
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
                    <h1 className='text-4xl text-white font-bold'>3.</h1>
                    <h1 className='text-4xl text-white pt-3 font-bold'>Where's your place<br /> located?</h1>
                </div>
            </section>
    </div>
        </div>
  )
}

export default hostHome3
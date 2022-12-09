import Image from 'next/image'
import React from 'react'

function hostHome6() {
  return (
    <div className='grid grid-cols-2 h-screen font-sora'>
            <div className='p-16'>
              <div className='flex flex-shrink mb-20'>
                      <h1 className='bg-[#EAECF0] px-5 py-2 rounded'>Exit</h1>
              </div>
            <div>
                <h1 className='font-bold text-lg'>Create your title</h1>
                <p className='mt-1 text-gray-500'>Your listing should highlight what makes your place special</p>
                <div className='mt-10'>
                    <textarea 
                        rows="4" 
                        type="text" 
                        className='border p-2.5 w-full rounded-lg outline-[#BCE2FF]' 
                        name='message' 
                        placeholder="Enter title...  " 
                        id='message' 
                    />
                </div>
            </div>
            <div className='flex space-x-6 mt-40'>
                  <div className='pt-10'>
                      <button className='py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200'>Back</button>
                  </div>
                  <div className='pt-10'>
                      <button className='py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200'>Proceed</button>
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
                    <h1 className='text-4xl text-white font-bold'>6.</h1>
                    <h1 className='text-4xl text-white pt-3 font-bold'>Let's give your place<br /> a name</h1>
                </div>
            </section>
    </div>
        </div>
  )
}

export default hostHome6
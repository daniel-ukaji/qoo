import Image from 'next/image'
import React from 'react'
import Icon from "../pages/images/Icon.png"


function hostHome5() {
  return (
    <div className='grid grid-cols-2 h-screen font-sora'>
            <div className='p-16'>
              <div className='flex flex-shrink mb-20'>
                      <h1 className='bg-[#EAECF0] px-5 py-2 rounded'>Exit</h1>
              </div>
            <div className='border max-w-xl flex flex-col items-center'>
                <div className='flex flex-col items-center mt-28 mb-28'>
                    <Image src={Icon}/>
                    <h1 className='font-bold mt-5 text-xl'>Drag your photos here</h1>
                    <p className='mt-1 text-gray-500'>Add atleast 5 images</p>
                    <p className='mt-8 text-gray-500 text-lg'>Upload from your device</p>  
                </div>
            </div>
            <div className='flex space-x-6 pt-14'>
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
                    <h1 className='text-4xl text-white font-bold'>5.</h1>
                    <h1 className='text-4xl text-white pt-3 font-bold'>Let's add some<br /> photos of your place</h1>
                </div>
            </section>
    </div>
        </div>
  )
}

export default hostHome5
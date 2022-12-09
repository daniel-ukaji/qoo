import React from 'react'
import Image from 'next/image'
import Minus from '../pages/images/minus.png'
import Plus from '../pages/images/plus.png'
import { useState } from 'react'


function hostHome8() {
    const [counter, setCounter] = useState(0);

    //increase counter
    const increase = () => {
        setCounter(count => count + 1);
    }

    //decrease counter
    const decrease = () => {
        if (counter > 0) {
            setCounter(count => count - 1);
          }
    }
    
  return (
    <div className='grid grid-cols-2 h-screen font-sora'>
            <div className='p-16'>
              <div className='flex flex-shrink mb-20'>
                      <h1 className='bg-[#EAECF0] px-5 py-2 rounded'>Exit</h1>
              </div>
            <div>
                <h1 className='font-bold text-lg'>Create your description</h1>
                <div className='flex space-x-4 items-center mt-10'>
                    <button className="border w-10 rounded-lg p-1 relative text-center" onClick={decrease}>
                        <Image src={Minus} className="border p-10"/>
                    </button>
                    <div className='flex flex-col items-center mt-6'>
                        <input 
                            value={counter}
                            type="email" 
                            id="email" 
                            className="text-center bg-white-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg  block max-w-xl p-3   dark:placeholder-gray-400 dark:text-white " 
                            placeholder="" 
                            required 
                        />
                        <p className='mt-3 text-gray-500'>Per night</p>
                    </div>
                    <button className="border w-10 rounded-lg p-1 relative text-center" onClick={increase}>
                        <Image src={Plus} className="border p-10"/>
                    </button>
                </div>
                
            </div>
            <div className='flex space-x-6 mt-48'>
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
                    <h1 className='text-4xl text-white font-bold'>8.</h1>
                    <h1 className='text-4xl text-white pt-3 font-bold'>Now set your<br /> price</h1>
                </div>
            </section>
    </div>
        </div>
  )
}

export default hostHome8
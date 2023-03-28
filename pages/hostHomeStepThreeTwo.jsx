import React from 'react'
import Layout from '../components/Layout'
import hostlogo from '../public/images/hostlogo.png'
import Image from 'next/image'
import HostFrame from '../public/images/HostFrame.png'
import { useState } from "react";
import Minus from '../pages/images/minus.png'
import Plus from '../pages/images/plus.png'

function hostHomeStepThreeTwo() {

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
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <div className="">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </div>

        <div>
                <h1 className='font-bold text-lg'>Set your price</h1>
                <div className='flex space-x-4 items-center'>
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

        <div>
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Back</button>
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">Proceed</button>
        </div>
      </div>
      <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */}
        
        <div className='h-10 w-10'>
            <Image src={HostFrame}  />
        </div>

        <div className='font-sora mb-36 space-y-5'>
            <p className='text-3xl text-white font-bold mb-10'>2.</p>
            <p className='text-4xl text-white font-bold'>Now set your price</p>
        </div>

        <div>

        </div>
        
      </div>

    </Layout>
  )
}

export default hostHomeStepThreeTwo
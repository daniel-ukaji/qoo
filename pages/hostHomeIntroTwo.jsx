import React from 'react'
import Layout from '../components/Layout'
import { useSpring, animated } from '@react-spring/web'
import Link from 'next/link';
import hostpic from '../public/images/hostpic.jpg';
import Image from 'next/image';



function hostHomeIntroTwo() {

  const props = useSpring({ to: { transform: 'translateY(0%)' }, from: { transform: 'translateY(100%)' } });


  return (
    <Layout>
      <div className="pl-10 p-6 bg-white h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <animated.div style={props} className="flex justify-start">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </animated.div>
        <animated.div style={props} className="">
            <p className='text-xl mb-5 font-bold'>Step 1</p>
            <h1 className="text-6xl font-medium mb-5 text-black">Tell us about your place</h1>
            <p className='text-xl'>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
        </animated.div>
        <animated.div style={props} className='flex justify-start'>
          <Link href="/hostHomeIntro">
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">
              Back
            </button>
            </Link>

            <Link href="/App">
              <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">
                Proceed
              </button>
            </Link>
        </animated.div>
      </div>
      <div className="flex flex-col bg-white justify-between items-center min-h-screen">
        {/* <!-- Content for the right side --> */} 
        <div></div>
        <div className='relative w-[30rem] h-[30rem]'>
          <Image src={hostpic} layout='fill' objectFit='cover' />
        </div>
        <div></div>

      </div>
    </Layout>
  )
}

export default hostHomeIntroTwo
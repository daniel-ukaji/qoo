import React from 'react'
import Layout from '../components/Layout'
import { useSpring, animated } from '@react-spring/web'
import Link from 'next/link';
import hostpic from '../public/images/hostpic.jpg';
import Image from 'next/image';
import logopic from '../public/images/qoo_logo.png';




function hostHomeIntroTwo() {

  const props = useSpring({ to: { transform: 'translateY(0%)' }, from: { transform: 'translateY(100%)' } });


  return (
    <>
    <Layout>
      <div className="pl-10 p-6 bg-white h-screen flex flex-col justify-between font-sora">
        {/* <!-- Content for the left side --> */}
        <animated.div style={props} className="relative w-14 h-14 cursor-pointer">
          <Link href='/'>
            <Image src={logopic} layout='fill' objectFit='cover' />
          </Link>
        </animated.div>
        <animated.div style={props} className=" lg:ml-20">
            <p className='text-md xl:text-lg mb-5 font-bold'>Step 1</p>
            <h1 className="text-4xl xl:text-6xl font-medium mb-5 text-black">Tell us about your place</h1>
            <p className='text-sm xl:text-md'>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
        </animated.div>
        <animated.div style={props} className='flex justify-between md:justify-start'>
          <Link href="/hostHomeIntro">
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">
              Back
            </button>
            </Link>

            <Link href="/App">
              <button className="md:hidden py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">
                Proceed
              </button>
            </Link>
        </animated.div>
      </div>
      <div className="hidden md:flex flex-col bg-white justify-between min-h-screen">
        {/* <!-- Content for the right side --> */} 
        <div></div>
        <div className='relative w-[20rem] h-[20rem] mx-auto'>
          <Image src={hostpic} layout='fill' objectFit='cover' />
        </div>
        <div className='flex justify-end mb-5 mr-5'>
          <Link href="/App">
            <button
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 `}
              >
                Proceed
              </button>
            </Link>
        </div>
      </div>
    </Layout>
    {/* <animated.div style={props} className='flex justify-between px-12 bg-white'>
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
        </animated.div> */}
    </>
  )
}

export default hostHomeIntroTwo
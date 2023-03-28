import React from 'react'
import Layout from '../components/Layout'
import { useSpring, animated } from '@react-spring/web'
import Link from 'next/link';


function hostHomeIntroTwo() {

  const props = useSpring({ to: { transform: 'translateY(0%)' }, from: { transform: 'translateY(100%)' } });


  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */} 
      </div>

      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <animated.div style={props} className="flex justify-end">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </animated.div>
        <animated.div style={props} className="">
            <p className='text-xl'>Step 1</p>
            <h1 className="text-4xl font-bold">Tell us about your place</h1>
        </animated.div>
        <animated.div style={props} className='flex justify-end'>
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
      

    </Layout>
  )
}

export default hostHomeIntroTwo
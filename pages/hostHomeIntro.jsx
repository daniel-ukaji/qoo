import { useRef, useEffect } from 'react';
import Layout from "../components/Layout";
import Link from "next/link";
import { useSpring, animated } from '@react-spring/web'
import { useRouter } from 'next/router';
import Image from 'next/image';
import hostpic from '../public/images/hostpic.jpg';
import hostpictwo from '../public/images/hostpictwo.jpg';


const hostHomeIntro = () => {
  const router = useRouter();
  const props = useSpring({ to: { transform: 'translateY(0%)' }, from: { transform: 'translateY(100%)' } });



  return (
    <Layout>
      
      <div className={`pl-10 p-6 h-screen flex flex-col justify-between bg-white font-sora`}>
        {/* <!-- Content for the left side --> */}
        
        <animated.div style={props} className="">
            <button onClick={() => router.push("/")} className="cursor-pointer py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </animated.div>
        <animated.div style={props} className="">
            <h1 className="text-4xl text-black font-medium">It is easy to become a host on Qoospayce</h1>
        </animated.div>
        <animated.div style={props}>
        <Link href="/hostHomeIntroTwo">
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">
                <a>Proceed</a>
            </button>
            </Link>
        </animated.div>
      </div>
      <div className="flex flex-col bg-white justify-between items-center min-h-screen">
        {/* <!-- Content for the right side --> */} 
        <div className='flex pt-10 border-b pb-5 items-center justify-between max-w-2xl mx-auto'>
            <div>
              <h1 className='font-medium text-3xl mb-3'>1  Tell us about your place</h1>
              <p className='text-xl w-96 text-gray-500'>Share some basic info, like where it is and how many guests can stay.</p>
            </div>
            <div className='relative w-[10rem] h-[10rem]'>
              <Image src={hostpic} layout='fill' objectFit='cover' />
            </div>
          </div>

        <div className='flex mt-14 border-b pb-5 items-center justify-between max-w-2xl mx-auto'>
            <div>
              <h1 className='font-medium text-3xl mb-3'>2 Make it stand out</h1>
              <p className='text-xl w-96 text-gray-500'>Add 5 or more photos plus a title and description—we’ll help you out.</p>
            </div>
            <div className='relative w-[10rem] h-[10rem]'>
              <Image src={hostpic} layout='fill' objectFit='cover' />
            </div>
          </div>

          <div className='flex mt-14 border-b pb-5 items-center justify-between max-w-2xl mx-auto'>
            <div>
              <h1 className='font-medium text-3xl mb-3'>3 Finish up and publish</h1>
              <p className='text-xl w-96 text-gray-500'>Finish creating your property.</p>
            </div>
            <div className='relative w-[10rem] h-[10rem]'>
              <Image src={hostpic} layout='fill' objectFit='cover' />
            </div>
          </div>

      </div>
      {/* <div className="bg-white min-h-screen font-sora">
          <div className='flex pt-10 border-b pb-5 items-center justify-between max-w-2xl mx-auto'>
            <div>
              <h1 className='font-medium text-3xl mb-3'>1  Tell us about your place</h1>
              <p className='text-xl w-96 text-gray-500'>Share some basic info, like where it is and how many guests can stay.</p>
            </div>
            <div className='relative w-[10rem] h-[10rem]'>
              <Image src={hostpic} layout='fill' objectFit='cover' />
            </div>
          </div>

          <div className='flex mt-14 border-b pb-5 items-center justify-between max-w-2xl mx-auto'>
            <div>
              <h1 className='font-medium text-3xl mb-3'>2 Make it stand out</h1>
              <p className='text-xl w-96 text-gray-500'>Add 5 or more photos plus a title and description—we’ll help you out.</p>
            </div>
            <div className='relative w-[10rem] h-[10rem]'>
              <Image src={hostpic} layout='fill' objectFit='cover' />
            </div>
          </div>

          <div className='flex mt-14 border-b pb-5 items-center justify-between max-w-2xl mx-auto'>
            <div>
              <h1 className='font-medium text-3xl mb-3'>3 Finish up and publish</h1>
              <p className='text-xl text-gray-500'>Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing.</p>
            </div>
            <div className='relative w-[10rem] h-[10rem]'>
              <Image src={hostpic} layout='fill' objectFit='cover' />
            </div>
          </div>
        
      </div> */}
    </Layout>
    
  );
};

export default hostHomeIntro;

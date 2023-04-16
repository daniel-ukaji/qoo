import { useRef, useEffect } from 'react';
import Layout from "../components/Layout";
import Link from "next/link";
import { useSpring, animated } from '@react-spring/web'
import { useRouter } from 'next/router';
import Image from 'next/image';
import hostpic from '../public/images/hostpic.jpg';
import logopic from '../public/images/qoo_logo.png';


const hostHomeIntro = () => {
  const router = useRouter();
  const props = useSpring({ to: { transform: 'translateY(0%)' }, from: { transform: 'translateY(100%)' } });



  return (
    <Layout>
      
      <div className={`hidden  pl-10 p-6 h-screen md:flex flex-col justify-between bg-white font-sora`}>
        {/* <!-- Content for the left side --> */}
        
        {/* <animated.div style={props} className="">
            <button onClick={() => router.push("/")} className="cursor-pointer py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </animated.div> */}
        <animated.div style={props} className="relative w-14 h-14 cursor-pointer">
          <Link href='/'>
            <Image src={logopic} layout='fill' objectFit='cover' />
          </Link>
        </animated.div>
        <animated.div style={props} className="ml-5 xl:ml-20">
            <h1 className="text-4xl text-black font-medium">It is easy to become a host on Qoospayce</h1>
        </animated.div>
        <animated.div style={props}>
        <Link href="/hostHomeIntroTwo">
            <button className=" py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">
                <a>Proceed</a>
            </button>
            </Link>
        </animated.div>
      </div>
      <div className="flex flex-col bg-white justify-center items-center h-screen">
        {/* <!-- Content for the right side --> */} 
        
        <animated.div style={props} className="xl:hidden ml-5">
            <h1 className="text-2xl text-black font-semibold">It is easy to become a host on Qoospayce</h1>
        </animated.div>
        <div className='flex border-b pb-5 items-center justify-between max-w-2xl mx-auto ml-5 xl:ml-0 mt-5 xl:mt-0'>
            <div className=''>
              <h1 className='font-medium text-xl md:text-3xl mb-3'>1  Tell us about your place</h1>
              <p className='text-md xl:text-xl xl:w-96 text-gray-500'>Share some basic info, like where it is and how many guests can stay.</p>
            </div>
            <div className='hidden xl:block relative w-[6rem] xl:w-[10rem] h-[6rem] xl:h-[10rem]'>
              <Image src={hostpic} layout='fill' objectFit='cover' />
            </div>
          </div>

        <div className='flex border-b pb-5 items-center justify-between max-w-2xl mt-3 xl:mt-0 mx-auto ml-5 xl:ml-0'>
            <div>
              <h1 className='font-medium text-xl md:text-3xl mb-3'>2 Make it stand out</h1>
              <p className='text-md xl:text-xl xl:w-96 text-gray-500'>Add 5 or more photos plus a title and description—we’ll help you out.</p>
            </div>
            <div className='hidden xl:block relative w-[6rem] xl:w-[10rem] h-[6rem] xl:h-[10rem]'>
              <Image src={hostpic} layout='fill' objectFit='cover' />
            </div>
          </div>

          <div className='flex xl:border-b pb-5 items-center justify-between max-w-2xl mt-3 xl:mt-0 mx-auto ml-5 xl:ml-0'>
            <div>
              <h1 className='font-medium text-xl md:text-3xl mb-3'>3 Finish up and Publish</h1>
              <p className='text-md xl:text-xl xl:w-96 text-gray-500'>Choose if you'd like to finsih creating your property</p>
            </div>
            <div className='hidden xl:block relative w-[6rem] xl:w-[10rem] h-[6rem] xl:h-[10rem]'>
              <Image src={hostpic} layout='fill' objectFit='cover' />
            </div>
          </div>
          
          <animated.div style={props} className="md:hidden mt-10 flex justify-between ml-60 xl:ml-96">
          
        <Link href="/hostHomeIntroTwo">
            <button className="py-3 px-10 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">
                <a>Proceed</a>
            </button>
            </Link>
            
        </animated.div>
          
      </div>
      
      
    </Layout>
    
  );
};

export default hostHomeIntro;

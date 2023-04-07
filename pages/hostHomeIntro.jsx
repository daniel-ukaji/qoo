import { useRef, useEffect } from 'react';
import Layout from "../components/Layout";
import Link from "next/link";
import { useSpring, animated } from '@react-spring/web'
import { useRouter } from 'next/router';

const hostHomeIntro = () => {
  const router = useRouter();
  const props = useSpring({ to: { transform: 'translateY(0%)' }, from: { transform: 'translateY(100%)' } });



  return (
    <Layout>
      
      <div className={`pl-10 p-6 h-screen flex flex-col justify-between`}>
        {/* <!-- Content for the left side --> */}
        
        <animated.div style={props} className="">
            <button onClick={() => router.push("/")} className="cursor-pointer py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </animated.div>
        <animated.div style={props} className="">
            <h1 className="text-4xl font-bold">It is easy to become a host on Qoospayce</h1>
        </animated.div>
        <animated.div style={props}>
        <Link href="/hostHomeIntroTwo">
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">
                <a>Proceed</a>
            </button>
            </Link>
        </animated.div>
      </div>
      <div className="bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */}
        
      </div>
    </Layout>
    
  );
};

export default hostHomeIntro;

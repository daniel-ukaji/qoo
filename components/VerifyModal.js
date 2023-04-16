import Image from 'next/image'
import React, { useEffect } from 'react'
import { runFireworks } from '../utils/confetti';
import { useRouter } from 'next/router';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsExclamationTriangle } from 'react-icons/bs';

const VerifyModal = ({ onClick }) => {
    const router = useRouter();
    

  return (
    <div className='relative p-6 bg-white rounded-lg w-10/12 xl:w-9/12'>
        <section className="flex flex-col space-y-10 overflow-y-auto max-h-96">
        <div class="flex flex-col items-center justify-center h-screen font-sora">
            <BsExclamationTriangle className='w-32 h-32 text-primary' />
            <h1 className='text-2xl font-bold'>Oops!!!</h1>
            <p className='text-sm text-[#667085] text-center'>You need to complete your Profile to Continue</p>
            <button onClick={() => router.push('/AccountSettings') } className="px-32 xl:px-40 py-4 mt-6 text-xs font-medium text-center text-white rounded-xl bg-primary w-fit">
          Continue
        </button>        
        </div>
        </section>
    </div>
  );
}

export default VerifyModal;

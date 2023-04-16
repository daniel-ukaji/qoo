import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { runFireworks } from '../utils/confetti';
import { useRouter } from 'next/router';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AuthLevelContext } from '../utils/context/AuthLevelContext';

function hostSuccess() {
  const router = useRouter();
  const authLevel = useContext(AuthLevelContext);

  

  return (
    <div>
        <div class="flex flex-col items-center justify-center relative p-6 bg-white w-full rounded-2xl bg-white font-sora">
            <AiFillCheckCircle className='w-20 h-20 text-primary' />
            <h1 className='text-2xl font-bold'>Successful</h1>
            <p className='text-sm text-[#667085]'>You have successfully changed your account</p>
            <button onClick={() => authLevel.setModalType("LOGIN")} className="px-32 xl:px-40 py-2 mt-6 text-xs font-medium text-center text-white rounded-xl bg-primary w-fit">
          Continue
        </button>        
        </div>
    </div>
  )
}

export default hostSuccess
import Image from 'next/image'
import React, { useEffect } from 'react'
import done from '/public/images/done.png';
import { runFireworks } from '../utils/confetti';
import { useRouter } from 'next/router';

function hostSuccess() {
  const router = useRouter();

  useEffect(() => {
    runFireworks();
  }, [])
  

  return (
    <div>
        <div class="flex flex-col items-center justify-center h-screen font-sora">
            <Image src={done} />
            <h1 className='text-2xl font-bold'>Successful</h1>
            <p className='text-sm text-[#667085]'>You have successfully created your listing</p>
            <button onClick={() => router.push('/') } className="px-40 py-2 mt-6 text-xs font-medium text-center text-white rounded-xl bg-primary w-fit">
          Continue
        </button>        
        </div>
    </div>
  )
}

export default hostSuccess
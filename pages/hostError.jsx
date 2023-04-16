import Image from 'next/image'
import React, { useEffect } from 'react'
import done from '/public/images/done.png';
import { useRouter } from 'next/router';
import { BiErrorCircle } from 'react-icons/bi';

function hostError() {
  const router = useRouter();
  

  return (
    <div>
        <div class="flex flex-col items-center justify-center h-screen font-sora">
            {/* <Image src={done} /> */}
            <BiErrorCircle className='w-20 h-20 ' />
            <h1 className='text-2xl font-bold'>Unsuccessful</h1>
            <p className='text-center text-sm text-[#667085]'>Oops, it seems your listing could not be create. Try again later.</p>
            <button onClick={() => router.push('/') } className="px-32 xl:px-40 py-2 mt-6 text-xs font-medium text-center text-white rounded-xl bg-primary w-fit">
          Continue
        </button>        
        </div>
    </div>
  )
}

export default hostError
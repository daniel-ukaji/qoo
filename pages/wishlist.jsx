import React from 'react'
import Footer from '../components/misc/footer'
import Header from '../components/misc/header'
import social from '/public/images/Social03.png';
import Image from "next/image";

function wishlist() {
  return (
    <div className="font-sora relative">
        <Header />
        <div className=' max-w-3xl mx-auto mt-8 border-b pb-3'>
            <h5 className='font-Sora text-3xl text-[#162748]'>Wishlist</h5>
        </div>
        <div class="text-center mt-20 space-y-2 pb-20">
            <Image src={social} />
            <h5 className='font-Sora text-1xl text-gray-900'>No trips booked...yet!</h5>
            <p className=' text-xs text-gray-600 font-normal'>Time to dust off your bags and start planning your next adventure.</p>
            <button className="px-8 py-4 mt-6 text-sm font-medium text-center text-white rounded-xl bg-primary w-fit">
          Start Searching
        </button>
        </div>
        <div className='mt-5'>
            <Footer />
        </div>
        
    </div>
  )
}

export default wishlist
import React from 'react'
import Footer from '../components/misc/footer'
import Header from '../components/misc/header'
import RoomCard from "../components/RoomCard";

function wishlistActive() {
  return (
    <div className="font-sora relative">
        <Header />
        <div className=' max-w-3xl mx-auto mt-8 border-b pb-3'>
            <h5 className='font-Sora text-3xl text-[#162748]'>Wishlist</h5>
        </div>
        <div className='max-w-3xl mx-auto mt-8 pb-3'>
            <RoomCard />
        </div>
        <div className='mt-10'>
            <Footer />
        </div>
        
    </div>
  )
}

export default wishlistActive
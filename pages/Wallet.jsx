import React from 'react'
import HostHeader from '../components/misc/hostHeader'
import Image from 'next/image'
import Social from '../public/images/Social03.png'
import { useAuth } from '../utils/hooks/useAuth'

function Wallet() {

    const user = useAuth();
    console.log(user.user)

    console.log(user.user?.userWalletBalance)

    const formatter = new Intl.NumberFormat("en-US", {
        currency: "USD",
      });

  return (
    <div className='font-sora'>
        <HostHeader />
        <section className=''>
            <div className='flex flex-col md:flex-row items-center md:items-right justify-between'>
                <h1 className='font-bold text-2xl'>Wallet balance</h1>
                <button className='text-[#DB5461]'>Add payout account</button>
            </div>
            <div className='flex flex-col md:flex-row mt-5 space-y-3 md:space-y-0'>
                <div className='border rounded-lg mr-2 w-full md:w-1/2'>
                    <h1 className='mt-14 mb-14 ml-4 font-bold text-center md:text-left text-xl text-gray-500'>₦ {formatter.format(user.user?.userWalletBalance)}</h1>
                </div>
                <div className='border rounded-lg p-4 mr-2 w-full md:w-1/2'>
                    <p className='mt-5 text-center md:text-left text-xl'>Guaranty Trust Bank</p>
                    <p className='mt-3 text-center md:text-left text-gray-500'>0123456789</p>
                </div>
            </div>
            <div className='border rounded-lg p-4 mt-10' >
                <h1 className='font-bold'>Request payout</h1>
                <p className='text-gray-500 mb-5'>Your payment is secured by ---</p>
                <p className='font-bold text-sm mb-2'>Enter amount</p>
                <input 
                    className='rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-full placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2'
                    type='text'
                    value=""
                    onChange=""
                    placeholder='0.00'
                />
                <button className="px-10 py-4 mt-8 text-sm font-medium text-white rounded-lg bg-primary">
                    Request payout
                </button>
            </div>
            <div className='mt-10'>
                <h1 className='font-bold text-xl mb-5'>Transaction history</h1>
                <div className='border border-gray-200 bg-[#F9FAFB] flex flex-col items-center justify-center h-full'>
                    <div className='mt-20'>
                        <Image src={Social} alt='' objectFit='contain' className='' />
                    </div>
                    <div className='mb-20'>
                        <p>You've not requested for a payout.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Wallet
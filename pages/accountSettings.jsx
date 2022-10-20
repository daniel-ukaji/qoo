import Image from 'next/image'
import React from 'react'
import Footer from '../components/misc/footer'
import Header from '../components/misc/header'

function accountSettings() {
  return (
    <div className="font-sora relative">
        <Header />
        <div className=' max-w-4xl mx-auto mt-12 font-semibold border-b pb-3'>
            <h5 className='font-Sora text-3xl text-[#162748]'>Account Settings</h5>
        </div>
        <div className='max-w-4xl mx-auto mt-7 space-y-2'>
            <h5 className='font-semibold'>Personal info</h5>
            <p className='text-sm text-[#667085]'>Update your photo and personal details here.</p>
        </div>
        <div className='max-w-4xl mx-auto mt-7 pb-3'>
        <div className="flex flex-col mt-7">
            <div className="flex flex-col mt-4 space-y-6">
              <div className="flex items-center justify-between space-x-4 ">
                <span className='mr-48'>Name</span>
                <input
                  type="text"
                  name=""
                  id=""
                  className="h-[3rem] outline-none w-fourty8 rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal px-2 placeholder:text-secondary placeholder:text-opacity-40"
                  placeholder="First name"
                />
                <input
                  type="text"   
                  name=""
                  id=""
                  className="h-[3rem] outline-none w-fourty8 rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                  placeholder="Last name"
                />
              </div>

              <div className="flex items-center justify-between space-x-24">
                <div className='block w-56'>
                    <span>Email address</span>
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  className="h-[3rem] outline-none w-full rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                  placeholder="Email address"
                />
                
              </div>

              <div className="flex items-center justify-between space-x-24">
                <div className='block w-56'>
                    <span>Phone number</span>
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  className="h-[3rem] outline-none w-full rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                  placeholder="Phone number"
                />
                
              </div>

              <div className="flex items-center justify-between space-x-24">
                <div className='block w-56'>
                    <span>Address</span>
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  className="h-[3rem] outline-none w-full rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                  placeholder="Address"
                />
                
              </div>
            </div>
          </div>
        </div>
        <div className='mt-20'>
            <Footer />
        </div>
    </div>
  )
}

export default accountSettings
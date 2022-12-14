import { HeartIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'

function InfoCard({ 
    roomId,
    price,
    imageUrl,
    roomTitle,
    numOfBed,
    numOfBath,
    roomAddy, 
}) {

    const formatter = new Intl.NumberFormat("en-US", {
        currency: "USD",
      });

  return (
    <div className='flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out
    first:border-t'>
        <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
            <Image 
                src={imageUrl} 
                layout="fill"
                objectFit='cover' className='rounded-2xl' alt=''/>
        </div>

        <div className='flex flex-col flex-grow pl-5'>
            <div className='flex justify-between'>
                <p>{roomAddy}</p>
                <HeartIcon className='h-7 cursor-pointer' />
            </div>

            <h4 className='text-xl'>{roomTitle}</h4>

            <div className='border-b w-10 pt-2' />

            <p className='pt-2 text-sm text-gray-500 flex-grow'>Description</p>
        
            <div className='flex justify-between items-end pt-5'>
                <p className='flex items-center'>
                    <StarIcon className='h-5 text-red-400' />
                    1.50
                </p>

                <div>
                    <p className='text-lg lg:text-2xl font-semibold pb-2'>₦ {formatter.format(price)}</p>
                    <p className='text-right font-extralight'>Total</p>
                </div>
            </div>
        
        
        </div>
    </div>
  )
}

export default InfoCard
import Image from 'next/image'
import React from 'react'

function RightHome() {
  return (
    <div className='relative'>
        <Image 
            src="https://i.ibb.co/sb6DMFV/Rectangle-17722.png" 
            layout="fill" 
            objectFit="cover" 
        />
        <section className='absolute p-16 ml-7'>
            <div className='relative h-12 w-12 mb-16'>
                <Image 
                    src="https://i.ibb.co/6n2PxW0/Subtract.png" 
                    layout="fill" 
                    objectFit="contain"  
                />
            </div>
                <div className='space-y-7'>
                    <h1 className='text-5xl text-white font-bold'>1.</h1>
                    <h1 className='text-5xl text-white pt-3 font-bold'>Which of these best<br /> describes your<br /> place?</h1>
                </div>
            </section>
    </div>
  )
}

export default RightHome
import Image from 'next/image'
import React from 'react'
import LeftHome from '../components/misc/LeftHome'
import RightHome from '../components/misc/RightHome'


function hostHome1() {
  return (
        <div className='grid grid-cols-2  border h-screen'>
            <LeftHome />
            <RightHome />
        </div>
  )
}

export default hostHome1
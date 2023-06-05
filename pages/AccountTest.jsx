import React, { useState } from 'react'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';


function AccountTest() {

const propId = process.env.NEXT_PUBLIC_TAWK_PROPERTYID
const widId = process.env.NEXT_PUBLIC_WIDGETID

const tawkMessengerRef = useRef();

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };

  return (
    
    <div className='flex flex-col justify-center items-center border'>
       <button onClick={handleMinimize}> Minimize the Chat </button>
      <TawkMessengerReact
                propertyId= {propId}
                widgetId={widId}
                ref={tawkMessengerRef}/>
    </div>
    
  )
}

export default AccountTest
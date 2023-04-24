import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';



import { DateRange } from 'react-date-range';

function AccountTest() {
  const [open, setOpen] = useState(false);

const toggleDatePicker = () => {
  setOpen(!open);
};

const tawkMessengerRef = useRef();

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };

  return (
    
    <div className='flex flex-col justify-center items-center border'>
       <button onClick={handleMinimize}> Minimize the Chat </button>
      <TawkMessengerReact
                propertyId="64466e3a31ebfa0fe7fa1088"
                widgetId="1gupht5j9"
                ref={tawkMessengerRef}/>
      
      <button className="px-2 py-1 rounded-md bg-blue-500 text-white" onClick={toggleDatePicker}>Select Dates</button>

{open && (
  <div className="absolute z-10 top-4 mt-2">
    <button className="px-2 py-1 rounded-md bg-blue-500 text-white" onClick={toggleDatePicker}>Close</button>
    <div className="bg-white rounded-md shadow-lg">
      <DateRange />
    </div>
  </div>
)}



    </div>
    
  )
}

export default AccountTest
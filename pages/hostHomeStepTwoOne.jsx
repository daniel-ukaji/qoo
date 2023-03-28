import React, { useState } from 'react'
import Layout from '../components/Layout'
import hostlogo from '../public/images/hostlogo.png'
import Image from 'next/image'
import HostFrame from '../public/images/HostFrame.png'

function hostHomeStepTwoOne() {

    const myImageObject = {
        src: '/../public/images/hostlogo.png',
        alt: 'image',
        width: 30,
        height: 30,
    }

    const [options, setOptions] = useState([
        { id: 1, picture: <Image {...myImageObject} />, label: 'Wifi', checked: false },
        { id: 2, picture: <Image {...myImageObject} />,  label: 'TV', checked: false },
        { id: 3, picture: <Image {...myImageObject} />,  label: 'Kitchen', checked: false },
        { id: 4, picture: <Image {...myImageObject} />,  label: 'Washer', checked: false },
        { id: 5, picture: <Image {...myImageObject} />,  label: 'Free parking on premises', checked: false },
        { id: 6, picture: <Image {...myImageObject} />,  label: 'Pais parking on premises', checked: false },
        { id: 7, picture: <Image {...myImageObject} />,  label: 'Air conditioning', checked: false },
        { id: 8, picture: <Image {...myImageObject} />,  label: 'Dedicated Workplace', checked: false },
      ]);
    
      const handleCheckboxChange = (option) => {
        const updatedOptions = options.map((o) =>
          o.id === option.id ? { ...o, checked: !o.checked } : o
        );
        setOptions(updatedOptions);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const selectedOptions = options.filter((o) => o.checked);
        console.log(selectedOptions);
        // Submit selected options to API
      };

  return (
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <div className="">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </div>
        <div className="">
        <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-3'>
            {options.map((option) => (
                <label
                key={option.id}
                className={`flex flex-col items-start border rounded p-2 cursor-pointer ${
                    option.checked ? 'border-blue-500' : 'border-gray-300'
                }`}
                >
                <input
                    type="checkbox"
                    className="hidden"
                    checked={option.checked}
                    onChange={() => handleCheckboxChange(option)}
                />
                {option.picture}
                {option.label}
                </label>
            ))}
        </form>
        </div>
        <div>
            <button onClick={handleSubmit} className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Back</button>
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">Proceed</button>
        </div>
      </div>
      <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */}
        <div className='h-10 w-10'>
            <Image src={HostFrame}  />
        </div>

        <div className='font-sora font-bold mb-36 flex flex-col space-y-5'>
            <p className='text-3xl text-white'>1.</p>
            <p className='text-4xl text-white'>Tell guest what your place has to offer</p>
        </div>

        <div>

        </div>
        
      </div>

    </Layout>
  )
}

export default hostHomeStepTwoOne
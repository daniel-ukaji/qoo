import { useSelector, useDispatch } from 'react-redux';
import RadioButtons from './RadioButtons'
import Layout from '../components/Layout'
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import Link from 'next/link';
import logopic from '../public/images/qoo_logo.png';


const HostingType = ({ prevStep }) => {
    const dispatch = useDispatch();
    const selectedOption = useSelector((state) => state.propertyHostingType);
  
    const options = [
      { label: 'For Short Stay', additionalText: '' },
      { label: 'For Rent', additionalText: '' },
      { label: 'For Buy', additionalText: '' }
    ];
  
    const handleNextClick = () => {
      if (!selectedOption) return; // Do not proceed if no option is selected
      dispatch({ type: 'SET_PROPERTY_HOSTING_TYPE', payload: selectedOption });
      dispatch({ type: 'SET_PAGE_NUMBER', payload: 4 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 2 }))
    }

    

  return (
    <div className='bg-white font-sora'>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between max-w-[50rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <div className="relative w-14 h-14 cursor-pointer">
              <Link href='/'>
                <Image src={logopic} layout='fill' objectFit='cover' />
              </Link>
            </div>

            <div className="flex flex-col space-y-3">
              <h1 className='text-2xl xl:text-3xl font-semibold mb-5 max-w-[40rem] text-black'>What is the purpose of your listing?</h1>
                <RadioButtons
                    options={options}
                    selectedOption={selectedOption}
                    setPageSelection={(option) => ({
                    type: 'SET_PROPERTY_HOSTING_TYPE',
                    payload: option,
                })}
                // style={{ margin: '3rem 0' }}
                />
            </div>

            <div className='flex justify-between items-center'>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${!selectedOption ? "bg-gray-300 pointer-events-none" : ""}`}
                disabled={!selectedOption}
                onClick={handleNextClick}
              >
                Proceed
              </button>
            </div>
        </div>
        
    </div>
  );
};

export default HostingType;

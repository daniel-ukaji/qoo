import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout'
import InputField from '../components/InputField';
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import TextAreaField from './TextAreaField';
import Link from 'next/link';



const PageNine = ({ prevStep }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state) => state.propertyDescription);

    const handleInputChange = (e) => {
        dispatch({ type: 'SET_PAGE9_INPUT', payload: e.target.value });
    };

    const handleNextClick = () => {
        if (!inputValue) return; // Do not proceed if input field is empty
        dispatch({ type: 'SET_PAGE9_INPUT', payload: inputValue });
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 10 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 8 }))
    }


  return (
    <div className='bg-white'>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between font-sora max-w-[50rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="">
            <h1 className='text-4xl font-semibold mb-5'>Create your Description</h1>
            <p className='mb-5 text-gray-500 text-lg'>Share what makes your place special.</p>

            <TextAreaField
                label="Create your Description:"
                placeholder="Name"
                value={inputValue}
                onChange={handleInputChange}
                setPageInput={(option) => ({
                    type: 'SET_PAGE9_INPUT',
                    payload: option,
                })}
            />
            </div>

            <div className='flex justify-between'>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${!inputValue ? "bg-gray-300 pointer-events-none" : ""}`}
                disabled={!inputValue}
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
        </div>
        
    </div>
  );
};

export default PageNine;

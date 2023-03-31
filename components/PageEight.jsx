import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout'
import InputField from '../components/InputField';
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import TextAreaField from './TextAreaField';
import Link from 'next/link';



const PageEight = ({ prevStep }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state) => state.propertyName);

    const handleInputChange = (e) => {
        dispatch({ type: 'SET_PAGE8_INPUT', payload: e.target.value });
    };

    const handleNextClick = () => {
        if (!inputValue) return; // Do not proceed if input field is empty
        dispatch({ type: 'SET_PAGE8_INPUT', payload: inputValue });
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 9 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 7 }))
    }


  return (
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between font-sora">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="">
            <h1 className='font-bold'>Create Your Title</h1>
            <p className='mb-5 text-gray-500 text-sm'>Your listing should highlight what makes your place special</p>
            <TextAreaField
                label="Create your Title:"
                placeholder="Name"
                value={inputValue}
                onChange={handleInputChange}
                setPageInput={(option) => ({
                    type: 'SET_PAGE8_INPUT',
                    payload: option,
                })}
            />
            </div>

            <div>
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
        <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
            {/* <!-- Content for the right side --> */}
            <div className='h-10 w-10'>
                <Image src={HostFrame}  />
            </div>

            <div className='font-sora font-bold mb-36 flex flex-col space-y-5'>
                <p className='text-3xl text-white'>3.</p>
                <p className='text-4xl text-white'>Let's give your place a name</p>
            </div>

            <div>

            </div>
        </div>
    </Layout>
  );
};

export default PageEight;

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
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between font-sora">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="">
            <h1 className='font-bold mb-5'>Create your Description</h1>
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

            <div>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200"
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

export default PageNine;

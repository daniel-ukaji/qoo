import { useSelector, useDispatch } from 'react-redux';
import RadioButtons from './RadioButtons'
import Layout from '../components/Layout'
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import Link from 'next/link';


const PageTwo = ({ prevStep }) => {
    const dispatch = useDispatch();
    const selectedOption = useSelector((state) => state.propertyGuestSpace);
  
    const options = ['Entire Place', 'Private room', 'Shared room'];
  
    const handleNextClick = () => {
      if (!selectedOption) return; // Do not proceed if no option is selected
      dispatch({ type: 'SET_PROPERTY_GUEST_SPACE', payload: selectedOption });
      dispatch({ type: 'SET_PAGE_NUMBER', payload: 3 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 1 }))
    }

    

  return (
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="flex flex-col space-y-3">
                <RadioButtons
                    options={options}
                    selectedOption={selectedOption}
                    setPageSelection={(option) => ({
                    type: 'SET_PROPERTY_GUEST_SPACE',
                    payload: option,
                })}
                // style={{ margin: '3rem 0' }}
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
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${!selectedOption ? "bg-gray-300 pointer-events-none" : ""}`}
                disabled={!selectedOption}
                onClick={handleNextClick}
              >
                Proceed
              </button>
            </div>
        </div>
        <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
            {/* <!-- Content for the right side --> */}
            <div className='h-10 w-10'>
                <Image src={HostFrame}  />
            </div>

            <div className='font-sora mb-36 space-y-5'>
                <p className='text-3xl text-white font-bold mb-10'>4.</p>
                <p className='text-4xl text-white font-bold'>What type of place will guests have?</p>
                {/* <p className='text-md text-white'>We will send your address to guests only when they've made reservations</p> */}
            </div>

            <div>

            </div>
        </div>
    </Layout>
  );
};

export default PageTwo;

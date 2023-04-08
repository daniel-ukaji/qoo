import { useSelector, useDispatch } from 'react-redux';
import RadioButtons from './RadioButtons'
import Layout from '../components/Layout'
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import Link from 'next/link';


const PageTwo = ({ prevStep }) => {
    const dispatch = useDispatch();
    const selectedOption = useSelector((state) => state.propertyGuestSpace);
  
    const options = [
      { label: 'Entire Place', additionalText: 'Guests have the whole place to themselves' },
      { label: 'Private room', additionalText: 'Guests sleep in a private room but areas may be shared with you or others.' },
      { label: 'Shared room', additionalText: 'Guests sleep in a room or common area that may be shared with you or others.' }
    ];
  
    const handleNextClick = () => {
      if (!selectedOption) return; // Do not proceed if no option is selected
      dispatch({ type: 'SET_PROPERTY_GUEST_SPACE', payload: selectedOption });
      dispatch({ type: 'SET_PAGE_NUMBER', payload: 3 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 1 }))
    }

    

  return (
    <div className='bg-white font-sora'>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between max-w-[50rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="flex flex-col space-y-3">
              <h1 className='text-4xl font-semibold mb-5 max-w-[40rem] text-black'>What type of place will guests have?</h1>
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

export default PageTwo;

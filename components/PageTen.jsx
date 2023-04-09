import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout'
import RadioButtons from '../components/RadioButtons';
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import Link from 'next/link';
import logopic from '../public/images/qoo_logo.png';


const PageTen = ({ prevStep }) => {
    const dispatch = useDispatch();
    const selectedOption = useSelector((state) => state.page10Selection);

    const options = [
                      {label: 'QooSpayce Guests', additionalText: ''},
                      {label: 'Any Guests', additionalText: 'Get reservations faster when you welcome anyone from the Qoospayce community.'}
                    ]; 

    const handleNextClick = () => {
        if (!selectedOption) return; // Do not proceed if no option is selected
        dispatch({ type: 'SET_PAGE10_SELECTION', payload: selectedOption });
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 12 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 9 }))
    }

  return (
    <div className='bg-white'>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between max-w-[50rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <div className="relative w-14 h-14 cursor-pointer mb-5">
              <Link href='/'>
                <Image src={logopic} layout='fill' objectFit='cover' />
              </Link>
            </div>

            <div className="">
            <RadioButtons
                options={options}
                selectedOption={selectedOption}
                setPageSelection={(option) => ({
                type: 'SET_PAGE10_SELECTION',
                payload: option,
                })}
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
                Next
              </button>
            </div>
        </div>
        
    </div>
  );
};

export default PageTen;

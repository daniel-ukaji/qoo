import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout'
import ClickableMultipleBox from '../components/ClickableMultipleBox';
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import Link from 'next/link';


const PageSix = ({ prevStep }) => {
    const dispatch = useDispatch();
    const selectedOption = useSelector((state) => state.propertyServices);

    const options = ['Wifi', 'Kitchen', 'TV', 'Washer', 'Free parking on premises',
    'paid parking on premises','Air Conditioning','Dedicated workspace','Pool',
    'Hot tub', 'Patio', 'BBQ Grill', 'Outdoor dining area', 'Fire Pit', 'Pool table',
    'Playstation 5', 'Piano', 'Exercise equipment', 'Lake Access', 'Beach Access',
    'Outdoor shower', 'Smoke alarm', 'First aid kit', 'Fire extinguisher', 'Carbon monoxide alarm'
  ];
    

    const handleNextClick = () => {
      if (selectedOption.length === 0) return; // Do not proceed if no options are selected
      dispatch({ type: 'SET_PROPERTY_SERVICES', payload: selectedOption });
      dispatch({ type: 'SET_PAGE_NUMBER', payload: 7 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 5 }))
    }

  return (
    <div className="bg-white font-sora">
        <div className="pl-10 p-6  flex flex-col justify-between max-w-[50rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="">
              <h1 className='text-4xl font-semibold mt-5  mb-5  text-black'>Tell guests what your place has to offer</h1>
            <ClickableMultipleBox
                options={options}
                selectedOption={selectedOption}
                setPageSelection={(option) => ({
                type: 'SET_PROPERTY_SERVICES',
                payload: option,
            })}
            />
            {/* <ClickableMultipleBox
                options={options}
                selectedOption={selectedOption}
                setPageSelection={handleOptionClick}
            /> */}
            </div>

            <div className='mt-3 flex justify-between items-center'>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${selectedOption === 0 ? "bg-gray-300 pointer-events-none" : ""}`}
                disabled={selectedOption === 0}
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
        </div>
        
    </div>
  );
};

export default PageSix;

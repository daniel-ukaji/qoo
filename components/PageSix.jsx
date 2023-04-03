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

    // const handleOptionClick = (option) => {
    //   if (selectedOption.includes(option)) {
    //     // Remove the option if it's already selected
    //     const updatedOptions = selectedOption.filter((item) => item !== option);
    //     dispatch({ type: 'SET_PROPERTY_SERVICES', payload: updatedOptions });
    //   } else {
    //     // Add the option if it's not selected yet
    //     const updatedOptions = [...selectedOption, option];
    //     dispatch({ type: 'SET_PROPERTY_SERVICES', payload: updatedOptions });
    //   }
    // };
    

    const handleNextClick = () => {
      if (selectedOption.length === 0) return; // Do not proceed if no options are selected
      dispatch({ type: 'SET_PROPERTY_SERVICES', payload: selectedOption });
      dispatch({ type: 'SET_PAGE_NUMBER', payload: 7 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 5 }))
    }

  return (
    <Layout className="">
        <div className="pl-10 p-6  flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="">
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

            <div className='mt-3'>
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
        <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] h-screen">
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
  );
};

export default PageSix;

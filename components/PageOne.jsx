import { useSelector, useDispatch } from 'react-redux';
import ClickableBox from './ClickableBox'
import Layout from '../components/Layout'
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import Link from 'next/link';
import logopic from '../public/images/qoo_logo.png';


const PageTest = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.propertyType);

  const options = ['House', 'Apartment', 'Barn', 'Bed & Breakfast','Boat', 'Cabin', 'Camper/RV'];

  const handleNextClick = () => {
    if (!selectedOption) return; // Do not proceed if no option is selected
    dispatch({ type: 'SET_PROPERTY_TYPE', payload: selectedOption });
    dispatch({ type: 'SET_PAGE_NUMBER', payload: 2 });
  };

  return (
    // <Layout>
    <div className='bg-white font-sora'>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between max-w-[50rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <div className="relative w-14 h-14 cursor-pointer">
              <Link href='/'>
                <Image src={logopic} layout='fill' objectFit='cover' />
              </Link>
            </div>
            <div className="">
              <h1 className='text-4xl font-semibold mb-5 max-w-[40rem]'>Which of these best describes your place?</h1>
              <ClickableBox
                options={options}
                selectedOption={selectedOption}
                setPageSelection={(option) => ({
                  type: 'SET_PROPERTY_TYPE',
                  payload: option,
              })}
              />
            </div>

            <div>
              <button
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${!selectedOption ? "bg-gray-300 pointer-events-none" : ""}`}
                disabled={!selectedOption}
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
        </div>
        
    {/* </Layout> */}
    </div>
  );
};

export default PageTest;

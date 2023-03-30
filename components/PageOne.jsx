import { useSelector, useDispatch } from 'react-redux';
import ClickableBox from './ClickableBox'
import Layout from '../components/Layout'
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';


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
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="">
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
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200"
                disabled={!selectedOption}
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

        <div className='font-sora font-bold mb-36'>
            <p className='text-3xl text-white'>1.</p>
            <p className='text-4xl text-white'>Which of these best describes your place?</p>
        </div>

        <div>

        </div>
        </div>
    </Layout>
  );
};

export default PageTest;

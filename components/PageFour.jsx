import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout'
import ClickableBox from './ClickableBox';
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import ClickableCircle from './ClickableCircle';
import Link from 'next/link';



const PageTestFour = ({ prevStep }) => {
    const dispatch = useDispatch();
    //   const {   } = useSelector(state => state);
    const bedroomsSelection = useSelector((state) => state.propertyBedroomNumber);
    const bedsSelection = useSelector((state) => state.propertyGuestNumber);
    const bathroomsSelection = useSelector((state) => state.propertyBathroomNumber);
    const propertyAmenities = useSelector((state) => state.propertyAmenities);
      
    
    const handleNextClick = () => {
        if (!bedroomsSelection || !bedsSelection || !bathroomsSelection || !propertyAmenities) {
          return; // Do not proceed if any selection is empty
        }
    dispatch({ type: 'SET_BEDROOMS_SELECTION', payload: bedroomsSelection });
    dispatch({ type: 'SET_BEDS_SELECTION', payload: bedsSelection });
    dispatch({ type: 'SET_BATHROOMS_SELECTION', payload: bathroomsSelection });
    dispatch({ type: 'SET_PROPERTY_AMENITIES', payload: propertyAmenities });
    dispatch({ type: 'SET_PAGE_NUMBER', payload: 5 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 3 }))
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

            <div className="flex flex-col mt-4 space-y-3 text-sm font-medium text-secondary">
            <h1 className='font-bold mb-3'>Room & Bathroom</h1>
            <h1>Bedrooms</h1>
            <ClickableCircle
                title="Bedrooms"
                options={['1', '2', '3', '4', '4+']}
                selectedOption={bedroomsSelection}
                setPageSelection={(option) => dispatch({ type: 'SET_BEDROOMS_SELECTION', payload: option })}
            />
            <h1>Beds</h1>
            <ClickableCircle
                title="Beds"
                options={['1', '2', '3', '4', '4+']}
                selectedOption={bedsSelection}
                setPageSelection={(option) => dispatch({ type: 'SET_BEDS_SELECTION', payload: option })}
            />
            <h1>Bathrooms</h1>
            <ClickableCircle
                title="Bathrooms"
                options={['1', '2', '3', '4', '4+']}
                selectedOption={bathroomsSelection}
                setPageSelection={(option) => dispatch({ type: 'SET_BATHROOMS_SELECTION', payload: option })}
            />
            <h1 className='font-bold pt-3'>Amenities</h1>
            <ClickableCircle
                title="Amenities"
                options={['Wifi', 'Air Condition', 'TV', 'Pool']}
                selectedOption={propertyAmenities}
                setPageSelection={(option) => dispatch({ type: 'SET_PROPERTY_AMENITIES', payload: option })}
            />
            </div>

            <div className='mt-6'>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${!bedroomsSelection || !bedsSelection || !bathroomsSelection || !propertyAmenities ? "bg-gray-300 pointer-events-none" : ""}`}
                disabled={!bedroomsSelection || !bedsSelection || !bathroomsSelection || !propertyAmenities}
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

            <div className='font-sora mb-36 space-y-5'>
                <p className='text-3xl text-white font-bold mb-10'>4.</p>
                <p className='text-4xl text-white font-bold'>Confirm your address</p>
                <p className='text-md text-white'>We will send your address to guests only when they've made reservations</p>
            </div>

            <div>

            </div>
        </div>
    </Layout>
  );
};

export default PageTestFour;

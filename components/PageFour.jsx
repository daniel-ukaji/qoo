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
    <div className='bg-white'>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between max-w-[40rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="flex flex-col mt-4 space-y-3 text-sm font-medium text-secondary">
              <h1 className='text-3xl font-bold mb-5'>Share some basics about your place</h1>
            <h1 className='font-bold mb-3'>Room & Bathroom</h1>
            <h1>Bedrooms</h1>
            <ClickableCircle
                title="Bedrooms"
                options={['1', '2', '3', '4', '5', '6+']}
                selectedOption={bedroomsSelection}
                setPageSelection={(option) => dispatch({ type: 'SET_BEDROOMS_SELECTION', payload: option })}
            />
            <h1>Guests</h1>
            <ClickableCircle
                title="Beds"
                options={['1', '2', '3', '4', '5', '6+']}
                selectedOption={bedsSelection}
                setPageSelection={(option) => dispatch({ type: 'SET_BEDS_SELECTION', payload: option })}
            />
            <h1>Bathrooms</h1>
            <ClickableCircle
                title="Bathrooms"
                options={['1', '2', '3', '4', '5', '6+']}
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

            <div className='mt-6 flex justify-between items-center'>
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
        
    </div>
  );
};

export default PageTestFour;

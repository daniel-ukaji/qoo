import { useSelector, useDispatch } from 'react-redux';
import InputField from './InputField'
import Layout from '../components/Layout'
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import Link from 'next/link';


const PageTestThree = ({ prevStep }) => {
  const dispatch = useDispatch();
  const propertyStreet = useSelector((state) => state.propertyStreet);
  const propertyCity = useSelector((state) => state.propertyCity);
  const propertyState = useSelector((state) => state.propertyState);
  const propertyZipCode = useSelector((state) => state.propertyZipCode);
  const propertyCountry = useSelector((state) => state.propertyCountry);
  // const propertyImage = useSelector((state) => state.propertyImage);

  const handleStreetChange = (e) => {
    dispatch({ type: 'SET_PROPERTY_STREET', payload: e.target.value });
  };

  const handleCityChange = (e) => {
    dispatch({ type: 'SET_PROPERTY_CITY', payload: e.target.value });
  };

  const handleStateChange = (e) => {
    dispatch({ type: 'SET_PROPERTY_STATE', payload: e.target.value });
  };

  const handleZipCodeChange = (e) => {
    dispatch({ type: 'SET_PROPERTY_ZIPCODE', payload: e.target.value });
  };

  const handleCountryChange = (e) => {
    dispatch({ type: 'SET_PROPERTY_COUNTRY', payload: e.target.value });
  };

  // const handleImagesChange = (e) => {
  //   dispatch({ type: 'SET_PROPERTY_IMAGE', payload: e.target.value });
  // };

  const handleNextClick = () => {
    if (!propertyStreet || !propertyCity || !propertyState || !propertyZipCode || !propertyCountry) return; // Do not proceed if input field is empty
    dispatch({ type: 'SET_PROPERTY_STREET', payload: propertyStreet });
    dispatch({ type: 'SET_PROPERTY_CITY', payload: propertyCity });
    dispatch({ type: 'SET_PROPERTY_STATE', payload: propertyState });
    dispatch({ type: 'SET_PROPERTY_ZIPCODE', payload: propertyZipCode });
    dispatch({ type: 'SET_PROPERTY_COUNTRY', payload: propertyCountry });
    // dispatch({ type: 'SET_PROPERTY_IMAGE', payload: propertyImage });
    dispatch({ type: 'SET_PAGE_NUMBER', payload: 4 });
  };

  const handleBackClick = () => {
    prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 2 }))
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

            <div className="flex flex-col space-y-8">
              <h1 className='text-4xl font-semibold mt-5 max-w-[40rem]'>Where's your place located?</h1>
              <div className='relative'>
              <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Street</label>
                  <InputField
                    label="Enter your Address:"
                    placeholder="Maloko Close"
                    value={propertyStreet}
                    onChange={handleStreetChange}
                    setPageInput={(option) => ({
                        type: 'SET_PROPERTY_STREET',
                        payload: option,
                  })}
                  />
                  
              </div>

              <div className='relative'>
              <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>City</label>
                <InputField
                  label="Enter your Address:"
                  placeholder="Lagos"
                  value={propertyCity}
                  onChange={handleCityChange}
                  setPageInput={(option) => ({
                      type: 'SET_PROPERTY_CITY',
                      payload: option,
                })}
                />
                
              </div>

              <div className='relative'>
              <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>State (optional)</label>
                <InputField
                  label="Enter your Address:"
                  placeholder="Lagos"
                  value={propertyState}
                  onChange={handleStateChange}
                  setPageInput={(option) => ({
                      type: 'SET_PROPERTY_STATE',
                      payload: option,
                })}
                />
                
              </div>

              <div className='relative'>
              <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>ZipCode (optional)</label>
                <InputField
                  label="Enter your Address:"
                  placeholder="102213"
                  value={propertyZipCode}
                  onChange={handleZipCodeChange}
                  setPageInput={(option) => ({
                      type: 'SET_PROPERTY_ZIPCODE',
                      payload: option,
                })}
                />
                
              </div>

              <div className='relative'>
              <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Country</label>
                <InputField
                  label="Enter your Address:"
                  placeholder="Name"
                  value={propertyCountry}
                  onChange={handleCountryChange}
                  setPageInput={(option) => ({
                      type: 'SET_PROPERTY_COUNTRY',
                      payload: option,
                })}
                />
                
              </div>

              {/* <div className='relative'>
                <InputField
                  label="Enter your Address:"
                  placeholder="Nigeria"
                  value={propertyImage}
                  onChange={handleImagesChange}
                  setPageInput={(option) => ({
                      type: 'SET_PROPERTY_IMAGE',
                      payload: option,
                })}
                />
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-gray-600 text-sm'>Images</label>
              </div> */}
            </div>

            <div className='flex justify-between items-center mt-5'>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${!propertyStreet || !propertyCity || !propertyState || !propertyZipCode || !propertyCountry ? "bg-gray-300 pointer-events-none" : ""}`}
                disabled={!propertyStreet || !propertyCity || !propertyState || !propertyZipCode || !propertyCountry}
                onClick={handleNextClick}
              >
                Proceed
              </button>
            </div>
        </div>
        
    </div>
  );
};

export default PageTestThree;
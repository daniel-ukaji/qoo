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
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <Link href="/" className=''>
              <div className="">
                <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
              </div>
            </Link>

            <div className="flex flex-col space-y-8">
              <div className='relative'>
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
                  <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-[#D1D5DB] text-sm'>Street</label>
              </div>

              <div className='relative'>
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
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-[#D1D5DB] text-sm'>City</label>
              </div>

              <div className='relative'>
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
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-[#D1D5DB] text-sm'>State (optional)</label>
              </div>

              <div className='relative'>
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
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-[#D1D5DB] text-sm'>ZipCode (optional)</label>
              </div>

              <div className='relative'>
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
                <label htmlFor="" className='absolute top-0 left-0 bg-white px-2 -mt-3 ml-3 text-[#D1D5DB] text-sm'>Country</label>
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

            <div>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200"
                disabled={!propertyStreet || !propertyCity || !propertyState || !propertyZipCode || !propertyCountry}
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
                <p className='text-4xl text-white font-bold'>Confirm your address</p>
                <p className='text-md text-white'>We will send your address to guests only when they've made reservations</p>
            </div>

            <div>

            </div>
        </div>
    </Layout>
  );
};

export default PageTestThree;
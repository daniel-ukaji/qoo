import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout'
import CheckButtons from '../components/CheckButtons';
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import store from '../store';
import { useApi } from '../utils/hooks/useApi';
import { useRouter } from "next/router";
import Loader from './Loader';
import { createproperty } from '../utils/api/property/createProperty';
// import { useHistory } from 'react-router-dom';



const PageTwelve = ({ prevStep }) => {
  const router = useRouter();
  // const history = useHistory();


    const dispatch = useDispatch();
    const selectedOption = useSelector((state) => state.propertyAdditionalNotes);
    const BookingConditions = useSelector((state) => state.propertyBookingConditions);

    const options = ['I am hosting as a private individual', 'I am hosting as a business'];
    const option2 = ['Security camera', 'Dangerous weapons', 'Dangerous animals']

    const handleNextClick = () => {
        if (!selectedOption || !BookingConditions) return; // Do not proceed if no option is selected
        dispatch({ type: 'SET_PROPERTY_ADDITIONAL_NOTES', payload: selectedOption });
        dispatch({ type: 'SET_PROPERTY_BOOKING_CONDITIONS', payload: BookingConditions });
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 14 });
    };

    const handleBackClick = () => {
      prevStep(dispatch({ type: 'SET_PAGE_NUMBER', payload: 12 }))
    }

    // const PropertyApi = useApi(createproperty);

    console.log(useSelector((state) => state?.propertyImages.url))

    const street = useSelector((state) => state.propertyStreet);
      const city = useSelector((state) => state.propertyCity);
      const state = useSelector((state) => state.propertyState);
      const zipcode = useSelector((state) => state.propertyZipCode);
      const country = useSelector((state) => state.propertyCountry);
      const clickBox = useSelector((state) => state.propertyType)
      const selectedBedrooms = useSelector((state) => state.propertyBedroomNumber);
      const selectedBeds = useSelector((state) => state.propertyGuestNumber);
      const selectedBathrooms = useSelector((state) => state.propertyBathroomNumber);
      const WhatToOffer = useSelector((state) => state.propertyServices);
      const ImageUpload = useSelector((state) => state.propertyImages);
      const createTitle = useSelector((state) => state.propertyName);
      const createDescription = useSelector((state) => state.propertyDescription);
      const Reservation = useSelector((state) => state.page10Selection);
      const Price = useSelector((state) => state.propertyBookingPrice);
      const Questions = useSelector((state) => state.propertyAdditionalNotes);
      const MoreQuestions = useSelector((state) => state.propertyBookingConditions);
      const Amenities = useSelector((state) => state.propertyAmenities);
      const Images = useSelector((state) => state?.propertyImages.url);
  

    const submitForm = async () => {
        
      // const data = store.getState();
      
      

      const data = {
        propertyHostId: "100001",
        propertyName: createTitle,
        propertyGPS: "asdfdsd",
        propertyCountry: country,
        propertyState: state,
        propertyCity: city,
        propertyStreet: street,
        propertyBookingPrice: Price,
        propertyBookingCurrency: "NGN",
        propertyDescription: createDescription,
        propertyType: clickBox,
        propertyAmenities: Amenities,
        propertyImages: Images,
        propertyGuestSpace: "SingleRoom",
        propertyGuestNumber: selectedBeds,
        propertyBedroomNumber: selectedBedrooms,
        propertyBathroomNumber: selectedBathrooms,
        propertyBedroomDescription: "Blue walls with neon bulbs. looking outside the window you can see wild animals do their stuff.",
        propertyCheckOut: "2022-07-07 21:04:45.440",
        propertyServices: WhatToOffer,
        propertyOptionalServices: "werfg",
        propertyBookingConditions: MoreQuestions,
        propertyBookingSecurityDeposit: "100034.65",
        propertyAdditionalNotes: Questions,
      }



      fetch('https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/property/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
    // Handle response data here
    router.push('/hostSuccess');
  })
  .catch(error => {
    // Handle error here
  });

      // const response = await PropertyApi.request(data);

      // console.log(response)
      // if(response.ok) {
      //   router.push({
      //     pathname: "/hostSuccess",
      //   });
      // }

    }
      
    //   try {
    //     const response = await axios.post('https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/property/create', data);
    //     console.log('Form submitted successfully:', response.data);
    //   } catch (error) {
    //     console.error('Error submitting form:', error);
    //   }
    // };      

    const handleSubmit = (event) => {
      event.preventDefault();
      
      
      submitForm();
    };


  return (
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <div className="">
              <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
            </div>


            <div className="flex flex-col space-y-8">
              <div>
                <h1 className='mb-5 font-bold'>How are you hosting on Qoospayce?</h1>
                <CheckButtons
                    options={options}
                    selectedOption={selectedOption}
                    setPageSelection={(option) => ({
                    type: 'SET_PROPERTY_ADDITIONAL_NOTES',
                    payload: option,
                    })}
                />
              </div>
                
                <div>
                  <h1 className='mb-5 font-bold'>Does your place have any of these?</h1>
                  <CheckButtons
                      options={option2}
                      selectedOption={BookingConditions}
                      setPageSelection={(option) => ({
                      type: 'SET_PROPERTY_BOOKING_CONDITIONS',
                      payload: option,
                      })}
                  />
                </div>
            </div>

            {/* <div className="">
                <h1>How are you hosting on Qoospayce?</h1>
                <CheckButtons
                    options={options}
                    selectedOption={selectedOption}
                    setPageSelection={(option) => ({
                    type: 'SET_PROPERTY_ADDITIONAL_NOTES',
                    payload: option,
                    })}
                />
            </div> */}

            <div>
            <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-black focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200"
                onClick={handleBackClick}
              >
                Back
              </button>

              {/* {PropertyApi.loading ? ( */}
                {/* <div className="flex items-center justify-center">
                  <Loader fill_color="fill-primary" />
                </div> */}
              {/* ):( */}
                <button
                  className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200"
                  disabled={!selectedOption || !BookingConditions}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              {/* )} */}
            </div>
        </div>
        <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
            {/* <!-- Content for the right side --> */}
            <div className='h-10 w-10'>
                <Image src={HostFrame}  />
            </div>

            <div className='font-sora font-bold mb-36 flex flex-col space-y-5'>
                <p className='text-3xl text-white'>2.</p>
                <p className='text-4xl text-white'>Now set your price</p>
            </div>

            <div>

            </div>
        </div>
    </Layout>
  );
};

export default PageTwelve;

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
import { useAuth } from '../utils/hooks/useAuth';
import Link from 'next/link';
import logopic from '../public/images/qoo_logo.png';

// import { useHistory } from 'react-router-dom';



const PageTwelve = ({ prevStep }) => {
  const router = useRouter();
  // const history = useHistory();

  const userHost = useAuth();
  console.log(userHost.user)
  const userHos = userHost.user?.userHostId


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
      const propertyImages = useSelector((state) => state?.propertyImages);
      const GuestSpace = useSelector((state) => state?.propertyGuestSpace);

      const imageString = propertyImages?.map((image) => image.toString()).join(',');

      console.log(selectedBathrooms)

      console.log(imageString)

      const flattenedAmenities = WhatToOffer.flat().filter((item, index, self) => {
        return item && self.indexOf(item) === index;
      });

      const flatAmenities = flattenedAmenities.toString()
      console.log(flatAmenities)

      const uniqueArray = WhatToOffer.filter((item, index, self) => {
        return self.indexOf(item) === index;
      });

      console.log(GuestSpace)
      console.log(imageString)


      // console.log(uniqueArray)

      // console.log(WhatToOffer)

      

      
  
      // console.log(WhatToOffer)
    const submitForm = async () => {
        
      // const data = store.getState();
      
      

      const data = {
        propertyHostId: userHos,
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
        propertyImages: imageString,
        propertyGuestSpace: "SingleRoom",
        propertyGuestNumber: selectedBeds,
        propertyBedroomNumber: selectedBedrooms,
        propertyBathroomNumber: selectedBathrooms,
        propertyBedroomDescription: "Blue walls with neon bulbs. looking outside the window you can see wild animals do their stuff.",
        propertyCheckOut: "2022-07-07 21:04:45.440",
        propertyServices: flatAmenities,
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
    
    if (data.responseCode !== "00") {
      // Handle the error here
      router.push('/hostError');
      console.error(data.responseMessage);
    } else {
      // Handle successful submission here
      // alert('Successful');
      router.push('/hostSuccess');
    }
  })
  .catch(error => {
    // console.error(error);
    // alert('There was a problem submitting your request. Please try again later.');
    debugger;
  });

    }
      
      

    const handleSubmit = (event) => {
      event.preventDefault();
      
      
      submitForm();
    };


  return (
    <div className='bg-white font-sora'>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between max-w-[40rem] mx-auto">
            {/* <!-- Content for the left side --> */}
            <div className="relative w-14 h-14 cursor-pointer mb-5">
              <Link href='/'>
                <Image src={logopic} layout='fill' objectFit='cover' />
              </Link>
            </div>


            <div className="flex flex-col space-y-8">
            <h1 className='text-4xl font-semibold mb-5'>Just one last step!</h1>
              <div>
                <h1 className='text-xl font-semibold mb-5'>How are you hosting on Qoospayce?</h1>
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
                  <h1 className='text-xl font-semibold mb-5'>Does your place have any of these?</h1>
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

            <div className='flex justify-between'>
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
                  className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 ${!selectedOption || !BookingConditions ? "bg-gray-300 pointer-events-none" : ""}`}
                  disabled={!selectedOption || !BookingConditions}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              {/* )} */}
            </div>
        </div>
        
    </div>
  );
};

export default PageTwelve;

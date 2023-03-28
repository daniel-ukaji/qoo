import Image from 'next/image';
import { useSelector } from 'react-redux';
import axios from 'axios';
import store from '../store';
import { useAuth } from "../utils/hooks/useAuth";
import { useApi } from '../utils/hooks/useApi';
import { imageurl } from '../utils/api/imagecreate/ImageUrl';



const PageFive = () => {

    const user = useAuth();
    // const hostId = user.user?.userHostId
    // console.log(user.user?.userHostId)

    // const ImageApi = useApi(imageurl)

    // const ImageData = {
    //   username : hostId,
    //   base64 : useSelector((state) => state.propertyImages),
    //   region : "us-east-1",
    //   source : "qucoon",
    //   s3bucket : "qoospayce-repo"
    // }

    // console.log(useSelector((state) => state.propertyImages))

    // const PropertyApi = useApi(createproperty);

    const submitForm = async () => {
        
        const data = store.getState();
        // const response = await ImageApi.request(ImageData);
        // console.log(response)


        const url = "https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/property/create";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then((response) => response.json())
              .then((data) => console.log(data))
              .catch((error) => console.error(error));
        // const responseData = await response.json();
        // console.log(responseData)
        // return responseData;
      }
        
      //   try {
      //     const response = await axios.post('https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/property/create', data);
      //     console.log('Form submitted successfully:', response)
      //   } catch (error) {
      //     console.error('Error submitting form:', error);
      //   }
      // };      



      

      // if (response.data.url) {
      //   const response = axios.post('')
      // }

      const handleSubmit = (event) => {
        event.preventDefault();
        
        
        submitForm();
      };

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
  // const Images = useSelector((state) => state.propertyImages)

  // console.log(ImageUpload)

  return (
    <>
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">Page Five</h1>
      <p className="text-xl">Street: {street}</p>
      <p className="text-xl">City: {city}</p>
      <p className="text-xl">State: {state}</p>
      <p className="text-xl">Zip Code: {zipcode}</p>
      <p className="text-xl">Country: {country}</p>
      <p className="text-xl">clickBox: {clickBox}</p>
      <p className="text-xl">Bedrooms: {selectedBedrooms}</p>
      <p className="text-xl">Beds: {selectedBeds}</p>
      <p className="text-xl">Bathrooms: {selectedBathrooms}</p>
      <p className="text-xl">What To Offer: {WhatToOffer}</p>
      <p className="text-xl">Image Upload: <img src={ImageUpload} /></p>
      <p className="text-xl">Create Your Title: {createTitle}</p>
      <p className="text-xl">Create Your Description: {createDescription}</p>
      <p className="text-xl">Create Your Reservation: {Reservation}</p>
      <p className="text-xl">Price: {Price}</p>
      <p className="text-xl">Questions: {Questions}</p>
      <p className="text-xl">Booking Conditions: {MoreQuestions}</p>
    </div>

    <form onSubmit={handleSubmit} className='flex items-center justify-center'>
        <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default PageFive;

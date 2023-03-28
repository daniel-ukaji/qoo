import React, { useEffect, useState } from 'react'
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Router, { useRouter } from 'next/router';
import { fetchproperty } from "../../utils/api/property/getProperty";
import { fetchproperties } from "../../utils/api/property/getProperties";
import Header from '../../components/misc/header';
import Footer from '../../components/misc/footer';
import HostHeader from '../../components/misc/hostHeader';
import { BiChevronLeft } from 'react-icons/bi';
import { FiHeart, FiMapPin, FiShare2, FiUser } from 'react-icons/fi';
import { FcLike } from 'react-icons/fc';
import roomImage from "/public/images/room_image.png";
import Image from 'next/image';
import { useApi } from '../utils/hooks/useApi';

const PropertyName = () => {
    const [hasBeenLiked, setHasBeenLiked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [propertyName, setPropertyName] = useState("");


const router = useRouter();
  const { propertyId } = router.query;

  const {
    data: property,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", propertyId],
    queryFn: () => fetchproperty(propertyId),
    cacheTime: 60000 * 30,
    staleTime: 30000,
  });

  const propertyApi = useApi(updateProperty);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (property) {
      setPropertyName(property.propertyName);
    }
  }, [property])

  const onSubmit = async () => {
    let req = {
        propertyId,
        propertyName,
        propertyType: "House",
        propertyAmenities: "Wifi",
        propertyBathroomNumber: "3",
        propertyDescription: "qwertrewqwef",
        propertyServices: "ywuhjdkw",
        propertyCity: "Akure",
        propertyState: "Ondo",
        propertyStreet: "Owo",
        propertyBedroomNumber: "5",
        propertyCountry: "Nigeria",
        propertyStatus: "Active",
        propertyGuestNumber: "6",
        propertyGuestSpace: "2"
      };

      const response = await propertyApi.request(req);

      console.log(response)
  }

  if (property) {
    // const img = new Image();

  return (
    <div>
        <HostHeader />
        <section className="mx-auto  mt-8 mb-14 max-w-[90rem] py-7">
        <button
            onClick={() => Router.back()}
            className="flex items-center px-2 py-3 space-x-3 border border-gray-200 rounded-lg w-fit"
          >
            <BiChevronLeft className="text-gray-900" />
            <h1>Back to home</h1>
          </button>

          <div className="mt-7">
            <h1 className="text-2xl font-bold text-gray-800">
              {property.propertyName} @{property.propertyGPS}{" "}
              {property.propertyStreet}
            </h1>
          </div>

          <div className="flex justify-between mt-2">
            <div className="flex self-end space-x-2">
              <div className="flex items-center space-x-1">
                <FiMapPin className="w-4 h-4 text-primary" />
                <h1 className="text-sm font-normal text-secondary">
                  Ikeja, Lagos
                </h1>
              </div>
              <div className="flex items-center space-x-1">
                <FiUser className="w-4 h-4 text-primary" />
                <h1 className="text-sm font-normal text-secondary">
                  JJM Consults
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
            <button
            onClick={() => Router.back()}
            className="flex items-center px-2 py-3 space-x-3 border border-gray-200 rounded-lg w-fit"
          >
            <h1>Preview Property</h1>
          </button>
            </div>
          </div>

          <div className="mt-9">
          <h1 className='font-bold mb-5 text-xl'>Photo</h1>
            {/* Image player ideally */}
            <div className="flex h-[32.5rem] w-full">
            {/* {property.propertyGeneral.split(",").map((item) => {
                    return (
                      
                      <div className="p-2 bg-gray-200 rounded">{item}</div>
                        
                      
                    )
                  })} */}
              {/* Big Image */}
              
              <div className="relative w-1/2 h-full">
                <Image
                  src={roomImage}
                  alt="room image"
                  className="absolute h-full w-full rounded-tl-[10px] rounded-bl-[10px]"
                  layout="fill"
                />
              </div>
              {/* Sub images */}
              <div className="flex flex-col justify-between w-1/2 h-full ml-6">
                <div className="flex justify-between">
                  <div className="relative h-[15.688rem] w-fourty8 ">
                    <Image
                      src={roomImage}
                      alt="room image"
                      className="absolute w-full h-full"
                      layout="fill"
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8 ">
                    <Image
                      src={roomImage}
                      alt="room image"
                      className="absolute h-full w-full rounded-tr-[10px]"
                      layout="fill"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="relative h-[15.688rem] w-fourty8">
                    <Image
                      src={roomImage}
                      alt="room image"
                      className="absolute w-full h-full"
                      layout="fill"
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8">
                    <Image
                      src={roomImage}
                      alt="room image"
                      className="absolute h-full w-full rounded-br-[10px]"
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-10">
            <div className="border rounded-lg p-4 mr-2 w-1/2">
                {/* Content for the first box goes here */}
                <h1 className='font-bold text-xl mb-5'>Listing Basics</h1>
                <div className='flex justify-between border-b'>
                    <div className='mb-5'>
                        <p>Listing Title</p>
                        {isEditing ? (

                        
                        <div>
                          <input 
                            type="propertyName"
                            name="propertyName"
                            id="propertyName"
                            value={propertyName}
                            onChange={(e) => setPropertyName(e.target.value)}
                            className="inputbox-full"
                            placeholder="Email address"
                          />
                          <button
                          onClick={handleSaveClick}
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 ml-4"
                          >
                            Save
                          </button>
                        </div>
                        
                        ):(
                          <div className='flex justify-between'>
                            <p className='text-gray-500'>{propertyName}</p>
                            <button onClick={handleEditClick} className='font-bold'>Edit</button>
                          </div>
                        )}
                        </div>
                </div>

                <div className='mt-5 border-b'>
                    <div className='flex justify-between'>
                        <h1>Property Description</h1>
                        <button className='font-bold'>Edit</button>
                    </div>
                    <div className='mt-5 mb-5'>
                        <p className='text-gray-500'>{property.propertyDescription}</p>
                    </div>
                </div>

                <div className='mt-5 border-b'>
                    <div className='flex justify-between'>
                        <h1>Number of guests</h1>
                        <button className='font-bold'>Edit</button>
                    </div>
                    <div className='mt-3 mb-5'>
                        <p className=''>{property.propertyGuestNumber}</p>
                    </div>
                </div>

                <div className='mt-5 border-b'>
                    <div className='flex justify-between'>
                        <h1>Location</h1>
                        <button className='font-bold'>Edit</button>
                    </div>
                    <div className='mt-3 mb-5'>
                        <p className='text-gray-500'>{property.propertyStreet}</p>
                    </div>
                </div>

                
            </div>
            <div className="border rounded-lg p-4 ml-2 w-1/2">
                {/* Content for the second box goes here */}
                <h1 className='font-bold text-xl mb-5'>Property and Rooms</h1>
                <div className='flex justify-between border-b'>
                    <div className='mb-5'>
                        <p>Property Type</p>
                        <p className='text-gray-500'>Property type: {property.propertyType}</p>
                    </div>
                    <button className='font-bold'>Edit</button>
                </div>

                <div className='mt-5 border-b'>
                    <div className='flex justify-between'>
                        <h1>Rooms and spaces</h1>
                        <button className='font-bold'>Edit</button>
                    </div>
                    <div className='mt-5 mb-5'>
                        <p className='text-gray-500'>Bedrooms: {property.propertyBedroomNumber}</p>
                        <p className='text-gray-500'>Bed: {property.propertyGuestNumber}</p>
                        <p>Bathrooms: 4</p>
                        <p>Additional areas: 0</p>
                    </div>
                </div>

                <div className='mt-5 border-b'>
                    <div className='flex justify-between'>
                        <h1>Amenities</h1>
                        <button className='font-bold'>Edit</button>
                    </div>
                    <div className='mt-3 mb-5'>
                        <div
                            className="flex items-center px-2 py-3 space-x-3 border border-gray-200 rounded-lg w-fit"
                        >
                            {property.propertyAmenities}
                        </div>
                    </div>
                </div>

                <div className='mt-5 border-b'>
                    <div className='flex justify-between'>
                        <h1>Guests and safety</h1>
                        <button className='font-bold'>Edit</button>
                    </div>
                    <div className='mt-3 mb-5'>
                        <p className='text-gray-500'>{property.propertyBookingConditions}</p>
                    </div>
                </div>
            </div>
        </div>



        </section>
    </div>
  );
} else {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center h-screen mx-auto font-extrabold font-sora text-primary">
          PAGE NOT FOUND
        </div>
        <Footer />
      </div>
    );
  }
}

export default PropertyName

export const getStaticProps = async (context) => {
    const { params } = context;
    const { propertyId } = params;
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery(["post", propertyId], () =>
      fetchproperty(propertyId)
    );
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 600,
    };
  };
  
  export const getStaticPaths = async () => {
    let properties = [];
  
    try {
      const response = await fetchproperties();
      properties = response;
    } catch (error) {
      properties = [];
    }
  
    const paths = properties.map((property) => ({
      params: {
        propertyId: property?.propertyId.toString(),
      },
    }));
  
    return {
      paths,
      fallback: true,
    };
  };
  
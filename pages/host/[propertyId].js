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
import { useApi } from '../../utils/hooks/useApi';
import { updateProperty } from '../../utils/api/property/updateProperty';
import { toast } from 'react-toastify';
import Head from 'next/head';
import NavHeader from '../../components/misc/NavHeader';

const PropertyName = () => {
    const [activeTab, setActiveTab] = useState('listing');
    const [hasBeenLiked, setHasBeenLiked] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingGuestNumber, setIsEditingGuestNumber] = useState(false);
    const [isEditingPropertyStreet, setIsEditingPropertyStreet] = useState(false);
    const [isEditingPropertyType, setIsEditingPropertyType] = useState(false);
    const [isEditingRoomsAndSpaces, setIsEditingRoomsAndSpaces] = useState(false);
    const [isEditingPropertyAmenities, setIsEditingPropertyAmenities] = useState(false);
    const [isEditingPropertyBookingConditions, setIsEditingPropertyBookingConditions] = useState(false);
    const [isEditingPropertyBookingPrice, setIsEditingPropertyBookingPrice] = useState(false);
    const [isEditingPropertyBookingCurrency, setIsEditingPropertyBookingCurrency] = useState(false);
    const [isEditingPropertyAdditionalNotes, setIsEditingPropertyAdditionalNotes] = useState(false);
    const [propertyName, setPropertyName] = useState("");
    const [propertyDescription, setPropertyDescription] = useState("");
    const [propertyGuestNumber, setpropertyGuestNumber] = useState("");
    const [propertyStreet, setPropertyStreet] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [propertyBedroomNumber, setPropertyBedroomNumber] = useState("");
    const [propertyAmenities, setPropertyAmenities] = useState("");
    const [propertyBookingConditions, setPropertyBookingConditions] = useState("");
    const [propertyBookingPrice, setPropertyBookingPrice] = useState("");
    const [propertyBookingCurrency, setPropertyBookingCurrency] = useState("");
    const [propertyAdditionalNotes, setPropertyAdditionalNotes] = useState("");

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
    setIsEditingName(true);
  };

  const handleSaveClick = () => {
    setIsEditingName(false);
  };

  const handleEditClickDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveClickDescription = () => {
    setIsEditingDescription(false);
  };

  const handleEditClickGuestNumber = () => {
    setIsEditingGuestNumber(true);
  };

  const handleSaveClickGuestNumber = () => {
    setIsEditingGuestNumber(false);
  };

  const handleEditClickPropertyStreet = () => {
    setIsEditingPropertyStreet(true);
  };

  const handleSaveClickPropertyStreet = () => {
    setIsEditingPropertyStreet(false);
  };

  const handleEditClickPropertyType = () => {
    setIsEditingPropertyType(true);
  };

  const handleSaveClickPropertyType = () => {
    setIsEditingPropertyType(false);
  };

  const handleEditClickPropertyBedroomNumber = () => {
    setIsEditingRoomsAndSpaces(true);
  };

  const handleSaveClickPropertyBedroomNumber = () => {
    setIsEditingRoomsAndSpaces(false);
  };

  const handleEditClickPropertyAmenities = () => {
    setIsEditingPropertyAmenities(true);
  };

  const handleSaveClickPropertyAmenities = () => {
    setIsEditingPropertyAmenities(false);
  };

  const handleEditClickPropertyBookingConditions = () => {
    setIsEditingPropertyBookingConditions(true);
  };

  const handleSaveClickPropertyBookingConditions = () => {
    setIsEditingPropertyBookingConditions(false);
  };

  const handleEditClickPropertyBookingPrice = () => {
    setIsEditingPropertyBookingPrice(true);
  };

  const handleSaveClickPropertyBookingPrice = () => {
    setIsEditingPropertyBookingPrice(false);
  };

  const handleEditClickPropertyBookingCurrency = () => {
    setIsEditingPropertyBookingCurrency(true);
  };

  const handleSaveClickPropertyBookingCurrency = () => {
    setIsEditingPropertyBookingCurrency(false);
  };

  const handleEditClickPropertyAdditionalNotes = () => {
    setIsEditingPropertyAdditionalNotes(true);
  };

  const handleSaveClickPropertyAdditionalNotes = () => {
    setIsEditingPropertyAdditionalNotes(false);
  };

  useEffect(() => {
    if (property) {
      setPropertyName(property.propertyName);
      setPropertyDescription(property.propertyDescription);
      setpropertyGuestNumber(property.propertyGuestNumber);
      setPropertyStreet(property.propertyStreet);
      setPropertyType(property.propertyType);
      setPropertyBedroomNumber(property.propertyBedroomNumber);
      setPropertyAmenities(property.propertyAmenities);
      setPropertyBookingConditions(property.propertyBookingConditions);
      setPropertyBookingPrice(property.propertyBookingPrice);
      setPropertyBookingCurrency(property.propertyBookingCurrency);
      setPropertyAdditionalNotes(property.propertyAdditionalNotes);
    }
  }, [property])

  useEffect(() => {
    setActiveTab(tabs[0].id);
  }, []);


  const onSubmit = async () => {
    let req = {
        propertyId,
        propertyName,
        propertyType,
        propertyAmenities,
        propertyBathroomNumber: "3",
        propertyDescription,
        propertyServices: "ywuhjdkw",
        propertyCity: "Akure",
        propertyState: "Ondo",
        propertyBookingPrice,
        propertyStreet,
        propertyBedroomNumber,
        propertyCountry: "Nigeria",
        propertyStatus: "Active",
        propertyGuestNumber,
        propertyGuestSpace: "2"
      };

      let id = toast.loading("We are publishing your listing...");

      const response = await propertyApi.request(req);

      console.log(response)

      toast.update(id, {
        type: response.data.responseCode !== "00" ? "error" : "success",
        render: response.data.responseMessage,
        isLoading: propertyApi.loading,
        autoClose: true,
        onClick: () => !propertyApi.errorMessage && toast.dismiss(),
      });

  }

  

  function ListingDetails() {
    
    if (property) {
        return (
            
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
              
              <div className="relative w-full lg:w-1/2 h-full">
                <Image
                  src={property.propertyImages[0].propertyImageUrl}
                  alt="room image"
                  className="absolute h-full w-full rounded-tl-[10px] rounded-bl-[10px]"
                  layout="fill"
                  objectFit='cover'
                />
              </div>
              {/* Sub images */}
              <div className="flex hidden lg:flex flex-col justify-between w-1/2 h-full ml-6">
                <div className="flex justify-between">
                  <div className="relative h-[15.688rem] w-fourty8 ">
                    <Image
                      src={property.propertyImages[0].propertyImageUrl}
                      alt="room image"
                      className="absolute w-full h-full"
                      layout="fill"
                      objectFit='cover'
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8 ">
                    <Image
                      src={property.propertyImages[0].propertyImageUrl}
                      alt="room image"
                      className="absolute h-full w-full rounded-tr-[10px]"
                      layout="fill"
                      objectFit='cover'
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="relative h-[15.688rem] w-fourty8">
                    <Image
                      src={property.propertyImages[0].propertyImageUrl}
                      alt="room image"
                      className="absolute w-full h-full"
                      layout="fill"
                      objectFit='cover'
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8">
                    <Image
                      src={property.propertyImages[0].propertyImageUrl}
                      alt="room image"
                      className="absolute h-full w-full rounded-br-[10px]"
                      layout="fill"
                      objectFit='cover'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-5 md:space-y-0 lg:flex-row mt-10">
                <div className="border rounded-lg p-4 mr-2 w-full lg:w-1/2">
                    {/* Content for the first box goes here */}
                    <h1 className='font-bold text-xl mb-5'>Listing Basics</h1>
                    <div className='flex justify-between border-b'>
                        <div className='mb-5'>
                            <p>Listing Title</p>
                            {isEditingName ? (

                            
                            <div>
                            <input 
                                type="propertyName"
                                name="propertyName"
                                id="propertyName"
                                value={propertyName}
                                onChange={(e) => setPropertyName(e.target.value)}
                                className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                placeholder="Email address"
                                autoFocus
                            />
                            <button
                            onClick={handleSaveClick}
                            className="bg-[#DB5461] hover:bg-[#c13845] text-white mt-5 ml-4 lg:ml-0 rounded-lg px-4 py-2"
                            >
                                Save
                            </button>
                            </div>
                            
                            ):(
                                <div className='flex justify-between w-[20rem] md:w-[27rem]'>
                                    <div className=''>
                                        <p className='text-gray-500'>{propertyName}</p>
                                    </div>
                                    <div>
                                        <button onClick={handleEditClick} className='font-bold'>Edit</button>
                                    </div>
                            </div>
                            )}
                            </div>
                    </div>

                    <div className='mt-5 border-b'>
                            <h1>Property Description</h1>
                            {isEditingDescription ? (
                                <div>
                                <input 
                                    type="propertyName"
                                    name="propertyName"
                                    id="propertyName"
                                    value={propertyDescription}
                                    onChange={(e) => setPropertyDescription(e.target.value)}
                                    className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                    placeholder="Email address"
                                    autoFocus
                                />
                                <button
                                onClick={handleSaveClickDescription}
                                className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                                >
                                    Save
                                </button>
                                </div>

                                ):(
                                    <div className='flex justify-between w-[20rem] md:w-[27rem] mb-3 mt-3'>
                                        <div className=''>
                                            <p className='text-gray-500'>{propertyDescription}</p>
                                        </div>
                                        <div>
                                            <button onClick={handleEditClickDescription} className='font-bold'>Edit</button>
                                        </div>
                                </div>
                            )}
                    </div>

                    <div className='mt-5 border-b'>
                            <h1>Number of guests</h1>
                            {isEditingGuestNumber ? (
                                <div>
                                    
                                <input 
                                    type="propertyName"
                                    name="propertyName"
                                    id="propertyName"
                                    value={propertyGuestNumber}
                                    onChange={(e) => setpropertyGuestNumber(e.target.value)}
                                    className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                    placeholder="Number of Guests"
                                    autoFocus
                                />
                                <button
                                onClick={handleSaveClickGuestNumber}
                                className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                                >
                                    Save
                                </button>
                                </div>

                                ):(
                                  <div className='flex justify-between w-[20rem] md:w-[27rem] mb-3 mt-3'>
                                      <div className=''>
                                            <p className='text-gray-500'>{propertyGuestNumber}</p>
                                        </div>
                                        <div>
                                            <button onClick={handleEditClickGuestNumber} className='font-bold'>Edit</button>
                                        </div>
                                </div>
                            )}
                    </div>

                    <div className='mt-5 border-b'>
                            <h1>Location</h1>
                            {isEditingPropertyStreet ? (
                                <div>
                                    
                                <input 
                                    type="propertyName"
                                    name="propertyName"
                                    id="propertyName"
                                    value={propertyStreet}
                                    onChange={(e) => setPropertyStreet(e.target.value)}
                                    className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                    placeholder="Email address"
                                    autoFocus
                                />
                                <button
                                onClick={handleSaveClickPropertyStreet}
                                className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                                >
                                    Save
                                </button>
                                </div>

                                ):(
                                  <div className='flex justify-between w-[20rem] md:w-[27rem] mb-3 mt-3'>
                                        <div className=''>
                                            <p className='text-gray-500'>{propertyStreet}</p>
                                        </div>
                                        <div>
                                            <button onClick={handleEditClickPropertyStreet} className='font-bold'>Edit</button>
                                        </div>
                                </div>
                            )}
                    </div>

                    
                </div>
                <div className="border rounded-lg p-4 ml-0 lg:ml-2 w-full lg:w-1/2">
                    {/* Content for the second box goes here */}
                    <h1 className='font-bold text-xl mb-5'>Property and Rooms</h1>
                    <div className='border-b'>
                            <p>Property Type</p>
                            {isEditingPropertyType ? (
                                <div>
                                    
                                <input 
                                    type="propertyName"
                                    name="propertyName"
                                    id="propertyName"
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                    placeholder="Email address"
                                    autoFocus
                                />
                                <button
                                onClick={handleSaveClickPropertyType}
                                className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                                >
                                    Save
                                </button>
                                </div>

                                ):(
                                  <div className='flex justify-between w-[20rem] md:w-[27rem] mb-3 mt-3'>
                                        <div className=''>
                                            <p className='text-gray-500'>{propertyType}</p>
                                        </div>
                                        <div>
                                            <button onClick={handleEditClickPropertyType} className='font-bold'>Edit</button>
                                        </div>
                                </div>
                            )}
                    </div>

                    <div className='mt-5 border-b'>
                            <h1>Rooms and spaces</h1>
                            {isEditingRoomsAndSpaces ? (
                                <div>
                                    
                                <input 
                                    type="propertyName"
                                    name="propertyName"
                                    id="propertyName"
                                    value={propertyBedroomNumber}
                                    onChange={(e) => setPropertyBedroomNumber(e.target.value)}
                                    className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                    placeholder="Bedroom Number"
                                    autoFocus
                                />
                                <button
                                onClick={handleSaveClickPropertyBedroomNumber}
                                className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                                >
                                    Save
                                </button>
                                </div>

                                ):(
                                    <div className='flex justify-between w-[20rem] md:w-[27rem] mb-3 mt-3'>
                                        <div>
                                            <p className='text-gray-500'>Bedrooms: {propertyBedroomNumber}</p>
                                            <p className='text-gray-500'>Bed: 3</p>
                                            <p>Bathrooms: 4</p>
                                            <p>Additional areas: 0</p>
                                        </div>
                                        <div>
                                            <button onClick={handleEditClickPropertyBedroomNumber} className='font-bold'>Edit</button>
                                        </div>
                                    </div>
                            )}
                    </div>

                    <div className='mt-5 border-b'>
                            <h1>Amenities</h1>
                            {isEditingPropertyAmenities ? (
                                <div>
                                    
                                <input 
                                    type="propertyName"
                                    name="propertyName"
                                    id="propertyName"
                                    value={propertyAmenities}
                                    onChange={(e) => setPropertyAmenities(e.target.value)}
                                    className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                    placeholder="Email address"
                                    autoFocus
                                />
                                <button
                                onClick={handleSaveClickPropertyAmenities}
                                className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                                >
                                    Save
                                </button>
                                </div>

                                ):(
                                  <div className='flex justify-between w-[20rem] md:w-[27rem] mb-3 mt-3'>
                                        <div className=''>
                                            <div className="flex items-center px-2 py-3 space-x-3 border border-gray-200 rounded-lg w-fit">
                                                {propertyAmenities}
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={handleEditClickPropertyAmenities} className='font-bold'>Edit</button>
                                        </div>
                                </div>
                            )}
                    </div>

                    <div className='mt-5 border-b'>
                            <h1>Guests and safety</h1>
                            {isEditingPropertyBookingConditions ? (
                                <div>
                                    
                                <input 
                                    type="propertyName"
                                    name="propertyName"
                                    id="propertyName"
                                    value={propertyBookingConditions}
                                    onChange={(e) => setPropertyBookingConditions(e.target.value)}
                                    className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                    placeholder="Email address"
                                    autoFocus
                                />
                                <button
                                onClick={handleSaveClickPropertyBookingConditions}
                                className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                                >
                                    Save
                                </button>
                                </div>

                                ):(
                                  <div className='flex justify-between w-[20rem] md:w-[27rem] mb-3 mt-3'>
                                        <div className=''>
                                            <p className='text-gray-500'>{propertyBookingConditions}</p>
                                        </div>
                                        <div>
                                            <button onClick={handleEditClickPropertyBookingConditions} className='font-bold'>Edit</button>
                                        </div>
                                </div>
                            )}
                    </div>
                </div>
                </div>
          </div>

                
        )
    }

  }

  function PricingAvailability() {
    if (property) {
        return (
            <div className="flex flex-col lg:flex-row mt-10">
                <div className="border rounded-lg p-4 mr-2 w-full lg:w-1/2">
                    {/* Content for the first box goes here */}
                    <h1 className='font-bold text-xl mb-5'>Pricing</h1>
                    <div className='flex justify-between border-b'>
                        <div className='mb-5'>
                            <p>Base Price</p>
                            {isEditingPropertyBookingPrice ? (

                            
                            <div>
                            <input 
                                type="propertyName"
                                name="propertyName"
                                id="propertyName"
                                value={propertyBookingPrice}
                                onChange={(e) => setPropertyBookingPrice(e.target.value)}
                                className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                placeholder="Your Property Price"
                                autoFocus
                            />
                            <button
                            onClick={handleSaveClickPropertyBookingPrice}
                            className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                            >
                                Save
                            </button>
                            </div>
                            
                            ):(
                              <div className='flex justify-between w-[20rem] md:w-[27rem]'>
                              <div className=''>
                                        <p className='text-gray-500'>{propertyBookingPrice}</p>
                                    </div>
                                    <div>
                                        <button onClick={handleEditClickPropertyBookingPrice} className='font-bold'>Edit</button>
                                    </div>
                            </div>
                            )}
                            </div>
                    </div>

                    <div className='mt-5 border-b'>
                            <h1>Listing Currency</h1>
                            {isEditingPropertyBookingCurrency ? (
                                <div>
                                <input 
                                    type="propertyName"
                                    name="propertyName"
                                    id="propertyName"
                                    value={propertyBookingCurrency}
                                    onChange={(e) => setPropertyBookingCurrency(e.target.value)}
                                    className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                    placeholder="Email address"
                                    autoFocus
                                />
                                <button
                                onClick={handleSaveClickPropertyBookingCurrency}
                                className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                                >
                                    Save
                                </button>
                                </div>

                                ):(
                                  <div className='flex justify-between w-[20rem] md:w-[27rem] mt-3 mb-3'>
                                  <div className=''>
                                            <p className='text-gray-500'>{propertyBookingCurrency}</p>
                                        </div>
                                        <div>
                                            <button onClick={handleEditClickPropertyBookingCurrency} className='font-bold'>Edit</button>
                                        </div>
                                </div>
                            )}
                    </div>

                    
                </div>
                <div className="border rounded-lg p-4 ml-0 lg:ml-2 w-full lg:w-1/2">
                    {/* Content for the second box goes here */}
                    <h1 className='font-bold text-xl mb-5'>Availability</h1>
                    <div className='border-b'>
                            <p>Calendar Availability</p>
                            {isEditingPropertyAdditionalNotes ? (
                                <div>
                                    
                                <input 
                                    type="propertyName"
                                    name="propertyName"
                                    id="propertyName"
                                    value={propertyAdditionalNotes}
                                    onChange={(e) => setPropertyAdditionalNotes(e.target.value)}
                                    className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[13.375rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2 mt-3"
                                    placeholder="Email address"
                                    autoFocus
                                />
                                <button
                                onClick={handleSaveClickPropertyAdditionalNotes}
                                className="bg-[#DB5461] hover:bg-[#c13845] text-white ml-4 lg:ml-0 mt-5 rounded-lg px-4 py-2"
                                >
                                    Save
                                </button>
                                </div>

                                ):(
                                  <div className='flex justify-between w-[20rem] md:w-[27rem] mt-3 mb-3'>
                                  <div className=''>
                                            <p className='text-gray-500'>Additional Notes: {propertyAdditionalNotes}</p>
                                        </div>
                                        <div>
                                            <button onClick={handleEditClickPropertyAdditionalNotes} className='font-bold'>Edit</button>
                                        </div>
                                </div>
                            )}
                    </div>
                </div>
                </div>
        )
    }
  }

  const tabs = [
    { id: 'listingdetails', label: 'Listing Details' },
    { id: 'pricingavailability', label: 'Pricing Availability' },
  ];

  if (property) {
    // const img = new Image();

  return (
    <div>
      <Head>
        <title>QooSpayce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/qoo_logo.png" />
      </Head>
        {/* <HostHeader /> */}
        <NavHeader />

        <section className="md:mx-auto mb-14 md:max-w-full md:px-10 py-7">
        {/* <button
            onClick={() => Router.back()}
            className="flex items-center px-2 py-3 space-x-3 border border-gray-200 rounded-lg w-fit"
          >
            <BiChevronLeft className="text-gray-900" />
            <h1>Back to home</h1>
          </button> */}

          <div className="mt-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {property.propertyName}
            </h1>
          </div>

          <div className="flex justify-between mt-2">
            <div className="flex self-end space-x-2">
              <div className="flex items-center space-x-1">
                <FiMapPin className="hidden xl:block w-4 h-4 text-primary" />
                <h1 className="text-sm font-normal text-secondary">
                  {property.propertyStreet}
                </h1>
              </div>
              <div className="flex items-center space-x-1">
                <FiUser className="hidden xl:block w-4 h-4 text-primary" />
                <h1 className="text-sm font-normal text-secondary">
                {property.propertyHost.hostFirstName} {" "} {property.propertyHost.hostLastName}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={onSubmit}
                    className="bg-[#DB5461] hover:bg-[#c13845] text-white mt-5 rounded-lg px-4 py-2"
                    >
                        Publish
                </button>
            </div>
          </div>

          <div className=''>
            <div>
                <div className="flex mb-5 mt-5">
                    {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        className={`py-1 px-6 border rounded-1-md ${activeTab === tab.id ? 'bg-[#DB5461] text-white' : 'bg-[#FFFFFF] text-gray-500'} ${index > 0 ? 'border-l border-t border-gray-200' : ''} border-r border-gray-300`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                    ))}
                </div>
                <div>
                    {activeTab === 'listingdetails' && <ListingDetails />}
                    {activeTab === 'pricingavailability' && <PricingAvailability />}
                    
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
  
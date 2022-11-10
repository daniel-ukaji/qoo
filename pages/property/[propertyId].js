import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { BiChevronDown, BiChevronLeft } from "react-icons/bi";
import { FaBath, FaSpotify } from "react-icons/fa";
import { FiHeart, FiMapPin, FiShare2, FiUser } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { GiRoundStar } from "react-icons/gi";
import { IoIosBed } from "react-icons/io";
import { MdSupervisorAccount } from "react-icons/md";
import { fetchproperties } from "../../utils/api/property/getProperties";
import Header from "../../components/misc/header";
import Footer from "../../components/misc/footer";
import RoomCard from "../../components/RoomCard";
import { GlobalContext } from "../../context/GlobalState";



import roomImage from "/public/images/room_image.png";
import { fetchproperty } from "../../utils/api/property/getProperty";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns'
import format from 'date-fns/format'
import { useRef } from 'react';

const Property = () => {
  const [hasBeenLiked, setHasBeenLiked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }
  
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }

const [open, setOpen] = useState(false)

//get the target element to toggle
const refOne = useRef(null)

useEffect(() => {
  document.addEventListener("click", hideOnClickOutside, true)
}, [])

//Hide on outside click
const hideOnClickOutside = (e) => {
    if(refOne.current && ! refOne.current.contains(e.target)){
        setOpen(false)
    }
}
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

  if (property) {
    const propertySplit = property.propertyImages.split(",")
    console.log(propertySplit[0])
    console.log(propertySplit[1])
    console.log(propertySplit[2])
    console.log(propertySplit[3])
    console.log(propertySplit[4])
    // const propertyBedroomSplit = property.propertyBedroomDescription.split(",")
    // const propertyGeneralSplit = property.propertyGeneral.split(",")
    // const propertyMandatorySplit = property.propertyMandatory.split(",")
    // const propertyOptionalServices = property.propertyOptionalServices.split(",")
    // console.log(propertyOptionalServices)
    
    const {
      addMovieToWatchlist,
      watchlist
    } = useContext(GlobalContext)

    let storedMovie = watchlist.find(o => o.propertyId === property.propertyId)

    const watchlistDisabled = storedMovie ? true : false;
    return (
      <div className="font-sora">
        <Header />
        <section className="mx-auto  mt-8 mb-14 max-w-[90rem] px-20 py-7">
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
              <button className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg">
                <FiShare2 className="w-3 h-3 text-gray-900" />
                <h1 className="text-sm font-normal">Share</h1>
              </button>
              <button
                onClick={() => setHasBeenLiked(!hasBeenLiked)}
                className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg"
              >
                {hasBeenLiked ? (
                  <FcLike className="w-3 h-3 text-gray-900" />
                ) : (
                  <FiHeart className="w-3 h-3 text-gray-900" />
                )}
                <h1 className="text-sm font-normal">Like</h1>
              </button>
            </div>
          </div>

          <div className="mt-9">
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
                  src={propertySplit[0]}
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
                      src={propertySplit[1]}
                      alt="room image"
                      className="absolute w-full h-full"
                      layout="fill"
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8 ">
                    <Image
                      src={propertySplit[2]}
                      alt="room image"
                      className="absolute h-full w-full rounded-tr-[10px]"
                      layout="fill"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="relative h-[15.688rem] w-fourty8">
                    <Image
                      src={propertySplit[3]}
                      alt="room image"
                      className="absolute w-full h-full"
                      layout="fill"
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8">
                    <Image
                      src={propertySplit[4]}
                      alt="room image"
                      className="absolute h-full w-full rounded-br-[10px]"
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property info and booking details */}
          <div className="mt-8">
            <div className="flex items-start justify-between w-full mt-4">
              <div className="w-2/3 ">
                {/* First Div containing room info */}
                
                <div>
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Property Description
                  </h1>
                  {/* {[property].map((properties) => {
                    const propertyBedroomSplit = property.propertyBedroomDescription.split(",")
                    // console.log(propertyBedroomSplit)
                  return (
                    <h1>{properties.propertyBedroomSplit}</h1>
                  )
                })} */}
                  <p className="text-sm font-normal leading-6 text-gray-600 ">
                    This apartment is beautifully furnished style apartment in
                    the heart of the Lekki phase 1 . It is in close proximity to
                    the entertainment and business districts of Victoria Island
                    and Ikoyi alike. it is located in a serene gated estate
                    which assures you of safety at all times. Modern
                    conveniences include 24/7 hours electricity supported by
                    generator, fitted kitchen, WIFI, Smart TVs amongst others.
                    Everything you need for a great stay can be found at this
                    location.
                  </p>
                  <p className="mt-8 text-sm font-normal leading-6 text-gray-600">
                    This apartment is beautifully furnished style apartment in
                    the heart of the Lekki phase 1 . It is in close proximity to
                    the entertainment and business districts of Victoria Island
                    and Ikoyi alike. it is located in a serene gated estate
                    which assures you of safety at all times. Modern
                    conveniences include 24/7 hours electricity supported by
                    generator, fitted kitchen, WIFI, Smart TVs amongst others.
                    Everything you need for a great stay can be found at this
                    location.
                  </p>
                </div>

                <div className="mt-8">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Amenities
                  </h1>
                  <div className="flex gap-5 text-sm font-normal text-secondary">
                    <div className="flex w-[6.875rem] flex-col space-y-3 rounded-lg border border-gray-200 p-3">
                      <MdSupervisorAccount className="w-4 h-4 text-primary" />
                      <h1>{property.propertyGuestNumber} guests</h1>
                    </div>

                    <div className="flex w-[6.875rem] flex-col space-y-3 rounded-lg border border-gray-200 p-3">
                      <IoIosBed className="w-4 h-4 text-primary" />
                      <h1>{property.propertyBedroomNumber} bedroom</h1>
                    </div>

                    <div className="flex w-[6.875rem] flex-col space-y-3 rounded-lg border border-gray-200 p-3">
                      <FaBath className="w-4 h-4 text-primary" />
                      <h1>{property.propertyBathroomNumber} bathroom</h1>
                    </div>

                    <div className="flex w-[6.875rem] flex-col space-y-3 rounded-lg border border-gray-200 p-3">
                      <FaSpotify className="w-4 h-4 text-primary" />
                      <h1>{property.propertyGuestNumber} guests</h1>
                    </div>

                    <div className="flex w-[6.875rem] flex-col items-center justify-center space-y-3 rounded-lg border border-gray-200 p-3">
                      <h1>View All</h1>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Bedroom
                  </h1>
                  <div className="flex gap-5 text-sm font-normal text-secondary">
                  {property.propertyBedroomDescription.split(",").map((item) => {
                    return (
                      
                        <div className=" p-2 bg-gray-200 rounded">
                          {item}
                        </div>
                        
                      
                    )
                  })}
                  </div>
                </div>

                <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    General
                  </h1>
                  <div className="flex gap-5 text-sm font-normal text-secondary">
                  {property.propertyGeneral.split(",").map((item) => {
                    return (
                      
                      <div className="p-2 bg-gray-200 rounded">{item}</div>
                        
                      
                    )
                  })}
                  </div>
                </div>

                <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Mandatory or included services
                  </h1>
                  <div className="flex gap-5 text-sm font-normal text-secondary">
                  {property.propertyMandatory.split(",").map((item) => {
                    return (
                      
                      <div className="p-2 bg-gray-200 rounded">{item}</div>
                        
                      
                    )
                  })}
                    {/* <div className="p-2 bg-gray-200 rounded">{propertyMandatorySplit[0]}</div> */}
                    {/* <div className="p-2 bg-gray-200 rounded">
                      Internet Access: Included
                    </div>
                    <div className="p-2 bg-gray-200 rounded">
                      Security deposit (Refundable): NGN50,000.00 /booking
                    </div> */}
                  </div>
                </div>

                <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Optional services
                  </h1>
                  <div className="flex gap-5 text-sm font-normal text-secondary">
                  {property.propertyOptionalServices.split(",").map((item) => {
                    return (
                      
                      <div className="p-2 bg-gray-200 rounded">{item}</div>
                        
                      
                    )
                  })}
                    {/* <div className="p-2 bg-gray-200 rounded">
                      Video shoot: NGN50,000.00 /booking
                    </div> */}
                  </div>
                </div>

                <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Check-in schedule/Check-out schedule
                  </h1>
                  <div className="flex gap-5 text-sm font-normal text-secondary">
                    {property.propertySchedule.split(",").map((item) => {
                      return (
                      
                        <div className="p-2 bg-gray-200 rounded">{item}</div>
                        
                      
                      )
                    })}
                    
                  </div>
                </div>

                <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Security Deposit
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    <div className="flex gap-6">
                      <div className="w-[7.813rem] text-sm font-normal text-secondary">
                        <h1>Amount:</h1>
                      </div>
                      <div className="text-sm font-bold text-secondary">
                        <h1>{property.propertySecurityDeposit} /booking</h1>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="w-[7.813rem] text-sm font-normal text-secondary">
                        <h1>Payment Method:</h1>
                      </div>
                      <div className="text-sm font-bold text-secondary">
                        <h1>Bank transfer</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Booking Conditions
                  </h1>
                  <p className="text-sm font-normal text-secondary">
                    {property.propertyBookingCondition}
                  </p>
                </div>

                <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Additional notes
                  </h1>
                  <div className="flex flex-col gap-2 text-sm font-normal text-secondary">
                  {property.propertyAdditionalNotes.split(",").map((item) => {
                      return (
                      
                        <p>{`- ${item}`}</p>
                        
                      
                      )
                    })}


                    {/* <p>
                      - Refund of security deposit to the credit card 24/48h
                      after your departure
                    </p>
                    <p>- Check-out schedule: Before 12:00</p> */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-1/3">
                {/* Card-booking */}
                <div className="self-end p-6 border border-gray-200 rounded-lg w-ninety">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center space-x-1 text-[#031C43]">
                      <h1 className="text-2xl font-medium ">{property.propertyRentalPrice}</h1>
                      <h1 className="text-sm font-normal">/night</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GiRoundStar className="w-4 h-4 text-primary" />
                      <h1 className="text-sm font-medium text-secondary">
                        4.8{" "}
                      </h1>
                      <div className="w-1 h-1 rounded-full bg-secondary"></div>
                      <h1 className="text-sm font-medium text-secondary text-opacity-60">
                        34 reviews
                      </h1>
                    </div>
                  </div>

                  <div className='mt-6 text-sm font-normal text-secondary text-opacity-40'>
                  <div className='flex items-center justify-between inline-block relative'>
                    <div className='flex w-[9.184rem] items-center justify-between rounded-lg border border-gray-200 py-3 px-4'>
                      <input 
                        value={ `${format(new Date(startDate), "MM/dd/yyyy")}` }
                        placeholder='Check-in'
                        className='w-full outline-none' 
                        onClick={() => setOpen(open => !open)}
                        />
                      <BiChevronDown className='w-4 h-5 text-black' />
                    </div>
                    <div className='flex w-[9.184rem] items-center justify-between rounded-lg border border-gray-200 py-3 px-4'>
                    <input 
                        value={ `${format(new Date(endDate), "MM/dd/yyyy")}` }
                        placeholder='Check-out'
                        className='w-full outline-none'
                        onClick={() => setOpen(open => !open)}
                        />
                      <BiChevronDown className='w-4 h-5 text-black' />
                    </div>
                    <div ref={refOne}>
                      {open && 
                          <DateRange 
                              editableDateInputs={true}
                              // onChange={item => setRange([item.selection])}
                              onChange={handleSelect}
                              moveRangeOnFirstSelection={false}
                              minDate={new Date()}
                              ranges={[selectionRange]}
                              rangeColors={["#DB5461"]}
                              months={2}
                              direction="horizontal"
                              className="absolute left-1/2 -translate-x-2/4 top-10 border z-30  "
                          />
                      }
                    </div>
                  </div>
                  <div className='flex items-center justify-between px-4 py-3 mt-4 border border-gray-200 rounded-lg'>
                    <input
                      placeholder='Guests'
                      className='outline-none'
                      value={noOfGuests}
                      onChange={(e) => setNoOfGuests(e.target.value)}
                      type="number"
                    />
                    <BiChevronDown className='w-4 h-5 text-black' />
                  </div>
                </div>

                  {/* <button
                    className="mt-7 h-[2.875rem] w-full rounded-[10px] bg-primary text-sm font-medium text-white"
                    onClick={() => router.push({
                      pathname: "/book-property",
                      query: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString(),
                      },
                    })}
                  >
                    Book Now
                  </button> */}

                  <button
                    className="mt-7 h-[2.875rem] w-full rounded-[10px] bg-primary text-sm font-medium text-white"
                    // disabled={watchlistDisabled}
                    onClick={() => {addMovieToWatchlist(property); watchlistDisabled; router.push({
                      pathname: "/book-property",
                      query: {
                        startDate: startDate.toLocaleDateString(),
                        endDate: endDate.toLocaleDateString(),
                        noOfGuests,
                      },
                    })}}
                  >
                    Book Now
                  </button>
                  

                  <div className="flex flex-col mt-6 text-sm font-normal gap-y-3 text-secondary">
                    <div className="flex items-center justify-between">
                      <h1>₦50,000 x 5 night</h1>
                      <h1>₦250,000</h1>
                    </div>

                    <div className="flex items-center justify-between">
                      <h1>Cleaning fee</h1>
                      <h1>₦250,000</h1>
                    </div>

                    <div className="flex items-center justify-between">
                      <h1>Service fee</h1>
                      <h1>₦250,000</h1>
                    </div>
                  </div>

                  <div className="my-4 border-t border-t-gray-200"></div>

                  <div className="flex items-center justify-between text-sm font-bold text-secondary">
                    <h1>Total</h1>
                    <h1>₦250,000</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Lastest Properties */}
          <div className="mt-12">
            <h1 className="mb-4 text-lg font-bold text-gray-800">
              Latest Property Listings
            </h1>

            <div className="flex flex-wrap items-center justify-between w-full gap-y-4">
              <RoomCard />

              <RoomCard />

              <RoomCard />

              <RoomCard />

              <RoomCard />
            </div>
          </div>
        </section>
        <Footer />
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
};

export default Property;

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

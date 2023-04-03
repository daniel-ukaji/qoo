import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { BiChevronDown, BiChevronLeft } from "react-icons/bi";
import { FaBath, FaSpotify } from "react-icons/fa";
import { FiHeart, FiMapPin, FiShare2, FiUser } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { GiNuclearWaste, GiRoundStar, GiUmbrella } from "react-icons/gi";
import { IoIosBed } from "react-icons/io";
import { MdOutlineWaterDrop, MdSupervisorAccount } from "react-icons/md";
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
import { useAuth } from "../../utils/hooks/useAuth";
import Load from "../../components/Load";
import { AuthLevelContext } from "../../utils/context/AuthLevelContext";
import Link from "next/link";
import { AiFillCheckCircle, AiOutlineMail, AiOutlinePhone, AiOutlineWhatsApp } from "react-icons/ai";
import { IoBulbOutline } from 'react-icons/io5'
import { HiOutlineSparkles } from 'react-icons/hi'
import { BsHeadset, BsHouseDoor } from "react-icons/bs";
import { RiGasStationFill } from "react-icons/ri";
import { SlScreenDesktop } from 'react-icons/sl'
import ModalComponent from "../../components/ModalComponent";
import { GoSettings } from "react-icons/go";
import FilterComponent from "../../components/FilterComponent";
import AmenitiesComponent from "../../components/AmenitiesComponent";

const Property = () => {

  const [hasBeenLiked, setHasBeenLiked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [modalActive, setModalActive] = useState(false);

  const authLevel = useContext(AuthLevelContext);

  const handleGuestClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleIncrement = () => {
    setNumGuests(numGuests + 1);
  };

  const handleDecrement = () => {
    setNumGuests(numGuests > 1 ? numGuests - 1 : 1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  


  const guests = ["1", "2", "3", "4", "5"];

  const [selectedGuests, setSelectedGuests] = useState(guests[0]);

  const handleSelectChange = (event) => {
    setSelectedGuests(event.target.value);
  };

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

  


  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
    setSelectedDateRange(ranges.selection);
  }

  useEffect(() => {
    window.onbeforeunload = function() {
      // Reload the page when the user navigates away from it
      window.location.reload();
    };
  }, []);
  
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }

  

  const formattedStartDate = new Date(startDate).getTime()
  const formattedEndDate = new Date(endDate).getTime()
  const dateRange = formattedEndDate - formattedStartDate
  const finalDate = dateRange / (1000 * 3600 * 24);

  const date = new Date()
  console.log("Daniel:", startDate)

  // const [totalPrice, setTotalPrice] = useState(property.propertyBookingPrice * finalDate);

  const handleSubmit = () => {
    // Submit the data to the backend
    // const checkInDate = startDate.toISOString()
    // const checkOutDate = endDate.toISOString()

    // // Update the disabled dates state
    // setSelectedDateRange({checkInDate, checkOutDate});
  

    router.push({
      pathname: "/book-property",
      query: { 
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        selectedDateRange: JSON.stringify(selectedDateRange),
        numGuests, 
      },
    });

    // Reset the selected dates to default
    setStartDate(null);
    setEndDate(null);
  };

  // console.log(startDate.toISOString().split('T')[0])

  const user = useAuth();

  console.log(user.logIn)

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
  

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
  });

  const message = 'Hello, how are you?';
  const encodedMessage = encodeURIComponent(message);

  // const totalPriceRef = useRef(property.propertyBookingPrice * finalDate);



  if (property) {
    //const propertySplit = property.propertyImages.split(",")

    console.log(property.propertyImages[0].propertyImageUrl)
    console.log(property)

    console.log(property.propertyBedroomNumber)

    const totalPrice = property.propertyBookingPrice * finalDate
    const finalPrice = totalPrice + (totalPrice * 7 / 100)
  // const [totalPrice, setTotalPrice] = useState(property.propertyBookingPrice * finalDate);

//   const checkInDate = new Date(property.propertyBookedDates[8].checkInDate);
//   const checkOutDate = new Date(property.propertyBookedDates[8].checkOutDate);
//   const rangeOfDates = [];

//   console.log(checkInDate)

//   let currentDate = checkInDate;
// while (currentDate <= checkOutDate) {
//   rangeOfDates.push(new Date(currentDate));
//   currentDate.setDate(currentDate.getDate() + 1);
// }

// const formattedDates = rangeOfDates.map(date => {
//   const isoString = date.toISOString();
//   const formattedString = isoString.replace("T", " ").replace("Z", "");
//   return formattedString;
// });

// console.log(formattedDates[0])

// console.log(date)

// console.log(rangeOfDates)

// console.log(property.propertyBookedDates.checkInDate)

// console.log(property.propertyBookedDates)

const propertyBookedDates = property.propertyBookedDates;

const allDates = [];

propertyBookedDates.forEach(({ checkInDate, checkOutDate }) => {
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  while (startDate <= endDate) {
    allDates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
});

const formattedDates = allDates.map(date => {
  const isoString = date.toISOString();
  const formattedString = isoString.replace("T", " ").replace("Z", "");
  return formattedString;
});

console.log(formattedDates);

  // console.log(property.propertyBookedDates)
  // console.log(property.propertyBookedDates[8].checkInDate)
  // console.log(property.propertyBookedDates[8].checkOutDate)

    
  // const checkInDate = new Date(property.propertyBookedDates[8].checkInDate);
  // const checkOutDate = new Date(property.propertyBookedDates[8].checkOutDate);
  // const rangeOfDates = [];
  
  // let currentDate = checkInDate;
  // while (currentDate <= checkOutDate) {
  //   rangeOfDates.push(new Date(currentDate));
  //   currentDate.setDate(currentDate.getDate() + 1);
  // }
  
  // const disabledDates = rangeOfDates.map(date => {
  //   const year = date.getFullYear();
  //   const month = date.getMonth();
  //   const day = date.getDate();
  //   return new Date(year, month, day);
  // });
  
  // const isDateDisabled = (date) => {
  //   // check if the date is in the disabledDates array
  //   return disabledDates.some(disabledDate => {
  //     return date.getTime() === disabledDate.getTime();
  //   });
  // };

  // const formattedDisabledDates = disabledDates.map(date => {
  //   const isoString = date.toISOString();
  //   const formattedString = isoString.substring(0, 10);
  //   return formattedString;
  // });

  // console.log(formattedDisabledDates)

// console.log(formattedDates);

// const isDateDisabled = (date) => {
//   // check if the date is in the disabledDates array
//   return formattedDates.some(formattedDates => {
//     return date.getTime() === formattedDates.getTime();
//   });
// };


// console.log(rangeOfDates);

    

    
    
    const {
      addToBooking,
      booking
    } = useContext(GlobalContext)

    let storedBooking = booking.find(o => o.propertyId === property.propertyId)

    const bookingDisabled = storedBooking ? true : false;
    return (
      <div className="font-sora">
        <Header />
        <section className="mx-auto mb-14 max-w-[90rem] px-10">
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

          <div>
            {property.propertyImages.propertyImageUrl}
          </div>


          <div className="flex justify-between mt-2">
            <div className="flex self-end space-x-2">
              <div className="flex items-center space-x-1">
                <FiMapPin className="w-4 h-4 text-primary" />
                <h1 className="text-sm font-normal text-secondary">
                  {property.propertyStreet}
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
                  src={property.propertyImages[0].propertyImageUrl}
                  alt="room image"
                  className="absolute h-full w-full rounded-tl-[10px] rounded-bl-[10px]"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {/* Sub images */}
              <div className="flex flex-col justify-between w-1/2 h-full ml-6">
                <div className="flex justify-between">
                  <div className="relative h-[15.688rem] w-fourty8 ">
                    <Image
                      src={property.propertyImages[0].propertyImageUrl}
                      alt="room image"
                      className="absolute w-full h-full"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8 ">
                    <Image
                      src={property.propertyImages[0].propertyImageUrl}
                      alt="room image"
                      className="absolute h-full w-full rounded-tr-[10px]"
                      layout="fill"
                      objectFit="cover"
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
                      objectFit="cover"
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8">
                    <Image
                      src={property.propertyImages[0].propertyImageUrl}
                      alt="room image"
                      className="absolute h-full w-full rounded-br-[10px]"
                      layout="fill"
                      objectFit="cover"
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
                    {property.propertyDescription}
                    {/* This apartment is beautifully furnished style apartment in
                    the heart of the Lekki phase 1 . It is in close proximity to
                    the entertainment and business districts of Victoria Island
                    and Ikoyi alike. it is located in a serene gated estate
                    which assures you of safety at all times. Modern
                    conveniences include 24/7 hours electricity supported by
                    generator, fitted kitchen, WIFI, Smart TVs amongst others.
                    Everything you need for a great stay can be found at this
                    location. */}
                  </p>
                  {/* <p className="mt-8 text-sm font-normal leading-6 text-gray-600">
                    This apartment is beautifully furnished style apartment in
                    the heart of the Lekki phase 1 . It is in close proximity to
                    the entertainment and business districts of Victoria Island
                    and Ikoyi alike. it is located in a serene gated estate
                    which assures you of safety at all times. Modern
                    conveniences include 24/7 hours electricity supported by
                    generator, fitted kitchen, WIFI, Smart TVs amongst others.
                    Everything you need for a great stay can be found at this
                    location.
                  </p> */}
                </div>

                <div className="mt-8 mr-5">
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

                <div className="mt-12 border-b">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    All bills inclusive
                  </h1>
                  <section className="flex flex-col space-y-20">
                    <div className="flex space-x-28">
                      <div className="flex flex-col justify-center items-center space-y-2"><IoBulbOutline className="w-10 h-10 text-primary" /> <h1>Power Supply</h1></div>
                      <div className="flex flex-col justify-center items-center space-y-2"><HiOutlineSparkles className="w-10 h-10 text-primary" /> <h1>Cleaning Services</h1></div>
                      <div className="flex flex-col justify-center items-center space-y-2"><MdOutlineWaterDrop className="w-10 h-10 text-primary" /> <h1>Water Supply</h1></div>
                    </div>

                    <div className="flex space-x-28">
                      <div className="flex flex-col justify-center items-center space-y-2"><BsHeadset className="w-10 h-10 text-primary" /> <h1>24-hours Support</h1></div>
                      <div className="flex flex-col justify-center items-center space-y-2"><RiGasStationFill className="w-10 h-10 text-primary" /><h1>Gas Supply</h1></div>
                      <div className="flex flex-col justify-center items-center space-y-2"><GiNuclearWaste className="w-10 h-10 text-primary" /> <h1>Waste management</h1></div>
                    </div>

                    <div className="flex space-x-28">
                      <div className="flex flex-col justify-center items-center space-y-2"><BsHouseDoor className="w-10 h-10 text-primary" /> <h1>Estate dues</h1></div>
                      <div className="flex flex-col justify-center items-center space-y-2"><GiUmbrella className="w-10 h-10 ml-10 text-primary" /> <h1 className="ml-10">Amenities</h1></div>
                    </div>

                  </section>
                  
                </div>

                <div className="mt-12 border-b">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Amenities
                  </h1>
                  <section className="flex flex-col space-y-10">
                    {/* {property.propertyServices} */}
                    <div className="grid grid-cols-2 gap-4">
                    {property.propertyServices?.split(",").map((item) => { 
                     return (
                      
                      <div className="flex space-x-3 py-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>{item}</h1></div> 
                        
                      
                     ) 
                   })} 
                    </div>

                    {/* <div className="grid grid-cols-2 gap-4">
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /> <h1>Netflix</h1></div>
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>Chandalier</h1></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>Television</h1></div>
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>Cable</h1></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>WiFi</h1></div>
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>Chair</h1></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>TV</h1></div>
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>AC</h1></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>Oven</h1></div>
                      <div className="flex space-x-3"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>Heat Extractor</h1></div>
                    </div> */}

                    <button onClick={() => {
                        setModalActive(true);
                        addToBooking(property);
                      }} className="text-primary flex items-start underline">See all</button>

                  </section>
                </div>

                <div className="mt-12 border-b">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Booking Conditions
                  </h1>
                  <section className="flex flex-col space-y-10">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1>No smoking</h1></div>
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1>No parties or events</h1></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1>Private/residential use only</h1></div>
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1>No Inflammables</h1></div>
                    </div>
                  </section>
                </div>

                <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Bedroom
                  </h1>
                  <div className="flex gap-5 text-sm font-normal text-secondary">
                  {property.propertyBedroomDescription?.split(",").map((item) => { 
                     return (
                      
                        <div className=" p-2 bg-gray-200 rounded">
                          {item}
                        </div> 
                        
                      
                     ) 
                   })} 
                  </div>
                </div>

                {/* <div className="mt-12">
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
                </div> */}

                {/* <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Mandatory or included services
                  </h1>
                  <div className="flex gap-5 text-sm font-normal text-secondary">
                  {property.propertyMandatory.split(",").map((item) => {
                    return (
                      
                      <div className="p-2 bg-gray-200 rounded">{item}</div>
                        
                      
                    )
                  })}
                    
                  </div>
                </div> */}

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

                {/* <div className="mt-12">
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
                </div> */}

                {/* <div className="mt-12">
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
                </div> */}

                {/* <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Booking Conditions
                  </h1>
                  <p className="text-sm font-normal text-secondary">
                    {property.propertyBookingCondition}
                  </p>
                </div> */}

                {/* <div className="mt-12">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Additional notes
                  </h1>
                  <div className="flex flex-col gap-2 text-sm font-normal text-secondary">
                  {property.propertyAdditionalNotes.split(",").map((item) => {
                      return (
                      
                        <p>{`- ${item}`}</p>
                        
                      
                      )
                    })}


                    
                  </div>
                </div> */}
              </div>

              <div className="flex flex-col w-2/3">
                {/* Card-booking */}
                <div className="self-end p-6 border border-gray-200 rounded-lg w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center space-x-1 text-[#031C43]">
                      {/* <h1 className="text-2xl font-medium ">{property.propertyRentalPrice}</h1> */}
                      <h1 className="text-sm font-normal">₦ {formatter.format(property.propertyBookingPrice)} / night</h1>
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
                  <div className='flex items-center justify-between relative'>
                    <div >
                      <p className="font-bold text-black mb-1">Check In</p>
                      <div className='flex w-[8.184rem] items-center justify-between rounded-lg border border-gray-200 py-3 px-4'>
                        <input 
                          value={ `${format(new Date(startDate), "MM/dd/yyyy")}` }
                          placeholder='Check-in'
                          className='w-full outline-none bg-transparent' 
                          onClick={() => setOpen(open => !open)}
                          />
                        <BiChevronDown className='w-4 h-5 text-black' />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-black mb-1">Check Out</p>
                      <div className='flex w-[8.184rem] items-center justify-between rounded-lg border border-gray-200 py-3 px-4'>
                        <input 
                            value={ `${format(new Date(endDate), "MM/dd/yyyy")}` }
                            placeholder='Check-out'
                            className='w-full outline-none bg-transparent'
                            onClick={() => setOpen(open => !open)}
                            />
                          <BiChevronDown className='w-4 h-5 text-black' />
                      </div>
                    </div>
                    <div ref={refOne}>
                      {open && 
                          <DateRange 
                              editableDateInputs={true}
                              // onChange={item => setRange([item.selection])}
                              onChange={handleSelect}
                              moveRangeOnFirstSelection={false}
                              disabledDates={allDates}
                              minDate={new Date()}
                              ranges={[selectionRange]}
                              rangeColors={["#DB5461"]}
                              months={2}
                              direction="horizontal"
                              className="absolute left-1/2 -translate-x-2/4 top-10 border z-30 bg-transparent  "
                          />
                      }
                    </div>
                  </div>
                  
                  <p className="mt-3 font-bold text-black mb-1">Number of Guests</p>
                  {/* <div className='flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg'>
                    <input
                      placeholder='Guests'
                      className='outline-none bg-transparent'
                      value={noOfGuests}
                      onChange={(e) => setNoOfGuests(e.target.value)}
                      type="number"
                    />
                    <BiChevronDown className='w-4 h-5 text-black' />
                  </div> */}

                  <div className="flex items-center justify-center border rounded-md">
      <div className="relative w-full" ref={dropdownRef}>
        <button
          className=" text-gray-700 font-semibold py-4 px-4 w-full rounded inline-flex items-center"
          onClick={handleGuestClick}
        >
          <span className="mr-1">{numGuests} Guests</span>
          <svg
            className={`fill-current ml-40 h-4 w-4 ${showDropdown ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M15 7l-5 5-5-5 1-1 4 4 4-4 1 1z" />
          </svg>
        </button>
        {showDropdown && (
          <div className="absolute z-10 mt-1 w-full rounded-md py-3 bg-white drop-shadow-md">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className='flex justify-between items-center'>
                <div>
                  <h1 className="font-bold text-black ml-2">Guest No.</h1>
                </div>
              <div className='flex space-x-5 justify-center items-center mr-2'>
                <button
                  className="block px-4 py-2 text-xl font-bold border rounded-full hover:border-black text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <span className="text-black">{numGuests}</span>
                <button
                  className="block px-4 py-2 text-xl font-bold text-gray-700 border hover:border-black rounded-full hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
                  
                </div>

                  <button
                    className="mt-7 h-[2.875rem] w-full rounded-[10px] bg-primary text-sm font-medium text-white"
                    onClick={() => {
                      if (!authLevel.user) {
                        authLevel.setModalVisible(true);
                        authLevel.setModalType("LOGIN");
                      } else {
                        addToBooking(property);
                        router.push({
                          pathname:"/book-property",
                          query: {
                            // propertyId: propertyId,
                            startDate: startDate.toISOString(),
                            endDate: endDate.toISOString(),
                            numGuests,
                          },
                        });
                      }
                    }}
                  >
                    {!authLevel.user ? "Sign in to Book" : "Book Now"}
                  </button>

                  

                  <div className="my-4 border-t border-t-gray-200">

                  <div className="">
                  {selectedDateRange ? (
                    <div className="flex flex-col mt-5 justify-between text-sm font-bold text-secondary space-y-3">
                      <div className="flex justify-between">
                          <h1>Price after tax</h1>
                          
                          <h1>₦ {formatter.format(finalPrice)}</h1>
                        </div>
                        <div className="flex justify-between">
                          <h1>₦ {property.propertyBookingPrice} × {finalDate} Nights</h1>
                      
                          {/* <h1>₦0 </h1> */}
                        </div>
                      </div>
                    ):(
                      null
                    )}
                  </div>
                  </div>
                  {/* <Load /> */}
                  <div className="flex border-t justify-between items-center mt-5">
                    <Link href="mailto:qoospayce@gmail.com"><div className="cursor-pointer flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlineMail className="text-2xl" /> <p className="text-xs">Contact</p></div></Link>
                    <Link href={`https://api.whatsapp.com/send?phone=+2349115015468&text=${encodedMessage}`}><div className="cursor-pointer flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlineWhatsApp className="text-2xl" /><p className="text-xs">WhatsApp</p></div></Link>
                    <div className="cursor-pointer flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlinePhone className="text-2xl" /> <p className="text-xs">+234-9122877657</p></div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          {/* Lastest Properties */}
          {/* <div className="mt-12">
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
          </div> */}
        </section>
        <Footer />
        <ModalComponent
        isVisible={modalActive}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => setModalActive(false)}
      >
        <AmenitiesComponent onClick={() => setModalActive(false)} />
      </ModalComponent>
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

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
import VerifyModal from "../../components/VerifyModal";
import axios from "axios";

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
  const [modeActive, setModeActive] = useState(false);

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

 

  // console.log(startDate.toISOString().split('T')[0])

  const user = useAuth();

  console.log(user.user)

  const userStat = user.user?.userStatus

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
    const {
      addToBooking,
      resetBooking,
      booking
    } = useContext(GlobalContext)

   

    let storedBooking = booking.find(o => o.propertyId === property.propertyId)

    const bookingDisabled = storedBooking ? true : false;

    return (
      <div className="font-sora">
        <div className="sticky top-0 z-50 h-[6rem] w-full">
        <Header />
        </div>
        <section className="md:mx-auto mb-14 md:max-w-full md:px-10">
          

          <div className="mt-7">
            <h1 className="text-2xl font-bold text-gray-800">
              {property.propertyName}
            </h1>
          </div>

          <div>
            {property.propertyImages.propertyImageUrl}
          </div>


          <div className="flex flex-col xl:space-y-0 space-y-3 xl:flex-row xl:justify-between mt-2">
            <div className="flex flex-col xl:flex-row space-y-3 xl:self-end xl:space-x-2">
              <div className="flex items-center space-x-1">
                <FiMapPin className="hidden xl:block w-4 h-4 text-primary" />
                <h1 className="text-sm font-normal text-secondary">
                  {property.propertyStreet}
                </h1>
              </div>
              <div className="flex items-center space-x-1">
                <FiUser className="hidden xl:block w-4 h-4 text-primary" />
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
              <div className="relative w-full md:w-1/2 h-full">
                <Image
                  src={property.propertyImages[0].propertyImageUrl}
                  alt="room image"
                  className="absolute h-full w-full rounded-tl-[10px] rounded-bl-[10px]"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {/* Sub images */}
              <div className="flex hidden md:flex flex-col justify-between w-1/2 h-full ml-6">
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
            <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full mt-4">
              <div className="w-full md:w-2/3 ">
                {/* First Div containing room info */}
                
                <div>
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Property Description
                  </h1>
                  
                  <p className="text-sm font-normal leading-6 text-gray-600 ">
                    {property.propertyDescription}
                  </p>
                  
                </div>

                <div className="mt-8 mr-5">
                  <h1 className="mb-4 text-lg font-bold text-gray-800">
                    Property Details
                  </h1>
                  <div className="flex flex-wrap xl:flex-nowrap justify-between gap-5 text-sm font-normal text-secondary">
                    <div className="flex w-[6.875rem] flex-col space-y-3 rounded-lg border-gray-200 p-3">
                      <MdSupervisorAccount className="w-4 h-4 text-primary" />
                      <h1>{property.propertyGuestNumber} guests</h1>
                    </div>

                    <div className="flex w-[6.875rem] flex-col space-y-3 rounded-lg border-gray-200 p-3">
                      <IoIosBed className="w-4 h-4 text-primary" />
                      <h1>{property.propertyBedroomNumber} bedroom</h1>
                    </div>

                    <div className="flex w-[6.875rem] flex-col space-y-3 rounded-lg border-gray-200 p-3">
                      <FaBath className="w-4 h-4 text-primary" />
                      <h1>{property.propertyBathroomNumber} bathroom</h1>
                    </div>

                    <div className="flex w-[6.875rem] flex-col space-y-3 rounded-lg border-gray-200 p-3">
                      <FaSpotify className="w-4 h-4 text-primary" />
                      <h1>{property.propertyGuestNumber} guests</h1>
                    </div>

                    <div className="flex hidden xl:flex w-[6.875rem] flex-col items-center justify-center space-y-3 rounded-lg border-gray-200 p-3">
                      {/* <h1>View All</h1> */}
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-b pb-7">
                  <h1 className="text-lg font-bold text-gray-800">
                    All bills inclusive
                  </h1>
                  <div className="grid xl:grid-cols-2 gap-4 xl:gap-2 mt-3">
                        <div className="flex items-center space-x-4  max-w-[80%]"><IoBulbOutline className="w-5 h-5 text-primary" /> <h1 className="text-sm">Power Supply</h1></div>
                        <div className="flex items-center space-x-4  max-w-[80%]"><HiOutlineSparkles className="w-5 h-5 text-primary" /> <h1 className="text-sm">Cleaning</h1></div>
                        <div className="flex items-center space-x-4  max-w-[80%]"><MdOutlineWaterDrop className="w-5 h-5 text-primary" /> <h1 className="text-sm">Water Supply</h1></div>

                        <div className="flex items-center space-x-4  max-w-[80%]"><BsHeadset className="w-5 h-5 text-primary" /> <h1 className="text-sm">24-hours Support</h1></div>
                        <div className="flex items-center space-x-4  max-w-[80%]"><RiGasStationFill className="w-5 h-5 text-primary" /><h1 className="text-sm">Gas Supply</h1></div>
                        <div className="flex items-center space-x-4  max-w-[80%]"><GiNuclearWaste className="w-5 h-5 text-primary" /> <h1 className="text-sm">Waste management</h1></div>

                        <div className="flex items-center space-x-4  max-w-[80%]"><BsHouseDoor className="w-5 h-5 text-primary" /> <h1 className="text-sm">Estate dues</h1></div>
                        <div className="flex items-center space-x-4  max-w-[80%]"><GiUmbrella className="w-5 h-5 text-primary" /> <h1 className="text-sm">Amenities</h1></div>
                  </div>
                    {/*  */}
                  
                </div>

                <div className="mt-5 pb-7 border-b max-w-2xl">
                  <h1 className="text-lg  mb-4 font-bold text-gray-800">
                    Amenities
                  </h1>
                    {/* {property.propertyServices} */}
                    <div className="grid xl:grid-cols-2 gap-3">
                    {property.propertyServices?.split(",").map((item) => { 
                     return (
                      
                      <div className="flex items-center space-x-4 max-w-[80%]"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1 className="text-sm">{item}</h1></div> 
                        
                      
                     ) 
                   })} 
                    </div>

                    <button onClick={() => {
                        setModalActive(true);
                        addToBooking(property);
                      }} className="text-primary mt-5 flex items-start underline">See all</button>

                  </div>

                  <div className="mt-5 border-b pb-5">
                  
                  <div className="flex flex-col space-y-6">
                  <h1 className="text-lg font-bold text-gray-800">
                    Booking Conditions
                  </h1>
                    <div className="grid xl:grid-cols-2 gap-3">
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">No smoking</h1></div>
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">No parties or events</h1></div>
                    </div>

                    <div className="grid xl:grid-cols-2 gap-3">
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">Private/residential use only</h1></div>
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">No Inflammables</h1></div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-b pb-5">
                  
                  <div className="flex flex-col space-y-6">
                    <h1 className="text-lg font-bold text-gray-800">
                      Mandatory or Included Services
                    </h1>
                    <div className="grid xl:grid-cols-2 gap-3">
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">Final cleaning: Included</h1></div>
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">Internet access: Included</h1></div>
                    </div>

                    <div className="grid">
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">Security deposit (Refundable): NGN50,000.00 /booking</h1></div>
                      {/* <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1>No Inflammables</h1></div> */}
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-b pb-5">
                  
                  <div className="flex flex-col space-y-6">
                    <h1 className="text-lg font-bold text-gray-800">
                      Optional Services
                    </h1>
                    <div className="grid xl:grid-cols-2 gap-3">
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">Video shoot: NGN100,000.00 /booking</h1></div>
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">Open-air parking: Included</h1></div>
                    </div>

                    <div className="grid gap-3">
                      <div className="flex space-x-3 items-center"><AiFillCheckCircle className="w-5 h-5 text-primary" /><h1 className="text-sm">Early check in/Late check Out: NGN10,000.00 /booking</h1></div>
                    </div>
                  </div>
                </div>

              </div>

              
            </div>
          </div>
          
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

      <ModalComponent
        isVisible={modeActive}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => setModeActive(false)}
      >
        <VerifyModal onClick={() => setModeActive(false)} />
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

import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { BiChevronDown, BiChevronLeft } from "react-icons/bi";
import { FaBath, FaSpotify } from "react-icons/fa";
import { FiHeart, FiMapPin, FiShare2, FiUser } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { GiNuclearWaste, GiRoundStar, GiUmbrella } from "react-icons/gi";
import { IoIosBed } from "react-icons/io";
import { MdClose, MdOutlineWaterDrop, MdSupervisorAccount } from "react-icons/md";
import { fetchproperties } from "../../utils/api/property/getProperties";
import Header from "../../components/misc/header";
import Footer from "../../components/misc/footer";
import RoomCard from "../../components/RoomCard";
import { GlobalContext } from "../../context/GlobalState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
import Head from "next/head";
import ShareComponent from "../../components/ShareComponent";
import ImageGalleryComponent from "../../components/ImageGalleryComponent";
import { useApi } from "../../utils/hooks/useApi";
import { scheduleBooking } from "../../utils/api/booking/scheduleBooking";
import { toast } from "react-toastify";
import NavHeader from "../../components/misc/NavHeader";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { TbGridDots } from "react-icons/tb";

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
  const [modActive, setModActive] = useState(false);
  const [moActive, setMoActive] = useState(false);
  const [isSingleDate, setIsSingleDate] = useState(false);
  const [dateRangeSelected, setDateRangeSelected] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [bookingDate, setbookingDate] = useState("");
  



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

  

  const [errorMessage, setErrorMessage] = useState('');

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
    setSelectedDateRange(ranges.selection);
    setIsSingleDate(ranges.selection.startDate.getTime() === ranges.selection.endDate.getTime());
    setDateRangeSelected(true);

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

    // get the user's time zone offset in minutes
const timezoneOffset = new Date().getTimezoneOffset();

// adjust the start and end dates to the user's time zone
const startDateAdjusted = new Date(startDate.getTime() - timezoneOffset * 60000);
const endDateAdjusted = new Date(endDate.getTime() - timezoneOffset * 60000);
  

    router.push({
      pathname: "/book-property",
      query: { 
        startDate: startDateAdjusted.toISOString(),
        endDate: endDateAdjusted.toISOString(),
        numGuests, 
      },
    });
  };

  // console.log(startDate.toISOString().split('T')[0])

  const user = useAuth();
  const userId = user.user?.userId;
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

  
 const createSchedule = useApi(scheduleBooking);

  if (property) {
    const [selectedImage, setSelectedImage] = useState(property.propertyImages[0].propertyImageUrl);
  
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
    //const propertySplit = property.propertyImages.split(",")
    const propId = property.propertyId;
    const guestNumber = 1;

    const onSubmit = async () => {
    
      let req = {
          bookingRenterUserId: userId,
          bookingRenterFirstName: firstName,
          bookingRenterLastName: lastName,
          bookingRenterAddress: address,
          bookingRenterCity: "city",
          bookingRenterPhoneNumber: phoneNumber,
          bookingRenterEmail: email,
          bookingRenterComment: "comments",
          bookingPropertyId: propId,
          // bookingPaymentId: null,
          // bookingCheckInDate: startDate,
          bookingAmount: "10000",
          bookingInspectionDate: bookingDate,
          bookingAmount: "finalPrice",
          bookingOptionalService: "propertyOptionalServices",
          bookingGuestNumber: "guestNumber",
          bookingGuestTypes: "Children, Cats"
      };
    
      let id = toast.loading("We are submitting your information...");
    
      const response = await createSchedule.request(req);
    
      console.log(response);
    
      if (response.data.responseCode === "00") {
        toast.update(id, {
          type: "success",
          render: response.data.responseMessage,
          isLoading: createSchedule.loading,
          autoClose: true,
          onClick: () => !createSchedule.errorMessage && toast.dismiss(),
        });
        
        // Redirect to the homepage
        router.push('/BookingInspection');
      } else {
        toast.update(id, {
          type: "error",
          render: response.data.responseMessage,
          isLoading: createSchedule.loading,
          autoClose: true,
          onClick: () => !createSchedule.errorMessage && toast.dismiss(),
        });
      }
    };

    // const onSubmit = async () => {
    
    //   let req = {
    //       bookingRenterUserId: userId,
    //       bookingRenterFirstName: firstName,
    //       bookingRenterLastName: lastName,
    //       bookingRenterAddress: address,
    //       bookingRenterCity: "city",
    //       bookingRenterPhoneNumber: phoneNumber,
    //       bookingRenterEmail: email,
    //       bookingRenterComment: "comments",
    //       bookingPropertyId: propId,
    //       // bookingPaymentId: null,
    //       // bookingCheckInDate: startDate,
    //       bookingAmount: "10000",
    //       bookingInspectionDate: bookingDate,
    //       bookingAmount: "finalPrice",
    //       bookingOptionalService: "propertyOptionalServices",
    //       bookingGuestNumber: "guestNumber",
    //       bookingGuestTypes: "Children, Cats"
    //   };
    
    //   let id = toast.loading("We are updating your submitting your information...");
    
    //   const response = await createSchedule.request(req);
    
    //   console.log(response);
    
    //   toast.update(id, {
    //     type: response.data.responseCode !== "00" ? "error" : "success",
    //     render: response.data.responseMessage,
    //     isLoading: createSchedule.loading,
    //     autoClose: true,
    //     onClick: () => !createSchedule.errorMessage && toast.dismiss(),
    //   });
    // };
  


    console.log(property.propertyImages[0].propertyImageUrl)
    console.log(property)

    console.log(property.propertyBedroomNumber)

    const totalPrice = property.propertyBookingPrice * finalDate
    const finalPrice = totalPrice + (totalPrice * 7 / 100)
    const cautionFee = parseFloat(property.propertyCautionFee)
    console.log(cautionFee);
    const sumPrice = cautionFee + finalPrice
    console.log(sumPrice)
    console.log(property.propertyCautionFee)

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
        <Head>
          <title>QuooSpace</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <div className="sticky top-0 z-50 h-[6rem] w-full"> */}
          {/* <Header /> */}
          <NavHeader />

        {/* </div> */}
        <section className="xl:mx-auto mb-14 xl:max-w-full xl:px-10">
          {/* <button
            onClick={() => Router.back()}
            className="flex items-center px-2 py-3 space-x-3 border border-gray-200 rounded-lg w-fit"
          >
            <BiChevronLeft className="text-gray-900" />
            <h1>Back to home</h1>
          </button> */}

          <div className="">
            <h1 className="text-2xl font-bold text-gray-800">
              {property.propertyName}
            </h1>
          </div>

          <div>
            {property.propertyImages.propertyImageUrl}
          </div>


          <div className="flex flex-col xl:space-y-0 space-y-3 xl:flex-row xl:justify-between mt-2">
            <div className="flex flex-col xl:flex-row space-y-3 xl:space-y-0 xl:self-end xl:space-x-2">
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
              <button onClick={() => {
                        setModActive(true);
                        addToBooking(property);
                      }} className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg">
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
              <div className="relative w-full xl:w-1/2 h-full">
                <Image
                  src={property.propertyImages[0].propertyImageUrl}
                  alt="room image"
                  className="absolute h-full w-full rounded-md rounded-tl-[10px] rounded-bl-[10px]"
                  layout="fill"
                  objectFit="cover"
                />
                <button onClick={() => {
                        setMoActive(true);
                        addToBooking(property);
                      }} className="xl:hidden flex justify-center items-center absolute bottom-0 left-1/2 transform -translate-x-1/5 -translate-y-1/2 mt-7 h-[2.375rem] w-[10rem] rounded-[10px] border border-black bg-white hover:bg-[#F7F7F7] text-sm font-medium text-black">
                      <TbGridDots className="w-4 h-4 mr-2" /> 
                      Show all Photos
                    </button>
              </div>
              {/* Sub images */}
              <div className="flex hidden xl:flex flex-col justify-between w-1/2 h-full ml-6">
                <div className="flex justify-between">
                  <div className="relative h-[15.688rem] w-fourty8 ">
                    <Image
                      src={property.propertyImages[1].propertyImageUrl}
                      alt="room image"
                      className="absolute w-full h-full"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8 ">
                    <Image
                      src={property.propertyImages[2].propertyImageUrl}
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
                      src={property.propertyImages[3].propertyImageUrl}
                      alt="room image"
                      className="absolute w-full h-full"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="relative h-[15.688rem] w-fourty8">
                    <Image
                      src={property.propertyImages[4].propertyImageUrl}
                      alt="room image"
                      className="absolute h-full w-full rounded-br-[10px]"
                      layout="fill"
                      objectFit="cover"
                    />
                    <button onClick={() => {
                        setMoActive(true);
                        addToBooking(property);
                      }} className="flex justify-center items-center absolute bottom-0 left-1/2 transform -translate-x-1/3 -translate-y-1/2 mt-7 h-[2.375rem] w-[10rem] rounded-[10px] border border-black bg-white hover:bg-[#F7F7F7] text-sm font-medium text-black">
                      <TbGridDots className="w-4 h-4 mr-2" /> 
                      Show all Photos
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Property info and booking details */}
          <div className="mt-8 font-sora">
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between w-full mt-4">
              <div className="w-full xl:w-2/3 ">
                {/* First Div containing room info */}
                
                <div className="w-11/12">
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
                  <p className="text-sm  text-justify font-normal leading-6 text-gray-600 ">
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
                    <div className="grid grid-cols-2 gap-3">
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


                {property.propertyHostingType === "FOR RENT" ? (
                  null
                ): (
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
                )}

                {property.propertyHostingType === "FOR RENT" ? (
                  null
                ): (

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
                )}

                {property.propertyHostingType === "FOR RENT" ? (
                  null
                ): (

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
                </div> )}

                
              </div>


              <div className="sticky top-5 mt-6 xl:mt-0 flex flex-col w-full xl:w-2/3 bg-gray-100  rounded-md border-black drop-shadow-xl ">
              {property.propertyHostingType === "FOR RENT" ? ( 
                <>
                <div className="flex items-center justify-between p-2 mt-5">
                    <div className="flex items-center justify-center space-x-1 text-[#031C43]">
                      {/* <h1 className="text-2xl font-medium ">{property.propertyRentalPrice}</h1> */}
                      <h1 className="text-sm font-normal">₦ {formatter.format(property.propertyBookingPrice)}</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GiRoundStar className="w-4 h-4 text-primary" />
                      <h1 className="text-sm font-medium text-secondary">
                        5.0{" "}
                      </h1>
                      <div className="w-1 h-1 rounded-full bg-secondary"></div>
                      <h1 className="text-sm font-medium text-secondary text-opacity-60">
                        50 reviews
                      </h1>
                    </div>
                  </div>
                <div className="flex flex-col space-y-4 p-2">
                  <input
                     type="text"
                     name="firstname"
                     id="firstname"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     className="h-[3rem] outline-none  rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal px-2 placeholder:text-secondary placeholder:text-opacity-40"
                     placeholder="First name"
                  />
                  <input
                     type="text"
                     name="lastname"
                     id="lastname"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     className="h-[3rem] outline-none  rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal px-2 placeholder:text-secondary placeholder:text-opacity-40"
                     placeholder="Last name"
                  />
                  <input
                     type="email"
                     name="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="h-[3rem] outline-none  rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal px-2 placeholder:text-secondary placeholder:text-opacity-40"
                     placeholder="Email"
                  />
                  <input
                     type="text"
                     name="phonenumber"
                     id="phonenumber"
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     className="h-[3rem] outline-none  rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal px-2 placeholder:text-secondary placeholder:text-opacity-40"
                     placeholder="Phone Number"
                  />
                  <input
                     type="text"
                     name="address"
                     id="address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     className="h-[3rem] outline-none  rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal px-2 placeholder:text-secondary placeholder:text-opacity-40"
                     placeholder="Address"
                  />
              
              <DatePicker
          id="date"
          selected={bookingDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setbookingDate(date)}
          className="outline-none  rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal p-2 w-full placeholder:text-secondary placeholder:text-opacity-40"
          placeholderText="Select date for Inspection"
        />
      <button
                    onClick={onSubmit}
                    className={`mt-7 mb-5 h-[2.875rem] w-full rounded-[10px] bg-primary text-sm font-medium text-white `}
                  >
                    Book Inspection
                  </button>
                      </div>
                  
                </>
              ):(

              
                <div className="self-end p-6 border border-gray-200 rounded-lg w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center space-x-1 text-[#031C43]">
                      {/* <h1 className="text-2xl font-medium ">{property.propertyRentalPrice}</h1> */}
                      <h1 className="text-sm font-normal">₦ {formatter.format(property.propertyBookingPrice)} / night</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GiRoundStar className="w-4 h-4 text-primary" />
                      <h1 className="text-sm font-medium text-secondary">
                        5.0{" "}
                      </h1>
                      <div className="w-1 h-1 rounded-full bg-secondary"></div>
                      <h1 className="text-sm font-medium text-secondary text-opacity-60">
                        50 reviews
                      </h1>
                    </div>
                  </div>

                  <div className='mt-6 text-sm font-normal text-secondary text-opacity-40'>
                  <div className='flex items-center justify-between relative'>
                    <div >
                      <p className="font-bold text-gray-800 text-xs mb-1">Check In</p>
                      <div className='flex w-full xl:w-[8.384rem] items-center justify-between rounded-lg border border-gray-800 py-3 px-4'>
                        <input 
                          value={ `${format(new Date(startDate), "MM/dd/yyyy")}` }
                          placeholder='Check-in'
                          className='touch-manipulation w-full outline-none bg-transparent text-gray-800' 
                          onClick={() => setOpen(open => !open)}
                          />
                        <BiChevronDown className='w-4 h-5 text-black' />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-xs mb-1 text-gray-800 ml-2 xl:ml-0">Check Out</p>
                      <div className='flex w-full xl:w-[8.384rem] items-center justify-between rounded-lg ml-2 xl:ml-0 border border-gray-800 py-3 px-4'>
                        <input 
                            value={ `${format(new Date(endDate), "MM/dd/yyyy")}` }
                            placeholder='Check-out'
                            className='touch-manipulation w-full outline-none bg-transparent text-gray-800'
                            onClick={() => setOpen(open => !open)}
                            />
                          <BiChevronDown className='w-4 h-5 text-black' />
                      </div>
                    </div>
                    <div ref={refOne}>
                      {open && 
                        <>
                          <DateRange 
                              editableDateInputs={true}
                              // onChange={item => setRange([item.selection])}
                              onChange={handleSelect}
                              moveRangeOnFirstSelection={false}
                              disabledDates={allDates}
                              minDate={new Date()}
                              ranges={[selectionRange]}
                              rangeColors={["#DB5461"]}
                              months={1}
                              direction="horizontal"
                              className="absolute left-1/2 -translate-x-2/4 top-14 border z-30 bg-transparent  "
                          />
                          <button
                            onClick={() => setOpen(!open)}
                            className="absolute flex items-center justify-center text-black bg-gray-100 rounded-md top-44 xl:top-40 right-2 w-14 h-7 z-50"
                          >
                            Close
                          </button>
                          </>
                      }
                      
                    </div>

                  </div>
                  {isSingleDate && <p className="text-red-500 text-xs">You cannot select one date. Please choose more than one date.</p>}


                  
                  <p className="mt-3 font-bold text-xs text-gray-800 mb-1">Number of Guests</p>
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

                  <div className="flex items-center justify-center w-full border border-gray-800 rounded-md">
      <div className="relative " ref={dropdownRef}>
        <button
          className=" text-gray-700 font-semibold py-4 px-2 xl:px-4 w-full rounded inline-flex items-center"
          onClick={handleGuestClick}
        >
          <span className="mr-1">{numGuests} Guests</span>
          <svg
            className={`fill-current ml-48 xl:ml-40 h-4 w-4 ${showDropdown ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M15 7l-5 5-5-5 1-1 4 4 4-4 1 1z" />
          </svg>
        </button>
        {showDropdown && (
          <div className="absolute z-10 mt-1 w-full rounded-md py-3 bg-gray-100 drop-shadow-md">
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
  className={`mt-7 h-[2.875rem] w-full rounded-[10px] bg-primary text-sm font-medium text-white ${isSingleDate || !dateRangeSelected ? "bg-gray-500 pointer-events-none" : ""}`}
  disabled={isSingleDate || !dateRangeSelected}
  onClick={() => {
    if (!authLevel.user) {
      authLevel.setModalVisible(true);
      authLevel.setModalType("LOGIN");
    } else if (userStat === "INCOMPLETE_PROFILE") { // add check for user status
      // show modal that takes user to profile page
      // ...
      setModeActive(true);

    }
     else {
      resetBooking();
      addToBooking(property);
      handleSubmit();
    }
  }}
>
  {!authLevel.user ? "Sign in to Book" : "Proceed"}
</button>


                  

                  <div className="my-4 ">

                  <div className="">
                  {selectedDateRange ? (
                    <div className="flex flex-col mt-5 justify-between text-sm font-bold text-secondary space-y-3 border-t border-t-black">
                      <div className="flex justify-between mt-5">
                          <h1>₦ {formatter.format(property.propertyBookingPrice)} × {finalDate} Nights</h1>
                      
                          {/* <h1>₦0 </h1> */}
                        </div>

                        <div className="flex justify-between">
                          <h1>Caution Fee</h1>
                          
                          <h1>₦ {formatter.format(property.propertyCautionFee)}</h1>
                        </div>
                      
                      <div className="flex justify-between">
                          <h1>Price after tax</h1>
                          
                          <h1>₦ {formatter.format(finalPrice)}</h1>
                        </div>

                        
                        <div className="flex justify-between">
                          <h1>Total</h1>
                          
                          <h1>₦ {formatter.format(sumPrice)}</h1>
                        </div>
                        
                      </div>
                    ):(
                      null
                    )}
                  </div>
                  </div>
                  {/* <Load /> */}
                  <div className="flex border-t border-t-black justify-between items-center mt-5">
                    <Link href="mailto:qoospayce@gmail.com"><div className="cursor-pointer flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlineMail className="text-2xl" /> <p className="text-xs">Contact</p></div></Link>
                    <Link href={`https://api.whatsapp.com/send?phone=+23490115015468&text=${encodedMessage}`}><div className="cursor-pointer flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlineWhatsApp className="text-2xl" /><p className="text-xs">WhatsApp</p></div></Link>
                    <a href="tel:+23490115015468" className="cursor-pointer flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlinePhone className="text-2xl" /> <p className="text-xs">+23490115015468</p></a>
                  </div>
                </div> )}
              
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

      <ModalComponent
        isVisible={modeActive}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => setModeActive(false)}
      >
        <VerifyModal onClick={() => setModeActive(false)} />
      </ModalComponent>

      <ModalComponent
        isVisible={modActive}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => setModActive(false)}
      >
        <ShareComponent onClick={() => setModActive(false)} />
      </ModalComponent>

      <ModalComponent
      isVisible={moActive}
      shouldBeBlurAndDarkened
      shouldBeCentered
      onClose={() => setMoActive(false)}
      >
      <ImageGalleryComponent onClick={() => setMoActive(false)} />
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

import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, {useContext, useEffect, useState} from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FiMapPin, FiUser } from "react-icons/fi";
import { GlobalContext } from "../context/GlobalState";

import Header from "../components/misc/header";
import Footer from "../components/misc/footer";
import Property from "./property/[propertyId]";
import { format } from 'date-fns'
import { useApi } from "../utils/hooks/useApi";
import { createBooking } from "../utils/api/booking/createBooking";
import { createpayment } from "../utils/api/payment/createPayment";
import { toast } from "react-toastify";
import { useAuth } from "../utils/hooks/useAuth";
// import Loader from "../components/Loader";
import Load from "../components/Load";
import Loader from "../components/Loader";
import {AiOutlineWhatsApp} from 'react-icons/ai'
import {AiOutlineMail} from 'react-icons/ai'
import {AiOutlinePhone} from 'react-icons/ai'
import Link from "next/link";
import { IoBulbOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { BsHeadset, BsHouseDoor } from "react-icons/bs";
import { RiGasStationFill } from "react-icons/ri";
import { GiNuclearWaste, GiUmbrella } from "react-icons/gi";
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Head from "next/head";
import { states } from "../states";
import NavHeader from "../components/misc/NavHeader";

const Index = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [comments, setComments] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);



  const {booking} = useContext(GlobalContext);
  const router = useRouter();
  // console.log(router.query)
  const { startDate, endDate, noOfGuests, numGuests, selectedGuests, selectedDateRange, propertyId } = router.query;
  // const formatStartDate = format(new Date(startDate), "MM/dd/yyyy")
  // const formatEndDate = format(new Date(endDate), "MM/dd/yyyy")
  const formattedStartDate = new Date(startDate).getTime()
  const formattedEndDate = new Date(endDate).getTime()
  // console.log(formattedStartDate)
  // console.log(formattedStartDate)
  // console.log(formattedStartDate)
  // console.log(formattedEndDate)
  const dateRange = formattedEndDate - formattedStartDate
  // console.log(dateRange)
  const finalDate = dateRange / (1000 * 3600 * 24);
  // console.log(finalDate)
  const navBar = "96px";

//   const checkInDate = new Date(startDate);
// const checkOutDate = new Date(endDate);





// const parsedSelectedDateRange = JSON.parse(selectedDateRange);

const handleClick = () => {
  router.push('/').then(() => router.reload());
};

// const checkOutDate = parsedSelectedDateRange?.endDate;
// const checkInDate = parsedSelectedDateRange?.startDate;

  const CreateBooking = useApi(createBooking)

  const CreatePayment = useApi(createpayment)

  const auth = useAuth();

  const user = auth.user?.userId;
  // console.log(user);

  // console.log(booking.propertyId);

  // console.log(booking.propertyName)

  // console.log(booking[0]?.propertyHost.hostUserId)

  // console.log(booking[0]?.propertyName)

  // console.log(booking)

  // console.log(booking[0]?.propertyId)

  // console.log(startDate)

  // console.log(booking[0]?.propertyBookedDates[0]?.checkInDate)

  // console.log(checkOutDate.toISOString().split('T')[0])

  // console.log(parsedSelectedDateRange)

  // console.log(checkOuttDate)

  // console.log(checkInDate)

  // console.log(checkInDate)

  // console.log(checkDate)

  // console.log(startDate)

  // const checkInDate = booking[0].propertyBookedDates[0].checkInDate

  // const checkOutDate = booking[0].propertyBookedDates[0].checkOutDate

  // console.log(format(new Date(booking[0]?.propertyBookedDates[0]?.checkInDate), "MM/dd/yyyy"))

  // console.log(booking)

  const hostId = booking[0]?.propertyHost.hostUserId;

  const propName = booking[0]?.propertyName

  const price = booking[0]?.propertyBookingPrice

  const propId = booking[0]?.propertyId

  const propertyOptionalServices = booking[0]?.propertyOptionalServices

  const PriceTag = booking[0]?.propertyBookingPrice * finalDate
  const finalPrice = PriceTag + (PriceTag * 7 / 100)
  const cautionFee = parseFloat(booking[0]?.propertyCautionFee)
  // console.log(cautionFee);
  const sumPrice = cautionFee + finalPrice
  // console.log(sumPrice)
  // console.log(booking[0]?.propertyCautionFee)

  const message = 'Hello, how are you?';
  const encodedMessage = encodeURIComponent(message);

  const paymentRef = nanoid(); // generates a random 21-character string

  // console.log(startDate)
  // console.log(endDate)




  const paymentData = {
    paymentUserId: user,
    // paymentHostUserId: "100041",
    paymentHostUserId: hostId,
    paymentPropertyName: propName,
    paymentAmount: sumPrice,
    paymentCurrency:"NGN",
    paymentReference: paymentRef,
  }  

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    city: '',
    phonenumber: '',
    // comments: '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Submit form
      const response = await CreatePayment.request(paymentData);

        if (response.data.paymentUrl) { 
          // paymentData.paymentReference = response.data.paymentReference; // Store payment reference in localStorage
          window.location.href = response.data.paymentUrl; // Redirect user to payment URL
          localStorage.setItem('paymentReference', response.data.paymentReference);
          // localStorage.setItem('paymentUrl', response.data.paymentUrl);
        }
  
        const bookingResponse = {
          bookingRenterUserId: user,
          bookingRenterFirstName: firstname,
          bookingRenterLastName: lastname,
          bookingRenterAddress: address,
          bookingRenterCity: city,
          bookingRenterPhoneNumber: phonenumber,
          bookingRenterEmail: email,
          bookingRenterComment: comments,
          bookingPropertyId: propId,
          bookingPaymentId: null,
          bookingCheckInDate: startDate,
          bookingCheckOutDate: endDate,
          bookingAmount: sumPrice,
          bookingOptionalService: propertyOptionalServices,
          bookingGuestNumber: numGuests,
          bookingGuestTypes: "Children, Cats"
        }
  
        
        localStorage.setItem('bookingResponse', JSON.stringify(bookingResponse)); // Store booking response in localStorage

        const bookingSubmit = await CreateBooking.request(bookingResponse);
        // console.log(response);
        // console.log(bookingSubmit);
  
      // Reset form
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      // Handle error
      setSubmitting(false);
    }
  };

  

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Please enter your first name'),
    lastname: Yup.string().required('Please enter your last name'),
    email: Yup.string().email('Invalid email address').required('Please enter your email address'),
    address: Yup.string().required('Please enter your address'),
    city: Yup.string().required('Please enter your city'),
    phonenumber: Yup.string().required('Please enter your phone number'),
    // comments: Yup.string().required('Please enter your comments'),
  });

  useEffect(() => {
    setIsFormComplete(
      !!firstname && !!lastname && !!address && !!city && !!phonenumber && !!email && !!comments
    );
  }, [firstname, lastname, address, city, phonenumber, email, comments]);

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
  });

  // const foot = '76px';
  return (
    
    <div className="relative h-screen  max-w-[90rem] font-sora">
      <Head>
        <title>QooSpayce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/qoo_logo.png" />
      </Head>
      <div className="sticky top-0 z-50 h-[6rem] w-full">
        {/* <Header /> */}
        <NavHeader />

      </div>
      
      <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ isSubmitting }) => (
      <Form>
          <div className="flex flex-col xl:flex-row px-5 xl:px-20">
            <div
              className="xl:w-8/12 xl:overflow-scroll xl:scrollbar-hide xl:h-screen"
              // style={{
              //   height: `calc(100vh - ${navBar})`,
                
              // }}
            >
              <div className="">
                {/* <button
                  // onClick={() => Router.back()}
                  onClick={handleClick}
                  className="flex items-center px-2 py-3 space-x-2 border border-gray-200 rounded-lg w-fit"
                >
                  <BiChevronLeft className="text-sm font-normal text-gray-900" />
                  <h1>Back to property</h1>
                </button> */}
                
                {booking.map((property) => {
                    return (
                      <div className="mt-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                          {property.propertyName}
                        </h1>
                      </div>
                      )
                    })}

                {booking.map((property) => {
                  return (
                  <div className="flex justify-between mt-2">
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
                  </div>
                  )
                })}
              </div>
              {/* {booking.map((property) => {
                
              <div className="relative h-[25.313rem] w-full">
                <Image
                  alt="Property Image"
                  src={property.propertyImages[0]?.propertyImageUrl}
                  className="absolute w-full h-full rounded-2xl"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              })} */}

              <div className="flex flex-col mt-11 border-b pb-5">
                <h1 className="text-lg font-bold text-gray-800">
                  1. Personal details
                </h1>

                <div className="flex flex-col mt-4 space-y-6">
          <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:items-center justify-between ">
            <div className="flex flex-col xl:w-fourty8">
              <Field
                type="text"
                name="firstname"
                id="firstname"
                className="h-[3rem] outline-none  rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal px-2 placeholder:text-secondary placeholder:text-opacity-40"
                placeholder="First name"
              />
              <ErrorMessage name="firstname" component="div" className="text-red-500" />
            </div>


            <div className="flex flex-col xl:w-fourty8">
              <Field
                type="text"
                name="lastname"
                id="lastname"
                className="h-[3rem] outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                placeholder="Last name"
              />
              <ErrorMessage name="lastname" component="div" className="text-red-500" />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:items-center justify-between ">
            <div className="flex flex-col xl:w-fourty8">
              <Field
                type="text"
                name="address"
                id="address"
                className="h-[3rem] outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                placeholder="Address"
              />
              <ErrorMessage name="address" component="div" className="text-red-500" />
            </div>
            
            <div className="flex flex-col xl:w-fourty8">
  <Field
    as="select"
    name="city"
    id="city"
    className="h-[3rem] outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
    placeholder="State"
  >
    <option value="" disabled>
      Select your state
    </option>
    {states.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </Field>
  <ErrorMessage name="city" component="div" className="text-red-500" />
</div>

          </div>
          <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:items-center justify-between ">
            <div className="flex flex-col xl:w-fourty8">
              <Field
                type="text"
                name="phonenumber"
                id="phonenumber"
                className="h-[3rem] outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                placeholder="Phone Number"
              />
              <ErrorMessage name="phonenumber" component="div" className="text-red-500" />
            </div>
            
            <div className="flex flex-col xl:w-fourty8">
              <Field
                type="text"
                name="email"
                id="email"
                className="h-[3rem] outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                placeholder="Email Address"
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
          </div>
          <div>
            <Field 
              as="textarea"
              type="comments"
              name="comments"
              id="comments"
              className="h-[7.438rem] outline-none w-full rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
              placeholder="Comments"
            />

              {/* <ErrorMessage name="comments" component="div" className="text-red-500" /> */}
          </div>
          </div>

                <div className="flex flex-col px-2 mt-4 space-y-4 text-sm font-normal text-gray-600">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-3 h-3 border-gray-200 checked:border-primary checked:bg-primary"
                    />
                    <label htmlFor="">I am the main guest</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-3 h-3 border-gray-200 checked:border-primary checked:bg-primary"
                    />
                    <label htmlFor="">I want to book for someone else</label>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-b pb-7">
                  <h1 className="text-lg font-bold text-gray-800">
                   2. All bills inclusive
                  </h1>
                  <div className="flex flex-col space-y-3 xl:grid xl:grid-cols-2 xl:gap-2  mt-3">
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

            </div>
            
            {booking.map((property) => {
              const totalPrice = property.propertyBookingPrice * finalDate
              const finalPrice = totalPrice + (totalPrice * 7 / 100)
              const cautionFee = parseFloat(property.propertyCautionFee)
              // console.log(cautionFee);
              const sumPrice = cautionFee + finalPrice
              // console.log(sumPrice)
              // console.log(property.propertyCautionFee)
              return (
              <div className="sticky right-0 flex items-center justify-center w-2/6 mb-5 xl:mb-0 xl:mx-0 mx-auto mt-5 xl:mt-0 px-24 xl:px-0">
                <div className="inset-0 p-6 border border-gray-200 rounded-lg">
                  <div className="flex flex-col space-y-2 text-sm font-normal text-secondary">
                    <div className="flex items-center justify-between">
                      <h1>Check-in</h1>
                      {/* <h1>02/09/2022</h1> */}
                      <h1>{`${format(new Date(startDate), "MM/dd/yyyy")}`}</h1>
                    </div>
                    <div className="flex items-center justify-between">
                      <h1>Check-out</h1>
                      {/* <h1>02/09/2022</h1> */}
                      <h1>{`${format(new Date(endDate), "MM/dd/yyyy")}`}</h1>
                    </div>

                    <div className="flex items-center justify-between">
                      <h1>Guests</h1>
                      <h1>{numGuests}</h1>
                    </div>
                  </div>
                  <div className="my-4 border-t border-t-gray-200 border-b" >
                  <div className="flex items-center justify-between text-sm font-bold text-secondary">
                    <h1>Total</h1>
                    <h1>₦ {formatter.format(sumPrice)}</h1>
                  </div>
                  {CreatePayment.loading ? (
                    <div className="flex items-center justify-center">
                      <Load />
                    </div>
                  ):(
                    <button type="submit" className={`px-24 py-4 mt-4 text-sm font-medium text-white rounded-lg bg-primary `}
                    disabled={isSubmitting}
                    >
                      Book apartment
                    </button>
                  )}
                  </div>
                  <div className="flex border-t justify-between items-center mt-5">
                    <Link href="mailto:qoospayce@gmail.com"><div className=" flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlineMail className="text-2xl" /> <p className="text-xs">Contact</p></div></Link>
                    <Link href={`https://api.whatsapp.com/send?phone=+23490115015468&text=${encodedMessage}`}><div className="cursor-pointer flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlineWhatsApp className="text-2xl" /><p className="text-xs">WhatsApp</p></div></Link>
                    <a href="tel:+2349122877657" className="cursor-pointer flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlinePhone className="text-2xl" /> <p className="text-xs">+23490115015468</p></a>
                  </div>

                  {/* <Load /> */}
                </div>
              </div>
            )
            })}            
          </div>
          
        
      {/* }
      )} */}
      </Form>
)}
</Formik>

      <div className="h-[4.75rem] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
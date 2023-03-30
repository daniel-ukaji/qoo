import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, {useContext, useEffect, useState} from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FiMapPin, FiUser } from "react-icons/fi";
import { GlobalContext } from "../context/GlobalState";

import propertyImage from "/public/images/details_image.png";
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
  const { startDate, endDate, noOfGuests, selectedGuests, selectedDateRange, propertyId } = router.query;
  // const formatStartDate = format(new Date(startDate), "MM/dd/yyyy")
  // const formatEndDate = format(new Date(endDate), "MM/dd/yyyy")
  const formattedStartDate = new Date(startDate).getTime()
  const formattedEndDate = new Date(endDate).getTime()
  console.log(formattedStartDate)
  // console.log(formattedStartDate)
  // console.log(formattedStartDate)
  // console.log(formattedEndDate)
  const dateRange = formattedEndDate - formattedStartDate
  console.log(dateRange)
  const finalDate = dateRange / (1000 * 3600 * 24);
  console.log(finalDate)
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
  console.log(user);

  console.log(booking.propertyId);

  console.log(booking.propertyName)

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

  console.log(booking)

  const hostId = booking[0]?.propertyHost.hostUserId;

  const propName = booking[0]?.propertyName

  const price = booking[0]?.propertyBookingPrice

  const propId = booking[0]?.propertyId

  const propertyOptionalServices = booking[0]?.propertyOptionalServices

  const PriceTag = booking[0]?.propertyBookingPrice * finalDate

  const message = 'Hello, how are you?';
  const encodedMessage = encodeURIComponent(message);





  const paymentData = {
    paymentUserId: user,
    // paymentHostUserId: "100041",
    paymentHostUserId: hostId,
    paymentPropertyName: propName,
    paymentAmount: PriceTag,
    paymentCurrency:"NGN",
    paymentReference: "55tTYT67IUJRE",
  }  

  const onSubmit = async (e) => {
    
      // let id = toast.loading("Please wait whiles we complete your request");

      // const response = await CreateBooking.request(bookingData);


      e.preventDefault();
      const errors = {};

      // Check if required fields are empty
      if (!firstname) {
        errors.firstname = 'Please enter your first name';
      }
      if (!lastname) {
        errors.lastname = 'Please enter your last name';
      }
      if (!address) {
        errors.address = 'Please enter your address';
      }
      if (!city) {
        errors.city = 'Please enter your city';
      }
      if (!phonenumber) {
        errors.phonenumber = 'Please enter your phone number';
      }
      if (!email) {
        errors.email = 'Please enter your email address';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsFormComplete(false);
      } else {
        // Submit form
        const response = await CreatePayment.request(paymentData);
  
        if (response.data.paymentUrl) { // Check if payment URL was returned by backend API
          window.location.href = response.data.paymentUrl; // Redirect user to payment URL
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
          bookingPaymentId: "100000",
          bookingCheckInDate: startDate,
          bookingCheckOutDate: endDate,
          bookingAmount: price,
          bookingOptionalService: propertyOptionalServices,
          bookingGuestNumber: noOfGuests,
          bookingGuestTypes: "Children, Cats"
        }
  
        
  
        const bookingSubmit = await CreateBooking.request(bookingResponse);
        console.log(response);
        console.log(bookingSubmit);
      }

  }

  useEffect(() => {
    setIsFormComplete(
      !!firstname && !!lastname && !!address && !!city && !!phonenumber && !!email
    );
  }, [firstname, lastname, address, city, phonenumber, email]);

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
  });

  // const foot = '76px';
  return (
    
    <div className="relative h-screen w-screen max-w-[90rem] font-sora">
      <div className="sticky top-0 z-50 h-[6rem] w-full">
        <Header />
      </div>
      
        
          <div className="flex px-20">
            <div
              className="w-8/12 overflow-scroll scrollbar-hide"
              style={{
                height: `calc(100vh - ${navBar}`,
              }}
            >
              <div className="py-9">
                <button
                  // onClick={() => Router.back()}
                  onClick={handleClick}
                  className="flex items-center px-2 py-3 space-x-2 border border-gray-200 rounded-lg w-fit"
                >
                  <BiChevronLeft className="text-sm font-normal text-gray-900" />
                  <h1>Back to property</h1>
                </button>
                
                {booking.map((property) => {
                    return (
                      <div className="mt-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                          {property.propertyName} @{property.propertyGPS}  {property.propertyStreet}
                        </h1>
                      </div>
                      )
                    })}
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
                </div>
              </div>
              {booking.map((property) => {
                
              <div className="relative h-[25.313rem] w-full">
                <Image
                  alt="Property Image"
                  src={property.propertyImages[0].propertyImageUrl}
                  className="absolute w-full h-full rounded-2xl"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              })}

              <div className="flex flex-col mt-11">
                <h1 className="text-lg font-bold text-gray-800">1. Summary</h1>

                <div className="flex flex-col mt-7 gap-y-4">
                  <h1 className="text-lg font-bold text-gray-800">Accomodation</h1>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <h1>Board: Stay only (14 nights)</h1>
                    <h1 className="font-bold">NGN 910,000.00</h1>
                  </div>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <h1>Board: Stay only (14 nights)</h1>
                    <h1 className="font-bold">NGN 910,000.00</h1>
                  </div>
                </div>

                <div className="flex flex-col mt-7 gap-y-4">
                  <h1 className="text-lg font-bold text-gray-800">
                    Mandatory or included services
                  </h1>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <h1>Final Cleaning (included in the price)</h1>
                    <h1 className="font-bold">NGN 0.00</h1>
                  </div>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <h1>Internet Access (included in the price)</h1>
                    <h1 className="font-bold">NGN 0.00</h1>
                  </div>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <h1>Security deposit (Refundable) (NGN50,000.00/booking)</h1>
                    <h1 className="font-bold">NGN 910,000.00</h1>
                  </div>
                </div>

                <div className="flex flex-col mt-7 gap-y-4">
                  <h1 className="text-lg font-bold text-gray-800">
                    Optional services
                  </h1>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <h1>Early Check in/Late check Out ( NGN10,000.00 /booking )</h1>
                    <h1 className="font-bold">NGN 0.00</h1>
                  </div>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <h1>Video shoot ( NGN50,000.00 /booking )</h1>
                    <h1 className="font-bold">NGN 0.00</h1>
                  </div>
                </div>

                <div className="flex flex-col mt-7 gap-y-4">
                  <h1 className="text-lg font-bold text-gray-800">Total</h1>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <h1>Total</h1>
                    <h1 className="font-bold">NGN 50,000.00</h1>
                  </div>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <h1>Video shoot ( NGN50,000.00 /booking )</h1>
                    <h1 className="font-bold">NGN 0.00</h1>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-11">
                <h1 className="text-lg font-bold text-gray-800">
                  2. Personal details
                </h1>
                <div className="flex flex-col mt-4 space-y-6">
                  <div className="flex items-center justify-between ">
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-[3rem] outline-none w-fourty8 rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="First name"
                    />
                      {formErrors.firstname && <div className="text-red-500">{formErrors.firstname}</div>}

                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-[3rem] outline-none w-fourty8 rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="Last name"
                    />
                      {formErrors.lastname && <div className="text-red-500">{formErrors.lastname}</div>}

                  </div>

                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-[3rem] w-fourty8 outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="Address"
                    />
                      {formErrors.address && <div className="text-red-500">{formErrors.address}</div>}

                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="h-[3rem] w-fourty8 outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="City"
                    />
                      {formErrors.city && <div className="text-red-500">{formErrors.city}</div>}

                  </div>

                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      name=""
                      id="phonenumber"
                      value={phonenumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-[3rem] w-fourty8 outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="Phone number"
                    />
                      {formErrors.phonenumber && <div className="text-red-500">{formErrors.phonenumber}</div>}

                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-[3rem] w-fourty8 outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="Email Address"
                    />
                      {formErrors.email && <div className="text-red-500">{formErrors.email}</div>}

                  </div>
                  <textarea
                    name="comments"
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="h-[7.438rem] outline-none w-full rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                    placeholder="Comments"
                  />
                    {formErrors.comments && <div className="text-red-500">{formErrors.comments}</div>}

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

              <div className="flex flex-col mt-11">
                <h1 className="text-lg font-bold text-gray-800">
                  3. Payment method
                </h1>

                <div className="px-2 mt-6 text-sm font-normal text-secondary">
                  <h1 className="leading-5">
                    If you choose this payment option, the accommodation will be
                    pre-reserved for you. However, to confirm the booking you will
                    have to make a bank transfer deposit to :
                  </h1>

                  <div className="flex flex-col mt-6 space-y-2 text-sm font-normal text-secondary">
                    <h1 className="font-bold">Qoosquare account</h1>
                    <h1>Zenith Bank</h1>
                    <h1>Account number - 0123456789</h1>
                    <h1>Send payment slip via Whatsapp to +234 912 287 7657.</h1>
                    <h1>Thank you.</h1>
                  </div>
                </div>

                <div className="flex items-center mt-3 space-x-3 text-sm font-normal text-gray-500">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="w-3 h-3 border-gray-200 checked:border-primary checked:bg-primary"
                  />
                  <label htmlFor="">
                    I have read and I agree with the terms and conditions and
                    privacy policy
                  </label>
                </div>
              </div>

              <div className="h-[37.313rem]"></div>
            </div>
            
            {booking.map((property) => {
              const totalPrice = property.propertyBookingPrice * finalDate
              return (
              <div className="sticky right-0 flex items-center justify-center w-2/6">
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
                      <h1>{noOfGuests}</h1>
                    </div>
                  </div>
                  <div className="my-4 border-t border-t-gray-200 border-b" >
                  <div className="flex items-center justify-between text-sm font-bold text-secondary">
                    <h1>Total</h1>
                    <h1>₦ {formatter.format(totalPrice)}</h1>
                  </div>
                  {CreatePayment.loading ? (
                    <div className="flex items-center justify-center">
                      <Load />
                    </div>
                  ):(
                    <button onClick={onSubmit} className={`px-24 py-4 mt-4 text-sm font-medium text-white rounded-lg bg-primary ${
                      !isFormComplete ? "bg-gray-300 pointer-events-none" : ""
                    }`}
                    disabled={!isFormComplete}
                    >
                      Book apartment
                    </button>
                  )}
                  </div>
                  <div className="flex border-t justify-between items-center mt-5">
                    <Link href="mailto:qoospayce@gmail.com"><div className=" flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlineMail className="text-2xl" /> <p className="text-xs">Contact</p></div></Link>
                    <Link href={`https://api.whatsapp.com/send?phone=+2349115015468&text=${encodedMessage}`}><div className=" flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlineWhatsApp className="text-2xl" /><p className="text-xs">WhatsApp</p></div></Link>
                    <div className=" flex flex-col justify-center items-center space-y-2 mt-3"><AiOutlinePhone className="text-2xl" /> <p className="text-xs">+234-9122877657</p></div>
                  </div>

                  {/* <Load /> */}
                </div>
              </div>
            )
            })}            
          </div>
          
        
      {/* }
      )} */}

      <div className="h-[4.75rem] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Index;

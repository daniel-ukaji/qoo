import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, {useContext} from "react";
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
import { toast } from "react-toastify";


const Index = () => {
  const {booking} = useContext(GlobalContext);
  const router = useRouter();
  // console.log(router.query)
  const { startDate, endDate, noOfGuests } = router.query;
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

  const CreateBooking = useApi(createBooking)

  const bookingData = {
    bookingRenterId : "100001",
    bookingPropertyId : "100001",
    bookingComment : "ablzcihyfssfkq",
    bookingGPS : "odpylyebk",
    bookingAmount : "80040.98",
    bookingCurrency : "USD",
    bookingCountry : "France",
    bookingCity : "Aba",
    bookingStreet : "bookingStreet",
    bookingEmail : "Smith@Yahoo.com",
    bookingPhoneNumber : "013012138314",
    bookingSequence : "ibpagnengivpo",
    bookingStartDate : "2021-07-12 21:04:45.440",
    bookingEndDate : "2021-07-12 21:04:45.440",
    bookingState : "Lagos",
    bookingImage : "qiiweooorjrrrk",
    bookingOptionalService : "jgtbjg",
    selfBooking : "True",
    bookingGuestFirstName : "hjjker",
    bookingGuestLastName : "hjjker",
    bookingGuestMiddleName : "hjjker",
    bookingGuestEmail : "hjjker",
    bookingGuestPhoneNumber : "hjjker",
    bookingGuestCity : "hjjker",
    bookingGuestState : "hjjker",
    bookingGuestCountry : "hjjker",
    bookingGuestStreet : "hjjker",
    bookingGuestComment : "hjjker",
    bookingGuestIdCard : "hjjker",
    bookingAdditionalNotes : "hjjker",
    bookingPromotion : "hjjker",
    bookingPromoCode : "hjjker"
  }

  const onSubmit = async () => {
    // const response = await fetch('https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/booking/create', {
    //   method: 'POST',
    //   body: {bookingData},
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // const data = await response.json()
    // console.log(data)
      let id = toast.loading("Please wait whiles we complete your request");

      const response = await CreateBooking.request(bookingData);

      toast.update(id, {
        type: response.data.responseCode !== "00" ? "error" : "success",
        render: response.data.responseMessage,
        isLoading: CreateBooking.loading,
        autoClose: true,
        // onClick: () => !completeRegError && toast.dismiss(),
      });

      console.log(response)
  }



  // const foot = '76px';
  return (
    
    <div className="relative h-screen w-screen max-w-[90rem] font-sora">
      <div className="sticky top-0 z-50 h-[6rem] w-full">
        <Header />
      </div>
      {booking.map((property) => {
        const totalPrice = property.propertyRentalPrice * finalDate
        // console.log(totalPrice)
        return (
          <div className="flex px-20">
            <div
              className="w-8/12 overflow-scroll scrollbar-hide"
              style={{
                height: `calc(100vh - ${navBar}`,
              }}
            >
              <div className="py-9">
                <button
                  onClick={() => Router.back()}
                  className="flex items-center px-2 py-3 space-x-2 border border-gray-200 rounded-lg w-fit"
                >
                  <BiChevronLeft className="text-sm font-normal text-gray-900" />
                  <h1>Back to property</h1>
                </button>
                
                <div className="mt-6">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {property.propertyName} @{property.propertyGPS}  {property.propertyStreet}
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
                </div>
              </div>

              <div className="relative h-[25.313rem] w-full">
                <Image
                  alt="Property Image"
                  src={property.propertyImage}
                  className="absolute w-full h-full rounded-2xl"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

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
                      name=""
                      id=""
                      className="h-[3rem] outline-none w-fourty8 rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      className="h-[3rem] outline-none w-fourty8 rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="Last name"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="h-[3rem] w-fourty8 outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      className="h-[3rem] w-fourty8 outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="Last name"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="h-[3rem] w-fourty8 outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      className="h-[3rem] w-fourty8 outline-none rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                      placeholder="Last name"
                    />
                  </div>
                  <textarea
                    name=""
                    id=""
                    className="h-[7.438rem] outline-none w-full rounded-lg border border-gray-200 placeholder:text-sm placeholder:font-normal  px-2 placeholder:text-secondary placeholder:text-opacity-40"
                    placeholder="Comments"
                  />
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
                <div className="my-4 border-t border-t-gray-200" />
                <div className="flex items-center justify-between text-sm font-bold text-secondary">
                  <h1>Total</h1>
                  <h1>???{totalPrice}</h1>
                </div>
                <button onClick={onSubmit} className="px-24 py-4 mt-4 text-sm font-medium text-white rounded-lg bg-primary">
                  Book apartment
                </button>
              </div>
            </div>
          </div>
          
        )
      }
      )}

      <div className="h-[4.75rem] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Index;

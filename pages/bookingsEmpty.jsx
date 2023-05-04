import React, { useEffect, useState } from 'react';
import Footer from '../components/misc/footer';
import Header from '../components/misc/header';
import social from '/public/images/Social03.png';
import Image from "next/image";
import { useAuth } from '../utils/hooks/useAuth';
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { fetchBooking } from '../utils/api/booking/getBookingRenter';
import BookingCard from '../components/BookingCard';
import NavHeader from '../components/misc/NavHeader';
import Head from "next/head";


function bookingsEmpty() {
  const [bookings, setBookings] = useState([]);
  const [noBookings, setNoBookings] = useState(false);

  const user  = useAuth();
  // console.log(user)
  // console.log(user.user?.userId)

  const API_ENDPOINT = 'https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/booking/read-by-user-id';

  const userId = user.user?.userId;

  // const {
  //   data: property,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["post", bookingRenterUserId],
  //   queryFn: () => fetchBooking(bookingRenterUserId),
  //   cacheTime: 60000 * 30,
  //   staleTime: 30000,
  // });

    const requestBody = {
      bookingRenterUserId: userId,
      };

  //           axios.post(API_ENDPOINT, requestBody)
  // .then(response => {
  //   // Handle the API response here
  //   setBookings(response.data)
  //   console.log(response.data);
  // })
  // .catch(error => {
  //   // Handle any errors that occur during the API request
  //   console.error(error);
  // });

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.post(API_ENDPOINT, requestBody);
            setBookings(response.data);
            // console.log(response.data) // assuming that the API response is an object with the user data
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchUserData();
      }, [userId]);

      useEffect(() => {
        if (bookings.length === 0) {
          setNoBookings(true);
        } else {
          setNoBookings(false);
        }
      }, [bookings]);


  return (
    <div className="font-sora relative">
      <Head>
        <title>QooSpayce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/qoo_logo.png" />
      </Head>
      {/* <Header /> */}
      <NavHeader />

      <div className='px-5 xl:px-20 mt-8 pb-3'>
        <h5 className='font-Sora text-3xl text-[#162748]'>Bookings</h5>
      </div>
      {noBookings ? (
        <div className="text-center mt-20 space-y-2 pb-20">
          <Image src={social} />
          <h5 className='font-Sora text-1xl text-gray-900'>No trips booked...yet!</h5>
          <p className='text-xs text-gray-600 font-normal'>Time to dust off your bags and start planning your next adventure.</p>
          <button className="px-8 py-4 mt-6 text-sm font-medium text-center text-white rounded-xl bg-primary w-fit">
            Start Searching
          </button>
        </div>
      ) : (
        <main className="xl:px-20 mt-8 md:max-w-full md:mx-auto">
          <div className="flex flex-wrap items-center justify-center xl:justify-start mt-8 mb-7 gap-x-5 gap-y-10">
            {bookings.data?.map((booking) => (
              <BookingCard  
                key={booking.bookingPropertyId}
                roomAddy={`${booking.propertyStreet} ${booking.propertyCity}, ${booking.propertyState} `}
                imageUrl={booking.propertyImage}
                numOfBath={booking.propertyBathroomNumber}
                numOfBed={booking.propertyBedroomNumber}
                roomTitle={booking.propertyName}
                roomId={booking.bookingPropertyId}
                price={booking.bookingAmount}
              />
            ))}
          </div>
        </main>
      )}
      <div className='mt-5'>
        <Footer />
      </div>
    </div>
  )
}

export default bookingsEmpty
// export const getStaticProps = async (context) => {
//   const { params } = context;
//   const { bookingRenterUserId } = params;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["post", bookingRenterUserId], () =>
//     fetchBooking(bookingRenterUserId)
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: 600,
//   };
// };
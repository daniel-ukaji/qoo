import { useEffect, useState } from 'react';
import { fetchbooking } from "../utils/api/booking/getBooking";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useAuth } from '../utils/hooks/useAuth';
import Social from '../public/images/Social03.png'
import Image from 'next/image';


function MultiTable() {
  const [activeTab, setActiveTab] = useState('listing');

  const user = useAuth();
  console.log(user.user?.userHostId)

  const propertyHost = user.user?.userHostId;

  const {
    data: bookings,
    isError,
    error,
    loading,
    setLoading,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: fetchbooking,
    cacheTime: 60000 * 30,
    staleTime: 300000,
  });
  
  

  function CurrentlyHosting() {
        return(
        <section className=''>
        <table className="w-full border-collapse border rounded-md border-gray-300">
        <thead>
          <tr className="">

          {/* <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
            
          </th> */}
            <th className="flex items-center text-sm gap-2 px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
            <input
                type="checkbox"
                checked=""
                onChange=""
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
            />
              Name
            </th>
            <th className="px-6 text-sm py-3 text-left font-medium  text-gray-500 tracking-wider">
              Phone number
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Property
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Guest
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Nights
            </th>
            <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
              Checked in
            </th>
          </tr>
        </thead>

        {bookings && bookings.map((booking) => {
        if (booking.bookingHostId === propertyHost) {
         return( 
        <tbody className="bg-white divide-y divide-gray-150">
          
            
              <tr className=''>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 font-bold">
                  <input
                      type="checkbox"
                      checked=""
                      onChange=""
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
                  />
                  {booking.renterFirstName} {booking.renterLastName}
              </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.renterPhoneNumber || "-------------------"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.renterEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.propertyName || "-------------------"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingGuestNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingNightNumber || "-------------------"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingCheckInDate.split(' ')[0]}</td>
              </tr>
            
            
          
          
        </tbody>
            )} 
          })}
          
      </table>
      {bookings && bookings.filter((booking) => booking.bookingHostId !== propertyHost).length === bookings.length && (
            <div className='mt-10'>
            <div className='border border-gray-200 bg-[#F9FAFB] flex flex-col items-center justify-center h-full'>
                <div className='mt-20'>
                    <Image src={Social} alt='' objectFit='contain' className='' />
                </div>
                <div className='mb-20 flex flex-col justify-center items-center'>
                    <p>You do not have any guest checking</p>
                    <p>out today.</p>
                </div>
            </div>
        </div>
          )}
      </section>
      )
    
  }

  function Reservations() {
    return (
      <section>
      <table className="w-full border-collapse border rounded-md border-gray-300">
      <thead>
        <tr className="">

        {/* <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
          
        </th> */}
          <th className="flex items-center text-sm gap-2 px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
          <input
              type="checkbox"
              checked=""
              onChange=""
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
          />
            Name
          </th>
          <th className="px-6 text-sm py-3 text-left font-medium  text-gray-500 tracking-wider">
            Phone number
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Property
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Guest
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Nights
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Cancelled
          </th>
        </tr>
      </thead>

      {bookings && bookings.map((booking) => {
      if (booking.bookingHostId === propertyHost) {
       return( 
      <tbody className="bg-white divide-y divide-gray-150">
        
          
            <tr className=''>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 font-bold">
                <input
                    type="checkbox"
                    checked=""
                    onChange=""
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
                />
                {booking.renterFirstName} {booking.renterLastName}
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.renterPhoneNumber || "-------------------"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.renterEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.propertyName || "-------------------"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingGuestNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingNightNumber || "-------------------"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingCancelled || "--------------"}</td>
            </tr>
          
          
        
        
      </tbody>
          )} 
        })}
        
    </table>
    {bookings && bookings.filter((booking) => booking.bookingHostId !== propertyHost).length === bookings.length && (
          <div className='mt-10'>
          <div className='border border-gray-200 bg-[#F9FAFB] flex flex-col items-center justify-center h-full'>
              <div className='mt-20'>
                  <Image src={Social} alt='' objectFit='contain' className='' />
              </div>
              <div className='mb-20 flex flex-col justify-center items-center'>
                    <p>You do not have any guest checking</p>
                    <p>out today.</p>
                </div>
          </div>
      </div>
        )}
    </section>
    );
  }

  function CheckingOut() {
    return (
      <section>
      <table className="w-full border-collapse border rounded-md border-gray-300">
      <thead>
        <tr className="">

        {/* <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
          
        </th> */}
          <th className="flex items-center text-sm gap-2 px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
          <input
              type="checkbox"
              checked=""
              onChange=""
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
          />
            Name
          </th>
          <th className="px-6 text-sm py-3 text-left font-medium  text-gray-500 tracking-wider">
            Phone number
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Property
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Guest
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Nights
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Checked in
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Checked Out
          </th>
        </tr>
      </thead>

      {bookings && bookings.map((booking) => {
      if (booking.bookingHostId === propertyHost) {
       return( 
      <tbody className="bg-white divide-y divide-gray-150">
        
          
            <tr className=''>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 font-bold">
                <input
                    type="checkbox"
                    checked=""
                    onChange=""
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
                />
                {booking.renterFirstName} {booking.renterLastName}
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.renterPhoneNumber || "-------------------"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.renterEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.propertyName || "-------------------"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingGuestNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingNightNumber || "-------------------"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingCheckInDate.split(' ')[0]}</td>
              <td className='px-6 py-4 whitespace-nowrap text-gray-500'>{booking.bookingCheckOutDate.split(' ')[0] || "--------------"}</td>
            </tr>
          
          
        
        
      </tbody>
          )} 
        })}
        
    </table>
    {bookings && bookings.filter((booking) => booking.bookingHostId !== propertyHost).length === bookings.length && (
          <div className='mt-10'>
          <div className='border border-gray-200 bg-[#F9FAFB] flex flex-col items-center justify-center h-full'>
              <div className='mt-20'>
                  <Image src={Social} alt='' objectFit='contain' className='' />
              </div>
              <div className='mb-20 flex flex-col justify-center items-center'>
                    <p>You do not have any guest checking</p>
                    <p>out today.</p>
                </div>
          </div>
      </div>
        )}
    </section>
    );
  }

  function ArrivingToday() {
    return (
      <section>
      <table className="w-full border-collapse border rounded-md border-gray-300">
      <thead>
        <tr className="">

        {/* <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
          
        </th> */}
          <th className="flex items-center text-sm gap-2 px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
          <input
              type="checkbox"
              checked=""
              onChange=""
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
          />
            Name
          </th>
          <th className="px-6 text-sm py-3 text-left font-medium  text-gray-500 tracking-wider">
            Phone number
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Property
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Guest
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Nights
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Checked in
          </th>
          <th className="px-6 py-3 text-sm text-left font-medium text-gray-500 tracking-wider">
            Cancelled
          </th>
        </tr>
      </thead>

      {bookings && bookings.map((booking) => {
      if (booking.bookingHostId === propertyHost) {
       return( 
      <tbody className="bg-white divide-y divide-gray-150">
        
          
            <tr className=''>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 font-bold">
                <input
                    type="checkbox"
                    checked=""
                    onChange=""
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
                />
                {booking.renterFirstName} {booking.renterLastName}
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.renterPhoneNumber || "-------------------"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.renterEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.propertyName || "-------------------"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingGuestNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingNightNumber || "-------------------"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingCheckInDate.split(' ')[0]}</td>
              <td className='px-6 py-4 whitespace-nowrap text-gray-500'>{booking.bookingCancelled || "--------------"}</td>
            </tr>
          
          
        
        
      </tbody>
          )} 
        })}
        
    </table>
    {bookings && bookings.filter((booking) => booking.bookingHostId !== propertyHost).length === bookings.length && (
          <div className='mt-10'>
          <div className='border border-gray-200 bg-[#F9FAFB] flex flex-col items-center justify-center h-full'>
              <div className='mt-20'>
                  <Image src={Social} alt='' objectFit='contain' className='' />
              </div>
              <div className='mb-20 flex flex-col justify-center items-center'>
                    <p>You do not have any guest checking</p>
                    <p>out today.</p>
                </div>
          </div>
      </div>
        )}
    </section>
      );
  }

  const tabs = [
    { id: 'currentlyhosting', label: 'Currently Hosting (0)' },
    { id: 'reservations', label: 'Reservations (0)' },
    { id: 'checkingout', label: 'Checking Out (0)' },
    { id: 'arrivingtoday', label: 'Arriving Today (0)' },
  ];

  // Initialize activeTab to the ID of the first tab when the component mounts
  useEffect(() => {
    setActiveTab(tabs[0].id);
  }, []);


  return (
    <div className=''>
      <div className="flex mb-5">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`py-2 px-4 border rounded-1-md ${activeTab === tab.id ? 'bg-[#DB5461] text-white' : 'bg-[#FFFFFF] text-gray-800'} ${index > 0 ? 'border-l border-t border-gray-200' : ''} border-r border-gray-300`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'currentlyhosting' && <CurrentlyHosting />}
        {activeTab === 'reservations' && <Reservations />}
        {activeTab === 'checkingout' && <CheckingOut />}
        {activeTab === 'arrivingtoday' && <ArrivingToday />}
      </div>
    </div>
  );
}

export default MultiTable

export async function getStaticProps() {
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery(["booking"], fetchbooking);
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
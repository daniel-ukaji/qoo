import { useEffect, useState } from 'react';
import { fetchbooking } from "../utils/api/booking/getBooking";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

function MultiTable() {
  const [activeTab, setActiveTab] = useState('listing');

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
    return (
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
        <tbody className="bg-white divide-y divide-gray-150">
          {bookings && bookings.map(booking => (
            <tr className=''>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 font-bold">
                <input
                    type="checkbox"
                    checked=""
                    onChange=""
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
                />
                Daniel
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">09072553406</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">danny@email.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">Bana Island</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingGuestNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">2</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingCheckInDate}</td>
            </tr>

          ))}
          
        </tbody>
      </table>
    );
  }

  function Reservations() {
    return (
        <table className="w-full border-collapse border rounded-md border-gray-300">
        <thead>
          <tr className="">
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
        <tbody className="bg-white divide-y divide-gray-150">
          {bookings && bookings.map((booking) => {
            return(
            <tr className=''>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 font-bold">
                <input
                    type="checkbox"
                    checked=""
                    onChange=""
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
                />
                Daniel
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">09072553406</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">danny@email.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">Bana Island</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingGuestNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">2</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">Yes</td>
            </tr>
            );
          })}
          
        </tbody>
      </table>
    );
  }

  function CheckingOut() {
    return (
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
              Checked out
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-150">
          {bookings && bookings.map((booking) => (
            <tr className=''>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 font-bold">
                <input
                    type="checkbox"
                    checked=""
                    onChange=""
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
                />
                Daniel
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">09072553406</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">danny@email.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">Bana Island</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingGuestNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">2</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingCheckInDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingCheckOutDate}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    );
  }

  function ArrivingToday() {
    return (
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
        <tbody className="bg-white divide-y divide-gray-150">
          {bookings && bookings.map((booking) => (
            <tr className=''>
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 font-bold">
                <input
                    type="checkbox"
                    checked=""
                    onChange=""
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-500"
                />
                Daniel
            </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">09072553406</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">danny@email.com</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">Bana Island</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingGuestNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">2</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingCheckInDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">Yes</td>
            </tr>
          ))}
          
        </tbody>
      </table>
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
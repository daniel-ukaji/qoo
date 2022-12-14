import Header from "../components/misc/header";
import Footer from "../components/misc/footer";
import React, { useEffect, useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import { format } from 'date-fns'
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { fetchproperty } from "../utils/api/property/getProperty";
import { fetchproperties } from "../utils/api/property/getProperties";
import InfoCard from '../components/InfoCard';




function search({ searchResults }) {

  const router = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query;

    // const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    // const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    // const range = `${formattedStartDate} - ${formattedEndDate}`

    console.log(searchResults);

    const {
      data: properties,
      isError,
      error,
      loading,
      setLoading,
    } = useQuery({
      queryKey: ["posts"],
      queryFn: fetchproperties,
      cacheTime: 60000 * 30,
      staleTime: 300000,
    });

  return (
    <div>
        <Header placeholder={` guests`} />
            <main className='flex'>
                <section className='flex-grow pt-14 px-6'>
                    <p className='text-xs'>300+ Stays -  - for {noOfGuests} guests</p>
                    <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

                    <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                        <p className='buttonSearch'>Cancellation Flexibility</p>
                        <p className='buttonSearch'>Type of Place</p>
                        <p className='buttonSearch'>Price</p>
                        <p className='buttonSearch'>Rooms and Beds</p>
                        <p className='buttonSearch'>More Filters</p>
                    </div>
                    <div>
                        {properties &&
                            properties.map((property) => (
                              <InfoCard 
                                imageUrl={property.propertyImage}
                                roomAddy={`${property.propertyStreet} ${property.propertyCity}, ${property.propertyState} `}
                                roomTitle={property.propertyIntroduction}
                                price={property.propertyRentalPrice}
                              />
                            ))
                        }
                    </div>
                </section>
            </main>
        <Footer />
    </div>
  )
}

export default search

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts"], fetchproperties);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

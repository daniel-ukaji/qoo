import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import RoomCard from "../components/RoomCard";
import { GoSettings } from "react-icons/go";
import { useState } from "react";
import ModalComponent from "../components/ModalComponent";
import FilterComponent from "../components/FilterComponent.jsx";
import { fetchproperties } from "../utils/api/property/getProperties";
import SkeletonCard from "../components/SkeletonCard";
import Navbar from "../components/Navbar";


export default function Home() {
  const [modalActive, setModalActive] = useState(false);
  const [numItems, setNumItems] = useState(8);

  const {
    data: properties,
    isError,
    error,
    loading,
    setLoading,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchproperties,
    cacheTime: 60000 * 30,
    staleTime: 300000,
  });

  return (
    <div className="font-sora">
      <Head>
        <title>QuooSpace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Navbar /> */}
      <Header />


      <main className="px-20 mt-8">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Explore Listing</h1>
          <button
            onClick={() => {
              setModalActive(true);
            }}
            className="flex items-center px-3 py-4 space-x-1 border border-gray-300 rounded-lg"
          >
            <GoSettings className="w-6 h-5 text-gray-900" />
            <h1 className="text-sm text-gray-900">Filter</h1>
          </button>
        </div>
        <div className="flex flex-wrap items-center mt-8 mb-7 gap-x-5 gap-y-10">
          
          {isError && <p>{error.message}</p>}
          {/* {properties && <SkeletonCard cards={numItems} />}           */}
          {properties &&  
            properties.slice(0, numItems).map((property) => (
              <RoomCard
                key={property.propertyId}
                roomAddy={`${property.propertyStreet} ${property.propertyCity}, ${property.propertyState} `}
                imageUrl={property.propertyImages}
                numOfBath={property.propertyBathroomNumber}
                numOfBed={property.propertyBedroomNumber}
                roomTitle={property.propertyName}
                roomId={property.propertyId}
                price={property.propertyBookingPrice}
              />
            ))}
        </div>
        {properties && numItems < properties.length &&
        <div className="flex justify-center items-center mb-20">
          <button
            onClick={() => {
              setNumItems(numItems + 8);
            }}
            className="flex justify-center items-center px-4 py-2 bg-primary text-white rounded-md mt-4"
          >
            Load More
          </button>
        </div>
        }
      </main>

      <Footer />

      <ModalComponent
        isVisible={modalActive}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => setModalActive(false)}
      >
        <FilterComponent onClick={() => setModalActive(false)} />
      </ModalComponent>
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts"], fetchproperties);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

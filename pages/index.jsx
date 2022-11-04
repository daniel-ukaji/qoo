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

export default function Home() {
  const [modalActive, setModalActive] = useState(false);
  // const {
  //   data: properties,
  //   isError,
  //   error,
  //   isLoading,
  //   isFetching,
  // } = useQuery({
  //   queryKey: ["properties"],
  //   queryFn: fetchproperties,
  //   initialData: props.properties,
  //   cacheTime: 60000 * 30,
  //   staleTime: 300000,
  // });

  const {
    data: properties,
    isError,
    error,
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
          {properties &&
            properties.map((property) => (
              <RoomCard
                key={property.propertyId}
                roomAddy={`${property.propertyStreet} ${property.propertyCity}, ${property.propertyState} `}
                imageUrl={property.propertyImage}
                numOfBath={property.propertyBathroomNumber}
                numOfBed={property.propertyBedroomNumber}
                roomTitle={property.propertyIntroduction}
                roomId={property.propertyId}
                price={property.propertyRentalPrice}
              />
            ))}
        </div>
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

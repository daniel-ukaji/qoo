import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import RoomCard from "../components/RoomCard";
import { GoSettings } from "react-icons/go";
import { useEffect, useState } from "react";
import ModalComponent from "../components/ModalComponent";
import FilterComponent from "../components/FilterComponent.jsx";
import { fetchproperties } from "../utils/api/property/getProperties";
import SkeletonCard from "../components/SkeletonCard";
import Navi from "../components/misc/Navi";
import Navbar from "../components/Navbar";
import { FaBed, FaHome, FaUsers } from "react-icons/fa";
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import social from '/public/images/Social03.png';
import Image from "next/image";
import { GiCastle } from "react-icons/gi";
import { HiBuildingLibrary } from "react-icons/hi2"
import { MdHomeWork } from "react-icons/md";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';




const categories = [
  { name: "FOR RENT", label: "Rent", icon: <HiBuildingLibrary size={25} /> },
  { name: "FOR SHORT STAY", label: "Short Stay", icon: <GiCastle size={25} /> },
  { name: "FOR BUY", label: "Buy", icon: <MdHomeWork size={25} /> },
];



export default function Home() {
  const [modalActive, setModalActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [numItems, setNumItems] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("FOR SHORT STAY");

  const propId = process.env.NEXT_PUBLIC_TAWK_PROPERTYID
const widId = process.env.NEXT_PUBLIC_WIDGETID

const tawkMessengerRef = useRef();

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };


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

  const reversedProperties = properties ? [...properties].reverse() : [];

  const filteredProperties = properties
  ? [...properties]
      .reverse()
      .filter(
        (property) =>
          property.propertyName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          property.propertyCity
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          property.propertyState
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          property.propertyStreet
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
      .filter(
        (property) =>
          selectedCategory === null || property.propertyHostingType === selectedCategory
      )
  : [];


  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(loading);
    }, 4000); // Change delay time to whatever you prefer
  
    return () => clearTimeout(delay);
  }, [loading]);


  return (
    <div className="font-sora bg-white">
      <Head>
        <title>QooSpayce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/qoo_logo.png" />
      </Head>

      {/* <Navbar /> */}
      <div className="sticky top-0 z-50 h-[6rem] w-full">
        {/* <Header onSearch={setSearchQuery} /> */}
        <Navi onSearch={setSearchQuery} />

      </div>
      
      <TawkMessengerReact
                propertyId= {propId}
                widgetId={widId}
                ref={tawkMessengerRef}/>



      <main className="px-5 md:px-20 w-full mt-8 xl:mt-0 max-w-full mx-auto">
      <div className="flex justify-center xl:justify-center items-center mb-4">
          <div className="flex gap-x-7">
            {categories.map((category) => (
              <button
                key={category}
                className={`flex 
                flex-col 
                items-center 
                justify-center 
                gap-2
                p-3
                border-b-2
                hover:text-neutral-800
                hover:border-b-neutral-800
                hover:border-b-4
                transition
                cursor-pointer ${
                  selectedCategory === category.name
                    ? 'border-b-neutral-800' : 'border-transparent'
                }
                ${
                  selectedCategory === category.name
                    ? 'border-b-4' : 'border-transparent'
                }
                ${
                  selectedCategory === category.name
                    ? 'text-neutral-800' : 'text-neutral-500'
                }
                `}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.name ? category.name : category.name
                  )
                }
              >
                {/* <Icon /> */}
                {category.icon} 
                <span className="text-xs" >{category.label}</span>
              </button>
              
            ))}
          </div>
          <button
            className="hidden flex items-center gap-x-1 px-3 py-1 rounded-full bg-gray-200 text-gray-800"
            onClick={() => setModalActive(true)}
          >
            <GoSettings />
            <span>Filter</span>
          </button>
        </div>
      {/* {isLoading && <SkeletonCard cards={numItems} />}  */}
      <div className="flex flex-wrap justify-center xl:justify-start items-center mt-2 mb-7 gap-x-5 gap-y-10">
          {isError && <p>{error.message}</p>}
          {isLoading && <SkeletonCard cards={numItems} />}
          {!isLoading && filteredProperties.length === 0 && (
          <div className="flex flex-col w-full justify-center items-center text-center mt-5 space-y-2 pb-20">
          <Image src={social} />
          <h5 className='font-Sora text-1xl text-gray-900'>No results</h5>
          <p className='text-xs text-gray-600 font-normal'>Time to dust off your bags and start planning your next adventure.</p>
          
        </div>
        )}
          {!isLoading &&
            filteredProperties
              .slice(0, numItems)
              .map((property) => (
                
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
        {filteredProperties.length > numItems && (
          <div className="flex justify-center items-center mb-20">
            <button
              onClick={() => {
                setNumItems(numItems + 10);
              }}
              className="flex justify-center items-center px-4 py-2 bg-primary text-white rounded-md mt-4"
            >
              Load More
            </button>
          </div>
        )}
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

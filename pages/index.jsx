import Head from "next/head";
import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import RoomCard from "../components/RoomCard";
import { GoSettings } from "react-icons/go";
import { useState } from "react";
import ModalComponent from "../components/ModalComponent";
import { MdClose, MdOutlineMonitor } from "react-icons/md";
import { RiSpotifyLine } from "react-icons/ri";
import { GiFairyWings } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";

const Links = [
  { href: "/Bookings", label: "Sign up" },
  { href: "/Wishlist", label: "Login" },
  { href: "/Become a host", label: "Become a host" },
  { href: "/Account settings", label: "Help" },
];

export default function Home() {
  const [filterModalActive, setFilterModalActive] = useState(false);
  return (
    <div className="font-sora">
      <Head>
        <title>QuooSpace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header links={Links} />

      <main className="px-20 mt-8">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Explore Listing</h1>
          <button
            onClick={() => setFilterModalActive(true)}
            className="flex items-center px-3 py-4 space-x-1 border border-gray-300 rounded-lg"
          >
            <GoSettings className="w-6 h-5 text-gray-900" />
            <h1 className="text-sm text-gray-900">Filter</h1>
          </button>
        </div>
        <div className="flex flex-wrap items-center mt-8 mb-7 gap-x-5 gap-y-10">
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </div>
      </main>

      <Footer />

      <ModalComponent
        isVisible={filterModalActive}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => setFilterModalActive(false)}
      >
        <div className="relative p-6 bg-white rounded-lg">
          <div className="text-center">
            <h1 className="text-base font-bold text-secondary">Filters</h1>
          </div>
          <button
            onClick={() => setFilterModalActive(false)}
            className="absolute flex items-center justify-center bg-gray-100 rounded-full top-6 right-6 w-7 h-7"
          >
            <MdClose className="w-4 h-4 font-bold text-black" />
          </button>

          <div className="mt-6">
            <h1 className="text-base font-bold text-secondary">Listing type</h1>

            <div className="flex mt-6 space-x-4">
              <div className="p-4 text-base font-medium border border-gray-200 rounded-lg text-secondary">
                For rent
              </div>

              <div className="p-4 text-base font-medium border border-gray-200 rounded-lg text-secondary">
                For Sale
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-base font-bold text-secondary">
              Rooms & Bathroom
            </h1>

            <h1 className="mt-6 text-sm font-normal text-secondary text-opacity-70">
              Bedrooms
            </h1>

            <div className="flex mt-4 space-x-4 text-sm font-medium text-secondary">
              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                1
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                2
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                3
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4+
              </div>
            </div>

            <h1 className="mt-6 text-sm font-normal text-secondary text-opacity-70">
              Bed
            </h1>

            <div className="flex mt-4 space-x-4 text-sm font-medium text-secondary">
              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                1
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                2
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                3
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4+
              </div>
            </div>

            <h1 className="mt-6 text-sm font-normal text-secondary text-opacity-70">
              Bathroom
            </h1>

            <div className="flex mt-4 space-x-4 text-sm font-medium text-secondary">
              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                1
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                2
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                3
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px]">
                4+
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-base font-bold text-secondary">Amenities</h1>

            <div className="flex mt-4 space-x-4 text-xs font-normal text-secondary text-opacity-90">
              <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
                <RiSpotifyLine className="w-4 h-4" />
                <div>Wi-Fi</div>
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
                <GiFairyWings className="w-4 h-4" />
                <div> Air Condition</div>
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
                <MdOutlineMonitor className="w-4 h-4" />
                <div>TV</div>
              </div>

              <div className="px-8 py-4 border border-gray-200 rounded-[80px] flex space-x-1 items-center justify-center">
                <FaSwimmingPool className="w-4 h-4" />
                <div>Pool</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-10">
            <button className="text-sm font-normal text-secondary">
              Clear all
            </button>
            <button className="px-5 py-3 text-xs font-normal text-white rounded-lg bg-primary ">
              Filter
            </button>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
}

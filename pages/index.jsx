import Head from "next/head";
import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import RoomCard from "../components/RoomCard";
import { GoSettings } from "react-icons/go";
import { useState } from "react";
import ModalComponent from "../components/ModalComponent";
import LoginModal from "../components/LoginModal";
import SignUpComponent from "../components/SignUpComponent";

import FilterComponent from "../components/FilterComponent.jsx";
export default function Home() {
  const [modalType, setModalType] = useState("FILTER");
  const [modalActive, setModalActive] = useState(false);

  const Links = [
    {
      label: "Sign up",
      actionType: "BUTTON",
      id: "1",
      onPress: () => {
        setModalType("REGISTER");
        setModalActive(true);
      },
    },
    {
      label: "Login",
      actionType: "BUTTON",
      id: "3",
      onPress: () => {
        setModalType("LOGIN");
        setModalActive(true);
      },
    },
    {
      label: "Become a Host",
      actionType: "LINK",
      id: "2",
      href: "/become-a-host",
    },
    {
      label: "Help",
      actionType: "LINK",
      href: "/help&Support",
      id: "4",
    },
  ];

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
            onClick={() => {
              setModalType("FILTER");
              setFilterModalActive(true);
            }}
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
        isVisible={modalActive}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => setModalActive(false)}
      >
        {modalType === "FILTER" ? (
          <FilterComponent onClick={() => setModalActive(false)} />
        ) : modalType === "LOGIN" ? (
          <LoginModal
            onClick={() => setModalActive(false)}
            onChange={() => setModalType("REGISTER")}
          />
        ) : modalType === "REGISTER" ? (
          <SignUpComponent
            onClick={() => setModalActive(false)}
            onChange={() => setModalType("LOGIN")}
          />
        ) : null}
      </ModalComponent>
    </div>
  );
}

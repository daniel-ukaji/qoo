import Image from "next/image";
import React, { useState } from "react";
import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import HomeBanner from "/public/images/home-banner.png";
import Router, { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import ModalComponent from "../components/ModalComponent";
import VerifyModal from "../components/VerifyModal";
import { useAuth } from "../utils/hooks/useAuth";
import NavHeader from "../components/misc/NavHeader";
import Head from "next/head";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';

const NewUserHome = () => {

  const [modeActive, setModeActive] = useState(false);
  const user = useAuth();

  console.log(user.user)

  const userStat = user.user?.userStatus

  const propId = process.env.NEXT_PUBLIC_TAWK_PROPERTYID
const widId = process.env.NEXT_PUBLIC_WIDGETID

const tawkMessengerRef = useRef();

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };

  return (
    <div className="font-sora">
      <Head>
        <title>QooSpayce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/qoo_logo.png" />
      </Head>
      {/* <Header /> */}
      {/* <Navbar /> */}
      <NavHeader />

      <main className="flex flex-col items-center justify-center w-full mt-10 mb-16">
        <div className="w-[24.438rem] ">
          <h1 className="text-4xl font-bold text-center text-secondary leading-[2.75rem]">
            Open your door to hosting
          </h1>
        </div>

        <button
          onClick={() => {
            if (userStat === "NOT_VERIFIED") {
              // show modal that takes user to profile page
              // ...
              setModeActive(true);
            } else {
              Router.push('/hostHomeIntro');
            }
          }}
          className="px-8 py-4 mt-6 text-sm font-medium text-center text-white rounded-xl bg-primary w-fit"
        >
          Start Hosting
        </button>


        <div className="relative w-full mt-16 h-[30rem]">
          <Image
            className="absolute w-full h-full"
            src={HomeBanner}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <TawkMessengerReact
                propertyId= {propId}
                widgetId={widId}
                ref={tawkMessengerRef}
          />
      </main>

      <Footer />
      <ModalComponent
        isVisible={modeActive}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => setModeActive(false)}
      >
        <VerifyModal onClick={() => setModeActive(false)} />
      </ModalComponent>
    </div>
  );
};

export default NewUserHome;

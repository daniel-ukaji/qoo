import Image from "next/image";
import React from "react";
import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import HomeBanner from "/public/images/home-banner.png";
import Router, { useRouter } from "next/router";
import Navbar from "../components/Navbar";

const NewUserHome = () => {
  return (
    <div className="font-sora">
      <Header />
      {/* <Navbar /> */}

      <main className="flex flex-col items-center justify-center w-full mt-10 mb-16">
        <div className="w-[24.438rem] ">
          <h1 className="text-5xl font-bold text-center text-secondary leading-[3.75rem]">
            Open your door to hosting
          </h1>
        </div>

        <button onClick={ () => Router.push('/hostHomeIntro') } className="px-8 py-4 mt-6 text-sm font-medium text-center text-white rounded-xl bg-primary w-fit">
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
      </main>

      <Footer />
    </div>
  );
};

export default NewUserHome;

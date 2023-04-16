import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import applogo from "/public/images/app_logo.png";
import DropDown from "../DropDown";
import { AuthLevelContext } from "../../utils/context/AuthLevelContext";
import { useAuth } from "../../utils/hooks/useAuth";
import ModalComponent from "../ModalComponent";
import LoginModal from "../LoginModal";
import SignUpComponent from "../SignUpComponent";
import OtpModal from "../OtpModal";
import { DateRangePicker } from 'react-date-range';
import { 
  UsersIcon,
} from '@heroicons/react/solid'
import { useRouter } from "next/router";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import MobileNav from "../MobileNav";


const HostHeader = () => {
  const router = useRouter();
  
  const authLevel = useContext(AuthLevelContext);
  const { logOut } = useAuth();

  const unAuthorizedLinks = [
    {
      label: "Sign up",
      actionType: "BUTTON",
      id: "1",
      onPress: () => {
        authLevel.setModalVisible(true);
        authLevel.setModalType("REGISTER");
      },
    },
    {
      label: "Login",
      actionType: "BUTTON",
      id: "3",
      onPress: () => {
        authLevel.setModalVisible(true);
        authLevel.setModalType("LOGIN");
      },
    },
    // {
    //   label: "Become a Host",
    //   actionType: "LINK",
    //   id: "2",
    //   href: "/become-a-host",
    // },
    // {
    //   label: "Help",
    //   actionType: "LINK",
    //   href: "/help&Support",
    //   id: "4",
    // },
  ];

  const authorizedLinks = [
    // {
    //   label: "Bookings",
    //   actionType: "LINK",
    //   id: "1",
    //   href: "/bookings",
    // },
    // {
    //   label: "Wishlist",
    //   actionType: "LINK",
    //   href: "/wishlist",
    //   id: "2",
    // },
    {
      label: "Bookings",
      actionType: "LINK",
      href: "/bookingsEmpty",
      id: "1",
    },
    {
      label: "Become a host",
      actionType: "LINK",
      href: "/new-user-home",
      id: "2",
    },
    {
      label: "Account settings",
      actionType: "LINK",
      href: "/AccountSettings",
      id: "3",
    },
    {
      label: "Host Admin",
      actionType: "LINK",
      href: "/hostProperty",
      id: "4",
    },
    {
      label: "Log out",
      actionType: "BUTTON",
      id: "5",
      onPress: () => logOut(),
    },
  ];

  const pathname = useRouter().pathname;


  const isActive = (path) => {
    return path === pathname ? "text-[#DD5F6B]" : "text-gray-500";
  };

  return (
    <>
      <nav className="mx-auto flex w-full max-w-full items-center justify-between border-b border-b-gray-200 bg-white px-5 md:px-20 py-4">
        <Link href="/">
          <div className="relative h-[2.5rem] w-[9.75rem] cursor-pointer">
            <Image src={applogo} className="absolute" alt="app logo" />
          </div>
        </Link>
        {/* <MobileNav links={authLevel.user ? authorizedLinks : unAuthorizedLinks} /> */}

        <div className="hidden md:flex space-x-5 text-gray-500">
            <Link href="/hostProperty" ><a className={isActive("/hostProperty")}>Today</a></Link>
            <Link href="/Inbox" >Inbox</Link>
            <Link href="/Calendar" >Calendar</Link>
            <Link href="/Wallet"><a className={isActive("/Wallet")}>Wallet</a></Link>
        </div>

        <DropDown
          links={authLevel.user ? authorizedLinks : unAuthorizedLinks}
        />
      </nav>


      {/* flex-col col-span-3 mx-auto */}
      

      <ModalComponent
        isVisible={authLevel.modalVisible}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => authLevel.setModalVisible(false)}
      >
        {authLevel.modalType === "LOGIN" ? (
          <LoginModal />
        ) : authLevel.modalType === "REGISTER" ? (
          <SignUpComponent />
        ) : authLevel.modalType === "OTP" ? (
          <OtpModal />
        ) : null}
      </ModalComponent>
    </>
  );
};

export default HostHeader;

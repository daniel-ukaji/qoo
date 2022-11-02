import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { RiSearchLine } from "react-icons/ri";
import applogo from "/public/images/app_logo.png";
import DropDown from "../DropDown";
import { AuthLevelContext } from "../../utils/context/AuthLevelContext";
import { useAuth } from "../../utils/hooks/useAuth";
import ModalComponent from "../ModalComponent";
import LoginModal from "../LoginModal";
import SignUpComponent from "../SignUpComponent";
import OtpModal from "../OtpModal";

const Header = () => {
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

  const authorizedLinks = [
    {
      label: "Bookings",
      actionType: "LINK",
      id: "1",
      href: "/bookings",
    },
    {
      label: "Wishlist",
      actionType: "LINK",
      href: "/wishlists",
      id: "2",
    },
    {
      label: "Become a host",
      actionType: "LINK",
      href: "/become-a-host",
      id: "3",
    },
    {
      label: "Account settings",
      actionType: "LINK",
      href: "/_/me",
      id: "4",
    },
    {
      label: "Log out",
      actionType: "BUTTON",
      id: "5",
      onPress: () => logOut(),
    },
  ];

  return (
    <>
      <nav className="mx-auto flex w-full max-w-[90rem] items-center justify-between border-b border-b-gray-200 bg-white px-20 py-7">
        <Link href="/">
          <div className="relative h-[2.5rem] w-[9.75rem] cursor-pointer">
            <Image src={applogo} className="absolute" alt="app logo" />
          </div>
        </Link>
        <div className="flex h-[2.5rem] w-[20rem] items-center justify-between rounded-[64px] border border-gray-300 py-2 px-4">
          <input
            type="text"
            name=""
            id=""
            className="w-10/12 h-full border-none outline-none placeholder:text-gray-400"
            placeholder="Search any keyword"
          />
          <div>
            <RiSearchLine className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <DropDown
          links={authLevel.user ? authorizedLinks : unAuthorizedLinks}
        />
      </nav>

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

export default Header;

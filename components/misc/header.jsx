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

const Header = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const authLevel = useContext(AuthLevelContext);
  const { logOut } = useAuth();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const resetInput = () => {
    setSearchInput('');
  }

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }

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
      href: "/wishlist",
      id: "2",
    },
    {
      label: "Bookings",
      actionType: "LINK",
      href: "/bookingsEmpty",
      id: "3",
    },
    {
      label: "Become a host",
      actionType: "LINK",
      href: "/new-user-home",
      id: "4",
    },
    {
      label: "Account settings",
      actionType: "LINK",
      href: "/_/me",
      id: "5",
    },
    {
      label: "Log out",
      actionType: "BUTTON",
      id: "6",
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
            value={searchInput} 
            onChange={(e) =>setSearchInput(e.target.value)}
            type="text"
            name=""
            id=""
            className="w-10/12 h-full border-none outline-none placeholder:text-gray-400"
            placeholder="Search your keywords"
          />
          <div>
            <RiSearchLine className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <DropDown
          links={authLevel.user ? authorizedLinks : unAuthorizedLinks}
        />
      </nav>


      {/* flex-col col-span-3 mx-auto */}
      {searchInput && (
        <>
          <div className='flex justify-center flex-col items-center'>
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
            />
            </div>
            <div className="max-w-xl mx-auto">
              <div className='flex items-center justify-center border-b mb-4'>
                <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
              
              
              <UsersIcon className='h-5' />

              <input 
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(e.target.value)}
                type="number" 
                min={1}
                className='w-12 pl-2 text-lg outline-none text-red-400' />
              </div>

              <div className='flex'>
                <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
                <button onClick={search} className='flex-grow text-red-400'>Search</button>
              </div>

            </div>
          </>
        )}

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

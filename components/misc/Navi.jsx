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
import ForgotPasswordComponent from "../ForgotPasswordComponent";
import ForgotOtpModal from "../ForgotOtpModal";
import ResetSuccess from "../ResetSuccess";

import { DateRangePicker } from 'react-date-range';
import { 
  UsersIcon,
} from '@heroicons/react/solid'
import { useRouter } from "next/router";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { GoSettings } from "react-icons/go";
import FilterComponent from "../FilterComponent";
import { useMediaQuery } from "@react-hook/media-query";
// import MobileNavBar from '../mobileNavBar'
import MobileNav from "../MobileNav";


const Navi = ({ onSearch }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const authLevel = useContext(AuthLevelContext);
  const [modalActive, setModalActive] = useState(false);
  const { logOut } = useAuth();
  const [searchValue, setSearchValue] = useState("");


  // const isMobile = useMediaQuery({ maxWidth: 767 });


  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const resetInput = () => {
    setSearchInput('');
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

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

  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name === 'query');

    const value = fieldQuery.value || '';
    const endpoint = `https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/property/read/?propertyName=${value}`;

    updatePage({
      current: endpoint
    })
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
  ];

  const authorizedLinks = [
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

  const unAuthLinks = [
    {
      label: "Sign up",
      // actionType: "BUTTON",
      actionType: "LINK",
      href: "/SignUpPage",
      id: "1",
      // onPress: () => {
      //   authLevel.setModalVisible(true);
      //   authLevel.setModalType("REGISTER");
      // },
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
  ];

  const authLinks = [
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

  const handleClick = () => {
    router.push('/').then(() => router.reload());
  };


  return (
    <>
      
      <nav className="mx-auto flex flex-col space-y-1 xl:space-y-0 xl:flex-row w-full max-w-full items-center justify-center xl:justify-between border-b border-b-gray-200 bg-white px-5 md:px-20 py-4">
        {/* <Link href="/"> */}
          <div onClick={handleClick} className="relative h-[2.5rem] w-[9.75rem] cursor-pointer">
            <Image src={applogo} className="absolute" alt="app logo" />
          </div>
          <MobileNav links={authLevel.user ? authLinks : unAuthLinks} />
        {/* </Link> */}
        <div className="flex  md:flex h-[2rem] xl:h-[2.5rem] w-[20rem] items-center justify-between rounded-[64px] border border-gray-300 py-2 px-4">
          <input
            value={searchValue} 
            // onChange={(e) =>setSearchInput(e.target.value)}
            onChange={handleSearch}
            type="text"
            name=""
            id=""
            className="w-8/12 xl:w-10/12 h-full border-none text-sm outline-none placeholder:text-gray-400"
            placeholder="Search the location"
          />
          <div>
            <RiSearchLine className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="hidden xl:flex space-x-7 items-center">
        <button
            onClick={() => {
              setModalActive(true);
            }}
            className="hidden md:hidden items-center px-3 py-3 space-x-1 border border-gray-300 rounded-lg"
          >
            <GoSettings className="w-6 h-5 text-gray-900" />
            <h1 className="text-sm text-gray-900">Filter</h1>
          </button>
        <DropDown
          links={authLevel.user ? authorizedLinks : unAuthorizedLinks}
        />
        </div>

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
        isVisible={modalActive}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => setModalActive(false)}
      >
        <FilterComponent onClick={() => setModalActive(false)} />
      </ModalComponent>

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
        ) : authLevel.modalType === "FORGOT" ? (
          <ForgotPasswordComponent />
        ) : authLevel.modalType === "OTPRESET" ? (
          <ForgotOtpModal />
        ) : authLevel.modalType === "SUCCESS" ? (
          <ResetSuccess />
        ) : null}
      </ModalComponent>
    </>
  );
};

export default Navi;

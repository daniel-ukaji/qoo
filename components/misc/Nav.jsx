import Image from "next/image";
import styled from "styled-components";
import { useMediaQuery } from "@react-hook/media-query";
import { Search, Globe, Menu, User } from "react-feather";
import DatePicker from "../DatePicker";

import Link from "next/link";
import React, { useRef, useEffect, useContext, useState } from "react";
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

const Nav = ({ placeholder }) => {
  const router = useRouter();
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const primaryLocationRef = useRef(null);
  const secondaryLocationRef = useRef(null);

  const isSmallScreen = useMediaQuery("(max-width: 36rem)");

  //form data

  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const openDatePicker = () => {
    setInputFocus(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (!isSmallScreen && secondaryLocationRef.current) {
        secondaryLocationRef.current.focus();
      }
    }, 10);
  };
  const closeDatePicker = () => {
    setInputFocus(false);
    setLocation("");
    setNumberOfChildren(0);
    setNumberOfAdults(0);
    setCheckInDate(new Date());
    setCheckOutDate(new Date());
    document.body.style.overflow = "initial";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      primaryLocationRef.current.focus();
      return;
    }
    router.push({
      pathname: "/search",
      query: {
        location: location,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        guests: numberOfChildren + numberOfAdults,
      },
    });
    setTimeout(() => closeDatePicker(), 100);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!headerRef.current.contains(event.target)) {
        closeDatePicker();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
//   const [searchInput, setSearchInput] = useState("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [noOfGuests, setNoOfGuests] = useState(1);
  const authLevel = useContext(AuthLevelContext);
  const { logOut } = useAuth();

//   const handleSelect = (ranges) => {
//     setStartDate(ranges.selection.startDate)
//     setEndDate(ranges.selection.endDate)
//   }

//   const resetInput = () => {
//     setSearchInput('');
//   }

//   const search = () => {
//     router.push({
//       pathname: "/search",
//       query: {
//         location: searchInput,
//         startDate: startDate.toISOString(),
//         endDate: endDate.toISOString(),
//         noOfGuests,
//       },
//     });
//   }

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

//   const selectionRange = {
//     startDate: startDate,
//     endDate: endDate,
//     key: 'selection'
//   }

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
    <HeaderSection
    ref={headerRef}
        // className={[
        //   scrolled || inputFocus || router.pathname !== "/" ? "scrolled" : null,
        //   inputFocus ? "inputFocus" : null,
        // ]}
    >
      <nav className="mx-auto flex w-full max-w-[90rem] items-center justify-between border-b border-b-gray-200 bg-white px-20 py-7">
        <Link href="/">
          <div className="relative h-[2.5rem] w-[9.75rem] cursor-pointer">
            <Image src={applogo} className="absolute" alt="app logo" />
          </div>
        </Link>
        {/* <nav ref={navRef}>
          <a href="#" className="active">
            Places to stay
          </a>
          <a href="#">Experiences</a>
          <a href="#">Online Experiences</a>
        </nav>   */}
        <form className="search">
          <input
            type="text"
            ref={primaryLocationRef}
            placeholder={placeholder ? placeholder : "Where are you going?"}
            onFocus={openDatePicker}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          {inputFocus && (
            <div className="overlay">
              <div className="field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  value={location}
                  ref={secondaryLocationRef}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?"
                />
              </div>

              <div className="field">
                <label>Check-in</label>
                <input disabled placeholder="Add dates" value={checkInDate} />
              </div>

              <div className="field">
                <label>Check-out</label>
                <input disabled placeholder="Add dates" value={checkOutDate} />
              </div>

              <div className="field">
                <label>Guests</label>
                <span className="guestNumber">
                  {numberOfChildren || numberOfAdults ? (
                    <p>{numberOfAdults + numberOfChildren} guests</p>
                  ) : (
                    <p className="empty">Add guests</p>
                  )}
                </span>
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={
              inputFocus &&
              !(
                location &&
                checkInDate &&
                checkOutDate &&
                (numberOfAdults || numberOfChildren)
              )
            }
            onClick={handleSubmit}
            aria-label="search places"
          >
            <Search />
            <span>Search</span>
          </button>
        </form>
        {inputFocus && (
          <DatePicker
            className="datepicker"
            close={closeDatePicker}
            checkInDate={{ value: checkInDate, setValue: setCheckInDate }}
            checkOutDate={{ value: checkOutDate, setValue: setCheckOutDate }}
            numberOfAdults={{
              value: numberOfAdults,
              setValue: setNumberOfAdults,
            }}
            numberOfChildren={{
              value: numberOfChildren,
              setValue: setNumberOfChildren,
            }}
          />
        )}
        


        {/* <div className="flex h-[2.5rem] w-[20rem] items-center justify-between rounded-[64px] border border-gray-300 py-2 px-4">
          <input
            //value={searchInput} 
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
        </div> */}

        <DropDown
          links={authLevel.user ? authorizedLinks : unAuthorizedLinks}
        />
      </nav>


      {/* flex-col col-span-3 mx-auto */}
      {/* {searchInput && (
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
        )} */}

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
    </HeaderSection>
  );
};

const HeaderSection = styled.header`
  position: fixed;
  top: 0;
  color: #fafafc;
  padding: 1.5rem var(--sidePadding);
  width: 100%;
  z-index: 10;
  transition: background 0.2s, border-bottom 0.2s;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--light);
    border-radius: 99px;
    display: flex;
    align-items: center;
    left: 0;
    top: 0;
    transition: all 0.2s;

    label,
    input,
    .guestNumber {
      background: none;
      font-size: 14px;
      border: none;
      line-height: 1.5;
      display: block;
      color: var(--dark);
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    input {
      width: 100%;
      font-weight: 700;

      &::placeholder {
        color: var(--dark);
        font-weight: 400;
        opacity: 0.5;
      }
    }
    .guestNumber {
      font-weight: 700;
      .empty {
        color: var(--dark);
        font-weight: 400;
        opacity: 0.5;
      }
    }
    .field {
      width: 100%;
      padding: 0.5rem 1.5rem;
      border-radius: 99px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: background 0.2s;
      position: relative;

      & + .field::before {
        position: absolute;
        content: "";
        width: 2px;
        height: 2rem;
        background: var(--gray);
        border-radius: 2px;
        left: 0;
        transition: transform 0.2s;
      }
      &:hover,
      &:focus-within {
        background: var(--gray);
      }

      &:last-of-type {
        padding-right: 10rem;
      }
    }
  }
  .overlay:hover .field::before,
  .overlay:focus-within .field::before {
    transform: scale(0);
  }

  .user,
  .profile,
  .logo,
  .globe,
  nav {
    display: flex;
    align-items: center;
  }

  .headerInner {
    max-width: var(--containerWidth);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }

  & > div {
    flex: 0 0 20%;
  }
  nav {
    flex: 1;
    justify-content: center;
    transition: all 0.2s;
    a + a {
      margin-left: 1.5rem;
    }
    a {
      position: relative;
    }
    a::before {
      position: absolute;
      content: "";
      width: 1.5rem;
      height: 2px;
      border-radius: 2px;
      background: var(--light);
      bottom: -0.5rem;
      left: calc(50% - 0.75rem);
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.2s;
    }
    a:hover::before,
    a.active::before {
      transform: scaleX(1);
    }
  }
  .logo {
    cursor: pointer;
    svg {
      height: 2rem;
      color: #fafafc;
      transition: color 0.2s;
    }
    span {
      font-weight: 600;
      font-size: 1.15rem;
      margin-left: 0.5rem;
    }
  }
  .profile {
    justify-content: flex-end;
    white-space: nowrap;
    svg {
      height: 1.15rem;
    }
    a,
    .themeToggle {
      margin-right: 1.5rem;
    }
    .userIcon {
      background: #2e2e48;
      border-radius: 99px;
      height: 1.5rem;
      width: 1.5rem;
      color: #fafafc;
    }
    .user {
      background: #fafafc;
      border-radius: 99px;
      padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    }
    .menu {
      color: #2e2e48;
      margin-right: 0.5rem;
    }
  }

  form {
    position: absolute;
    transform: translate(-50%, 150%);
    left: 50%;
    top: -1rem;
    background: var(--light);
    padding: 0.5rem;
    border-radius: 99px;
    display: flex;
    align-items: center;
    max-width: 720px;
    margin: 1.5rem 0;
    width: 60vw;
    box-shadow: 0 1rem 3rem -1rem #1e1e38;
    transition: all 0.2s;
    transform-origin: center;

    & * {
      transition: all 0.2s;
    }

    & > input {
      background: none;
      border: none;
      font-size: 1.15rem;
      flex: 1;
      padding: 0 1.5rem;
      color: var(--dark);
      outline: none;

      &::placeholder {
        color: var(--dark);
        opacity: 0.6;
      }
    }
    & > button {
      background: var(--red);
      color: #fafafc;
      border: none;
      padding: 0.5rem calc(1.75rem / 2);
      height: 3rem;
      max-width: 300px;
      display: flex;
      align-items: center;
      border-radius: 99px;
      font-weight: 700;
      font-size: 1rem;
      overflow: hidden;
      z-index: 2;

      &:hover:not(:disabled) {
        box-shadow: 0 0 0 2px var(--white), 0 0 0 4px var(--red);
      }

      &:disabled {
        opacity: 0.5;
      }
    }
    & > button svg {
      height: 1.25rem;
      margin-right: 0.75rem;
      flex: 0 0 1.25rem;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media (max-width: 36rem) {
    .profile,
    .logo,
    nav,
    form > button span {
      display: none;
    }
    .overlay {
      display: none;
    }
    .headerInner {
      grid-template-columns: 1fr;
    }
    form {
      position: relative;
      transform: none !important;
      width: 100% !important;
      left: unset;
      top: 0;
      margin: 0;
      & > input {
        padding: 0 1rem;
        font-size: 1rem;
      }
      & > button {
        width: 2.5rem;
        height: 2.5rem;
        padding: 0 0.6rem;
      }
      & > button svg {
        height: 1rem;
        width: 1rem;
      }
    }
  }

  @media (min-width: 36rem) and (max-width: 62.5rem) {
    nav {
      display: none;
    }
    .headerInner {
      grid-template-columns: 1fr 1fr;
    }
  }

  &.scrolled:not(.inputFocus) {
    background: var(--light);
    color: var(--dark);
    border-bottom: 2px solid var(--gray);

    .overlay {
      opacity: 0;
      pointer-events: none;
    }

    nav {
      opacity: 0;
      pointer-events: none;
    }
    .logo svg {
      color: var(--red);
    }
    .user {
      box-shadow: 0 0 0 2px var(--gray);
    }
    form {
      box-shadow: 0 0 0 2px var(--gray);
      transform: translate(-50%, 0.125rem) scale(0.83);
      width: 480px;
      & > button {
        max-width: 3rem;
      }
      & > button span {
        opacity: 0;
      }
    }
    @media (max-width: 36rem) {
      padding-top: 1rem;
      padding-bottom: 1rem;

      form {
        padding: 0;
        box-shadow: none;
        background: var(--gray);
      }
    }

    @media (min-width: 36rem) and (max-width: 62.5rem) {
      .profile {
        opacity: 0;
        pointer-events: none;
      }
      form {
        left: auto;
        right: 0;
        transform: translate(0, 0.125rem) scale(0.83);
        width: 50%;
      }
    }
  }

  &.inputFocus {
    color: var(--dark);

    .logo svg {
      color: var(--red);
    }

    form {
      background: var(--light);
      width: 100%;
      box-shadow: 0 1rem 1.5rem -0.5rem #0001;
    }
  }
`;

export default Nav;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiSearchLine } from "react-icons/ri";
import applogo from "/public/images/app_logo.png";
import DropDown from "../DropDown";

const Links = [
  { href: "/bookingsEmpty", label: "Bookings Empty" },
  { href: "/bookingsActive", label: "Bookings Active" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/wishlistActive", label: "Wishlist Active" },
  { href: "/new-user-home", label: "Become a host" },
  { href: "/Account settings", label: "Account settings" },
  { href: "/Log out", label: "Log out" },
];

const Header = ({ links = Links }) => {
  return (
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

      <DropDown links={links} />
    </nav>
  );
};

export default Header;

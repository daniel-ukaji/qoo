import Link from "next/link";
import React, { useState } from "react";
import { MdAccountCircle, MdClose } from "react-icons/md";
import { VscMenu } from "react-icons/vsc";
import ModalComponent from "./ModalComponent";

const DropDown = ({ links }) => {
  const [isDDVisible, setisDDVisible] = useState(false);

  return (
    <div className="relative z-50">
      {!isDDVisible ? (
        <button
          onClick={() => setisDDVisible(true)}
          className="flex cursor-pointer items-center space-x-1 rounded-[72px] border border-gray-400 py-2 px-4 "
        >
          <VscMenu className="w-5 h-4" />
          <MdAccountCircle className="w-6 h-6 text-gray-400 rounded-full" />
        </button>
      ) : (
        <button
          onClick={() => setisDDVisible(false)}
          className="flex cursor-pointer items-center space-x-1 rounded-[72px] border border-gray-400 py-2 px-4 "
        >
          <MdClose className="w-5 h-4" />
        </button>
      )}

      <ModalComponent
        isVisible={isDDVisible}
        onClose={() => console.log("I am being pressed")}
      >
        <div className="absolute right-0 flex flex-col px-6 py-4 space-y-1 text-gray-900 bg-white border border-gray-400 rounded-lg shadow-xl w-52 top-12">
          {links.map((link) => (
            <Link href={link.href}>
              <h1 className="p-2 text-sm font-medium text-gray-900 rounded cursor-pointer hover:bg-primary hover:text-white">
                {link.label}
              </h1>
            </Link>
          ))}
        </div>
      </ModalComponent>
    </div>
  );
};

export default DropDown;

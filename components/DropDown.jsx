import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { MdAccountCircle, MdClose } from "react-icons/md";
import { VscMenu } from "react-icons/vsc";
import ModalComponent from "./ModalComponent";
import { useAuth } from "../utils/hooks/useAuth";

const DropDown = ({ links }) => {
  const [isDDVisible, setisDDVisible] = useState(false);
  const user = useAuth();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setisDDVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="relative z-50" ref={modalRef}>
      <button
        onClick={() => setisDDVisible(!isDDVisible)}
        className="flex cursor-pointer items-center space-x-1 rounded-[72px] border border-gray-400 py-2 px-4 "
      >
        <VscMenu className="w-5 h-4" />
        {user.user?.userPicture ? (
          <img src={user.user?.userPicture} className="w-6 h-6 rounded-full" />
        ) : (
          <MdAccountCircle className="w-6 h-6 text-gray-400 rounded-full" />
        )}
      </button>

      <ModalComponent
        isVisible={isDDVisible}
        onClose={() => setisDDVisible(false)}
      >
        <div className="absolute right-0 flex flex-col py-2 space-y-3 text-gray-900 bg-white border border-gray-400 rounded-lg shadow-xl w-52 top-12">
          {links.map((link) => {
            if (link.actionType === "BUTTON") {
              return (
                <button
                  key={link.id}
                  onClick={link.onPress}
                  className="flex w-full h-full px-5 py-2 text-sm font-medium text-gray-900 rounded hover:bg-gray-200 hover:text-black"
                >
                  {link.label}
                </button>
              );
            } else if (link.actionType === "LINK") {
              return (
                <Link href={link.href} key={link.id}>
                  <div className="flex w-full h-full px-5 py-2 text-sm font-medium text-gray-900 rounded cursor-pointer hover:bg-gray-200 hover:text-black">
                    {link.label}
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </ModalComponent>
    </div>
  );
};

export default DropDown;

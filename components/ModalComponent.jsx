import { Transition } from "@headlessui/react";
import React from "react";

export default function ModalComponent({
  isVisible,
  onClose,
  children,
  shouldBeBlurAndDarkened,
  shouldBeCentered,
}) {
  const handleOnClose = (e) => {
    if (e && e.target.id === "container") onClose();
  };
  if (!isVisible) return null;
  return (
    <Transition
      show={isVisible}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        id="container"
        onClick={handleOnClose}
        className={`${
          shouldBeCentered &&
          "fixed inset-0 z-50 flex items-center justify-center"
        }  ${
          shouldBeBlurAndDarkened && "bg-black bg-opacity-30 backdrop-blur-sm"
        }`}
      >
        {children}
      </div>
    </Transition>
  );
}

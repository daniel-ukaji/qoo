import React from "react";
import Image from "next/image";

import newRoom from "/public/images/new_room.png";
import { MdOutlineBathtub, MdOutlineBed } from "react-icons/md";
import Router from "next/router";

const RoomCard = () => {
  return (
    <div
      className="font-sora w-[14rem] xl:w-[15rem] rounded-lg cursor-pointer relative"
      onClick={() => Router.push("/details")}
    >
      <div className="absolute p-2 bg-[#10182899] top-4 left-4 z-40 rounded-md">
        <h1 className="text-sm font-medium text-white">₦140k</h1>
      </div>
      <div className="relative h-[15.688rem] w-full">
        <Image src={newRoom} alt="property image" className="absolute" />
      </div>
      <div>
        <h1 className="mt-4 mb-1 text-sm font-medium text-gray-900">
          The Queen Inside
        </h1>
        <h1 className="text-xs font-normal text-secondary text-opacity-80">
          1220C Queen Street West, Toronto, ON
        </h1>
        <div className="flex items-center mt-1 space-x-4 text-sm text-secondary text-opacity-80">
          <MdOutlineBed className="w-5 h-5 text-gray-700" />
          <h1>3 bd</h1>
          <MdOutlineBathtub className="w-5 h-5 text-gray-700" />
          <h1>2 ba</h1>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

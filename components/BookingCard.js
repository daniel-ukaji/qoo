import React from "react";
import Image from "next/image";
import { MdOutlineBathtub, MdOutlineBed } from "react-icons/md";
import Link from "next/link";

const BookingCard = ({
  roomId,
  price,
  imageUrl,
  roomTitle,
  numOfBed,
  numOfBath,
  roomAddy,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
  });
  let propertyId = roomId;

  return (
    <Link href={`/booking/${propertyId}`}> 
      <div className="font-sora w-[23rem] xl:w-[15rem] rounded-lg cursor-pointer relative">
        <div className="absolute p-2 bg-[#10182899] top-4 left-4 z-40 rounded-md">
          <h1 className="text-sm font-medium text-white">
            ₦ {formatter.format(price)}
          </h1>
        </div>
        <div className="relative h-[15rem] xl:h-[11rem] w-full"> {/* h-[16.355rem] w-full */}
          <Image
            src={imageUrl}
            alt="property image"
            className="absolute rounded-md"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="mt-4 mb-1 text-sm font-medium text-gray-900">
            {roomTitle}
          </h1>
          <h1 className="text-xs font-normal text-secondary text-opacity-80">
            {roomAddy}
          </h1>
          <div className="flex items-center mt-1 space-x-4 text-sm text-secondary text-opacity-80">
            <MdOutlineBed className="w-5 h-5 text-gray-700" />
            <h1>{numOfBed} bd</h1>
            <MdOutlineBathtub className="w-5 h-5 text-gray-700" />
            <h1>{numOfBath} ba</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookingCard;

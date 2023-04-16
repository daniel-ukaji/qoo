import React, { useContext } from "react";
import { MdClose, MdOutlineMonitor } from "react-icons/md";
import { RiSpotifyLine } from "react-icons/ri";
import { GiFairyWings } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalState";
import { SlScreenDesktop } from "react-icons/sl";

const AmenitiesComponent = ({ onClick }) => {
    const {booking} = useContext(GlobalContext);

    if(booking) {

  return (
    <div className="relative p-6 bg-white rounded-lg">
      <div className="text-center">
        <h1 className="text-base font-bold text-secondary">Amenities</h1>
      </div>
      <button
        onClick={onClick}
        className="absolute flex items-center justify-center bg-gray-100 rounded-full top-6 right-6 w-7 h-7"
      >
        <MdClose className="w-4 h-4 font-bold text-black" />
      </button>

      <section>
      <section className="flex flex-col space-y-10 overflow-y-auto max-h-96">
    <div className="grid xl:grid-cols-2 gap-4">
        {booking[0].propertyServices?.split(",").map((item) => (                      
            <div className="flex space-x-3 py-3 container w-full"><SlScreenDesktop className="w-5 h-5 text-primary" /><h1>{item}</h1></div>    
        ))}
    </div>
</section>
      </section>
    </div>
  );
}
};

export default AmenitiesComponent;

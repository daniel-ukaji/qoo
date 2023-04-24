import React, { useContext } from "react";
import { MdClose, MdOutlineMonitor } from "react-icons/md";
import { RiSpotifyLine } from "react-icons/ri";
import { GiFairyWings } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalState";
import { SlScreenDesktop } from "react-icons/sl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";


const ImageGalleryComponent = ({ onClick }) => {
    const {booking} = useContext(GlobalContext);

    if(booking) {

  return (

    <div className="relative p-6 bg-transparent rounded-lg w-11/12 xl:w-1/3">
    <div className="text-center mb-5">
      {/* <h1 className="text-xs xl:text-base font-bold text-secondary">Share this property with friends & family</h1> */}
    </div>
    <button onClick={onClick} className="absolute mb-5 flex items-center justify-center bg-gray-100 rounded-full top-6 right-2 xl:right-6 w-7 h-7">
      <MdClose className="w-4 h-4 font-bold text-black" />
    </button>

    <div className="flex justify-center pr-2">
          <Slider
        className="flex hidden xl:flex flex-col justify-between w-full h-full ml-6"
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {booking[0].propertyImages.map((image) => (
          <div key={image.propertyImageUrl} className="relative h-[25.688rem] w-fourty8">
            <Image
              src={image.propertyImageUrl}
              alt="room image"
              className="absolute w-full h-full"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
      </Slider>

      
    </div>
  </div>

//     <div className="relative p-6 bg-transparent rounded-lg">
//       <div className="text-center">
//         {/* <h1 className="text-base font-bold text-secondary">Amenities</h1> */}
//       </div>
//       <button
//         onClick={onClick}
//         className="absolute flex items-center justify-center bg-gray-100 rounded-full top-6 right-6 w-7 h-7"
//       >
//         <MdClose className="w-4 h-4 font-bold text-black" />
//       </button>

//       <section>
//       <Slider
//   className="flex hidden xl:flex flex-col justify-between w-full h-full ml-6"
//   dots={true}
//   infinite={true}
//   speed={500}
//   slidesToShow={1}
//   slidesToScroll={1}
// >
//   {booking[0].propertyImages.map((image) => (
//     <div key={image.propertyImageUrl} className="relative h-[25.688rem] w-fourty8">
//       <Image
//         src={image.propertyImageUrl}
//         alt="room image"
//         className="absolute w-full h-full"
//         layout="fill"
//         objectFit="contain"
//       />
//     </div>
//   ))}
// </Slider>

//       </section>
//     </div>
  );
}
};

export default ImageGalleryComponent;

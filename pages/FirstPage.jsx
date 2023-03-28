import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import hostlogo from '../public/images/hostlogo.png'

const FirstPage = () => {
  const [selectedBox, setSelectedBox] = useState("");

  const handleBoxClick = (boxValue) => {
    setSelectedBox(boxValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Select a box:</h1>
        <div className="flex flex-wrap mb-4">
          <button
            className={`bg-transparent flex flex-col text-black border px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Box 1" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleBoxClick("Box 1")}
          >
            <Image src={hostlogo} alt="" />
            Box 1
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Box 2" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleBoxClick("Box 2")}
          >
            Box 2
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Box 3" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleBoxClick("Box 3")}
          >
            Box 3
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Box 4" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleBoxClick("Box 4")}
          >
            Box 4
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Box 5" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleBoxClick("Box 5")}
          >
            Box 5
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-4 mb-4 ${
              selectedBox === "Box 6" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleBoxClick("Box 6")}
          >
            Box 6
          </button>
        </div>
        <Link href={`/SecondPage?selectedBox=${selectedBox}`}>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              selectedBox ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!selectedBox}
          >
            Proceed
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FirstPage;

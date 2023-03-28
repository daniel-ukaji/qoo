import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const SecondPage = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleProceedClick = () => {
    router.push(
      `/LastPage?selectedBox=${router.query.selectedBox}&selectedOption=${selectedOption}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Select an option:</h1>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="options"
              value="Option 1"
              checked={selectedOption === "Option 1"}
              onChange={handleOptionChange}
            />
            <span className="ml-2">Option 1</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="options"
              value="Option 2"
              checked={selectedOption === "Option 2"}
              onChange={handleOptionChange}
            />
            <span className="ml-2">Option 2</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="options"
              value="Option 3"
              checked={selectedOption === "Option 3"}
              onChange={handleOptionChange}
            />
            <span className="ml-2">Option 3</span>
          </label>
        </div>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleBackClick}>
            Back
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              selectedOption ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!selectedOption}
            onClick={handleProceedClick}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;

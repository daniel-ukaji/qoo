import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useState } from "react";

export default function RadioPage() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(null); // add state variable
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Use router.push to navigate to the next page with the selected option in the query string
      router.push({
        pathname: "/SecondId",
        query: { option: selectedOption },
      });
    };
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  return (
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <div className="">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </div>
      
        <div className="space-y-5 font-sora font-bold">
            <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                      <label className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Issuing Country/Region</label>
                        {/* <input id="bordered-radio-1" type="select" value="Driver’s license" name="options" className="w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" /> */}
            </div>
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                      <label className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Driver's license</label>
                      <input id="bordered-radio-1" type="radio" value="Driver's license" name="options" checked={selectedOption === "Drivers_licencse"} onChange={handleOptionChange} className="w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
          </div>
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                      <label className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Passport</label>
                      <input id="bordered-radio-1" type="radio" value="Passport" name="options" checked={selectedOption === "Passport"} onChange={handleOptionChange} className="w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
          </div>
          <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                      <label className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">National Identity Card</label>
                      <input id="bordered-radio-1" type="radio" value="National Identity Card" name="options" checked={selectedOption === "National_Identity_Card"} onChange={handleOptionChange} className="w-6 h-6 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
          </div>
          
        </div>

        <div className="flex space-x-2">
          <button
            className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200`}
            disabled={!handleSubmit}
            onClick={handleSubmit}
          >
            Proceed
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */}
        
        
      </div>

    </Layout>
  );
}

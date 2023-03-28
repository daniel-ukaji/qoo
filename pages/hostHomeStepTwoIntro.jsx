import React from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router';
import axios from 'axios';

function hostHomeStepTwoIntro() {

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  // const handleSubmitClick = () => {
  //   const { selectedBox, selectedOption } = router.query;
  //   console.log(`Selected box: ${selectedBox}`);
  //   console.log(`Selected option: ${selectedOption}`);
  //   console.log(`Input value: ${inputValue}`);
  // };

  const handleSubmitClick = () => {
    const { selectedBox, selectedOption, inputValue } = router.query;
  
    axios.post("https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/host/create", {
    selectedBox,
    selectedOption,
    inputValue
  })
  .then(response => {
    console.log("Data submitted successfully");
    // TODO: show success message to the user
  })
  .catch(error => {
    console.error("Failed to submit data:", error);
    // TODO: show error message to the user
  }); 
  };

  // const handleProceedClick = () => {
  //   router.push(
  //     `/hostHomeStepTwoOne?selectedBox=${router.query.selectedBox}&selectedOption=${router.query.selectedOption}&inputValue=${router.query.inputValue}`
  //   );
  // };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
        {/* <!-- Content for the right side --> */} 
      </div>

      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <div className="flex justify-end">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </div>
        <div className="flex flex-col space-y-5 font-sora">
            <p className='text-xl'>Step 2</p>
            <h1 className="text-4xl font-bold">Make your place stand out</h1>
        </div>
        <div className="flex justify-end">
          <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200" onClick={handleBackClick}>
            Back
          </button>
          <button
            className={`py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200 `}
            
            onClick={handleSubmitClick}
          >
            Proceed
          </button>
        </div>
      </div>
      

    </Layout>
  )
}

export default hostHomeStepTwoIntro
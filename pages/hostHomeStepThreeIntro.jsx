import React from 'react'
import Layout from '../components/Layout'

function hostHomeStepThreeIntro() {
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
            <p className='text-xl'>Step 3</p>
            <h1 className="text-4xl font-bold">Finish up and publish</h1>
        </div>
        <div className='flex justify-end'>
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Back</button>
            <button className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">Proceed</button>
        </div>
      </div>
      

    </Layout>
  )
}

export default hostHomeStepThreeIntro
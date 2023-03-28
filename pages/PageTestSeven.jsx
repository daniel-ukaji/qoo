import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout'
import ClickableBox from '../components/ClickableBox';
import HostFrame from '../public/images/HostFrame.png'
import Image from 'next/image';
import { useState } from 'react';


const PageTestSeven = () => {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleNextClick = () => {
        if (!selectedFile) return; // Do not proceed if no file is selected
        dispatch({ type: 'SET_PAGE5_SELECTION', payload: selectedFile });
        dispatch({ type: 'SET_PAGE_NUMBER', payload: 8 });
    };

  return (
    <Layout>
        <div className="pl-10 p-6 h-screen flex flex-col justify-between">
            {/* <!-- Content for the left side --> */}
            <div className="">
              <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
            </div>

            <div className="">
                <h2 className="text-xl font-medium">Upload an image</h2>
                <input type="file" onChange={handleFileInputChange} />
            </div>

            <div>
              <button
                className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200"
                disabled={!selectedFile}
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
        </div>
        <div className="flex flex-col justify-between pl-10 p-6 relative bg-gradient-to-b from-[#DB5461] to-[#7B61FF] min-h-screen">
            {/* <!-- Content for the right side --> */}
            <div className='h-10 w-10'>
                <Image src={HostFrame}  />
            </div>

            <div className='font-sora font-bold mb-36 flex flex-col space-y-5'>
                <p className='text-3xl text-white'>2.</p>
                <p className='text-4xl text-white'>Let's add some photos of your place</p>
            </div>

            <div>

            </div>
        </div>
    </Layout>
  );
};

export default PageTestSeven;

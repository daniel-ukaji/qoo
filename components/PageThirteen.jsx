import React from 'react'
import Layout from '../components/Layout'
import hostlogo from '../public/images/hostlogo.png'
import Image from 'next/image'
import HostFrame from '../public/images/HostFrame.png'
import Icon from "../pages/images/Icon.png"
import { useState } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/solid";
import { useDispatch } from 'react-redux'
import { ADD_IMAGE, REMOVE_IMAGE } from '../store'



function hostHomeStepTwoTwo() {
    const dispatch = useDispatch();
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageSelect = (event) => {
        const files = Array.from(event.target.files);
        const selectedImagesCopy = [...selectedImages];
        const urls = [];
      
        files.forEach((file) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            const base64Image = reader.result.split(",")[1];
            selectedImagesCopy.push({ file, preview: reader.result });
            setSelectedImages(selectedImagesCopy);
      
            // Send ImageData to the API and log the response
            const ImageData = {
              username: "hostId",
              base64: base64Image,
              region: "us-east-1",
              source: "qucoon",
              s3bucket: "apvertise-repo",
            };
            fetch("https://m2nz1o078e.execute-api.us-east-1.amazonaws.com/prod/uploadimage2s3", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ImageData),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data.url)
                const imageUrl = data.url; // Retrieve the URL from the API response
                urls.push(imageUrl);
                if (urls.length === files.length) {
                  dispatch({ type: ADD_IMAGE, payload: urls }); // Dispatch the URL to the ADD_IMAGE action
                }
              })
              .catch((error) => console.error(error));
          };
      
          reader.readAsDataURL(file);
        });
      };
      
      
    

  const handleImageDelete = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);

    // dispatch REMOVE_IMAGE action here
//   dispatch({ type: REMOVE_IMAGE, payload: newSelectedImages });
  };

  const handleNextClick = () => {
    dispatch({ type: 'SET_PAGE_NUMBER', payload: 8 });
};

  return (
    <Layout>
      <div className="pl-10 p-6 h-screen flex flex-col justify-between">
        {/* <!-- Content for the left side --> */}
        <div className="">
            <button className="py-2 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none bg-[#EAECF0] rounded-lg border border-gray-200">Exit</button>
        </div>
        <div className='border max-w-lg flex flex-col items-center'>
                <div className='flex flex-col items-center mt-16 mb-16'>
                    <Image src={Icon}/>
                    <h1 className='font-bold mt-5 text-xl'>Drag your photos here</h1>
                    <p className='mt-1 text-gray-500'>Add atleast 5 images</p>
                    <div>
      <div className="grid grid-cols-3 gap-4">
        {selectedImages.slice(0, 1).map((image, index) => (
          <div key={index} className="relative col-span-3">
            <button
              className="absolute top-0 right-0 text-white font-bold text-sm bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
              onClick={() => handleImageDelete(index)}
            >
              x
            </button>
            <img src={image.preview} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4 col-span-3">
          {selectedImages.slice(1).map((image, index) => (
            <div key={index} className="relative">
              <button
                className="absolute top-0 right-0 text-white font-bold text-sm bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
                onClick={() => handleImageDelete(index + 1)}
              >
                x
              </button>
              <img src={image.preview} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {selectedImages.length === 0 && (
        <label htmlFor="imageInput" className="mt-8 cursor-pointer text-blue-600">
          Upload from your device
        </label>
      )}

      {selectedImages.length > 0 && (
        <button
          className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            document.getElementById("imageInput").click();
            dispatch({ type: "ADD_IMAGE", payload: selectedImages });
          }}
        >
          Add more
        </button>
      )}

      <input
        type="file"
        id="imageInput"
        multiple
        onChange={handleImageSelect}
        className="hidden"
      />
    </div>
 
                </div>
            </div>
        <div>
            <button onClick={handleNextClick} className="py-3 px-6 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#DB5461] rounded-lg border border-gray-200">Proceed</button>
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
  )
}

export default hostHomeStepTwoTwo
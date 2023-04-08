import React, { useEffect, useRef, useState } from 'react'
import HostHeader from '../components/misc/hostHeader'
import Image from 'next/image';
import AvatarProfile from '../public/images/AvatarProfile.png'
import { useAuth } from '../utils/hooks/useAuth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useApi } from '../utils/hooks/useApi';
import { updateProfile } from '../utils/api/user/updateUser';
import { toast } from 'react-toastify';
// import { readUser, readUsers } from '../utils/api/user/readUser';
// import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from 'axios';


function AccountSettings() {
    const user = useAuth();
    const [activeTab, setActiveTab] = useState('personal');
    const [previewImage, setPreviewImage] = useState(null);
    const [prevImage, setPrevImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    
    const inputRef = useRef(null);


    const API_ENDPOINT = 'https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/user/read-by-user-id';

    const userId = user.user?.userId;

    const requestBody = {
        userId: userId
      };

    const [userData, setUserData] = useState({
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userDateOfBirth: '',
        userPhoneNumber: '',
        userCountry: '',
        userState: '',
        userCity: '',
        userStreet: '',
        userIdentityNumber: '',
        userPicture: null,
        userIdentityImage: '9870',
      });

      useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
      }, [userData]);

//       const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   if (name === 'userDateOfBirth') {
//     setUserData(prevState => ({ ...prevState, [name]: new Date(value) }));
//   } else {
//     setUserData(prevState => ({ ...prevState, [name]: value }));
//   }
// };


    //   useEffect(() => {
    //     const savedUserData = JSON.parse(localStorage.getItem('userData'));
    //     if (savedUserData) {
    //       setUserData(savedUserData);
    //     }
    //   }, []);
    
      // save the user data to localStorage whenever the state is updated
      useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
      }, [userData]);

//       axios.post(API_ENDPOINT, requestBody)
//   .then(response => {
//     // Handle the API response here
//     console.log(response.data);
//   })
//   .catch(error => {
//     // Handle any errors that occur during the API request
//     console.error(error);
//   });

useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(API_ENDPOINT, requestBody);
        setUserData(response.data);
        console.log(response.data) // assuming that the API response is an object with the user data
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserData();
  }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       inputRef.current.focus();
//     }, 0);
//   }, []);

    
    // console.log(user?.user.userDateOfBirth)
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

            const usernam = "hostId_" + Math.random().toString(36).slice(2);
      
            // Send ImageData to the API and log the response
            const ImageData = {
              username: usernam,
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

                setUserData((prevState) => {
                    return {
                      ...prevState,
                      userPicture: imageUrl,
                    };
                  });

                setPreviewImage(imageUrl)
                  
              })
              .catch((error) => console.error(error));
          };
      
          reader.readAsDataURL(file);
        });
      };


   


    
    


function handleDrop(event) {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    const imageUri = URL.createObjectURL(imageFile);
    setPrevImage(imageUri);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleImageClic() {
    if (prevImage) {
      // Open a modal window with the preview image
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      
      const img = document.createElement('img');
      img.src = prevImage;
      img.style.maxWidth = '80%';
      img.style.maxHeight = '80%';
      img.style.objectFit = 'contain';
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        modal.remove();
      });
  
      modal.appendChild(img);
      document.body.appendChild(modal);
    }
  }

  const profileApi = useApi(updateProfile);

//   console.log(user.user)

  const onSubmit = async () => {
    let req = {
        userId: user.user?.userId,
        ...userData,
      };

      let id = toast.loading("We are updating your profile...");

      const response = await profileApi.request(req);

      console.log(response)

      toast.update(id, {
        type: response.data.responseCode !== "00" ? "error" : "success",
        render: response.data.responseMessage,
        isLoading: profileApi.loading,
        autoClose: true,
        onClick: () => !profileApi.errorMessage && toast.dismiss(),
      });

  }
  
    
//   useEffect(() => {
//     setActiveTab(tabs[0].id);
//   }, []);

useEffect(() => {
    setActiveTab("personal");
  }, []);


    const tabs = [
        { id: 'personalinfo', label: 'Personal Info' },
        {id: 'login', label: 'Documents'},
      ];


  return (
    <div className='font-sora'>
        <HostHeader />
                        
        <main className='max-w-[66rem] w-full mx-auto mt-10'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>Account Settings</h1>
                <button
                    onClick={onSubmit}
                    className="bg-[#DB5461] hover:bg-[#c13845] text-white mt-5 rounded-lg px-4 py-2"
                    >
                        Save Changes
                </button>
            </div>

            <div className='flex '>
                <div className='border rounded-lg p-4 mr-2 w-72 h-72 mt-10'>
                    <div className='flex items-center flex-col'>
                        {/* <Image src={selectedImages} alt=''  /> */}
                        
                        <input
                            type="file"
                            id="imageInput"
                            multiple
                            onChange={handleImageSelect}
                            className="hidden"
                        />
                        
            
            <img src={userData.userPicture} className="w-20 h-20 object-cover rounded-full" />
            {selectedImages.length === 0 && (
        <label htmlFor="imageInput" className="mt-2 font-bold cursor-pointer">
          Update profile image
        </label>
      )}
        {/* <img src={userData.userPicture} /> */}
                    </div>
                    <div>
                        <p className='text-gray-500'>Joined in 2023</p>
                        <p>Identity</p>
                        <p>Email</p>
                        <p>Phone number</p>
                    </div>
                </div>

                <div className='mt-10 max-w-[40rem] ml-5'>
                    {/* <div className="flex mb-5">
                        {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            className={`py-2 px-4 border-b  rounded-1-md ${activeTab === tab.id ? 'border-[#DB5461] text-black' : 'bg-[#FFFFFF] text-gray-800'} ${index > 0 ? 'border-1 border-b-3 border-gray-200' : ''} border-gray-300`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                        ))}
                    </div>
                <div>
                    {activeTab === 'personalinfo' && <PersonalInfo />}
                    {activeTab === 'login' && <Login />}
            
                </div> */}
                <div>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-l ${
            activeTab === "personal" ? "bg-gray-300" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Info
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            activeTab === "document" ? "bg-gray-300" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("document")}
        >
          Documents
        </button>
      </div>
      {activeTab === "personal" && (
        <section className='max-w-[40rem]'>
        <div className='mt-10 border-b'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>First Name</p>
                <button className='font-bold'>Edit</button>
            </div>
            <input
                type="text"
                name="userFirstName"
                id="userFirstName"
                value={userData.userFirstName}
                onChange={(e) => setUserData({ ...userData, userFirstName: e.target.value })}
                className="inputbox-full mb-5"
                placeholder="First Name"
                
            />
           
        </div>
        <div className='mt-10 border-b'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Last Name</p>
                <button className='font-bold'>Edit</button>
            </div>
            <input
                type="text"
                name="userLastName"
                id="userLastName"
                value={userData.userLastName}
                onChange={(e) => setUserData({ ...userData, userLastName: e.target.value })}
                className="inputbox-full mb-5"
                placeholder="Last Name"

                
            />
        </div>
        <div className='mt-10 border-b'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Email</p>
                <button className='font-bold'>Edit</button>
            </div>
            <input
                type="email"
                name="userEmail"
                id="userEmail"
                value={userData.userEmail}
                onChange={(e) => setUserData({ ...userData, userEmail: e.target.value })}
                className="inputbox-full mb-5"
                placeholder="Email Address"
                
            />
        </div>
        <div className='mt-10 border-b'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Date of Birth</p>
                <button className='font-bold'>Edit</button>
            </div>
            <DatePicker
                className="inputbox-full mb-5"
                selected={userData.userDateOfBirth}
                onChange={(date) => setUserData({ ...userData, userDateOfBirth: date })}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="Select Date of Birth"
            />

        </div>
        <div className='mt-10 border-b'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Phone Number</p>
                <button className='font-bold'>Edit</button>
            </div>
            <input
                type="text"
                name="userPhoneNumber"
                id="userPhoneNumber"
                value={userData.userPhoneNumber}
                onChange={(e) => setUserData({ ...userData, userPhoneNumber: e.target.value })}
                className="inputbox-full mb-5"
                placeholder="Phone Number"
                
            />
        </div>
        <div className='mt-10 border-b'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Country</p>
                <button className='font-bold'>Edit</button>
            </div>
            <input
                type="text"
                name="selectedCountry"
                id="selectedCountry"
                value={userData.userCountry}
                onChange={(e) => setUserData({ ...userData, userCountry: e.target.value })}
                className="inputbox-full mb-5"
                placeholder="Country"
                
            />
        </div>
        <div className='mt-10 border-b'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>State</p>
                <button className='font-bold'>Edit</button>
            </div>
            <input
                type="text"
                name="userState"
                id="userState"
                value={userData.userState}
                onChange={(e) => setUserData({ ...userData, userState: e.target.value })}
                className="inputbox-full mb-5"
                placeholder="State"
                
            />
        </div>
        <div className='mt-10 border-b'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>City</p>
                <button className='font-bold'>Edit</button>
            </div>
            <input
                type="text"
                name="userCity"
                id="userCity"
                value={userData.userCity}
                onChange={(e) => setUserData({ ...userData, userCity: e.target.value })}
                className="inputbox-full mb-5"
                placeholder="City"
                
            />
        </div>
        <div className='mt-10 border-b'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Street</p>
                <button className='font-bold'>Edit</button>
            </div>
            <input
                type="text"
                name="userStreet"
                id="userStreet"
                value={userData.userStreet}
                onChange={(e) => setUserData({ ...userData, userStreet: e.target.value })}
                className="inputbox-full mb-5"
                placeholder="Street"
                
            />
        </div>
        
    </section>
      )}
      {activeTab === "document" && (
        <section className='max-w-[40rem]'>
        <div className=''>
            <h1 className='font-bold mt-10 text-xl'>Documents</h1>

            <section className='max-w-[40rem]'>
                <div className='mt-10 border-b'>
                    <div className='flex justify-between'>
                        <p className='font-bold mb-3'>ID NUMBER</p>
                        <button className='font-bold'>Update</button>
                    </div>
                    <input
                    type="text"
                    name="userIdentityNumber"
                    id="userIdentityNumber"
                    value={userData.userIdentityNumber}
                    onChange={(e) => setUserData({ ...userData, userIdentityNumber: e.target.value })}
                    className="inputbox-full mb-5"
                    placeholder="Enter the number"
                    autoFocus
                />
                </div>

                
                
            </section>
        </div>

    </section>
      )}
    </div>
            </div>
        </div>


        </main>
    </div>
  )
}

export default AccountSettings

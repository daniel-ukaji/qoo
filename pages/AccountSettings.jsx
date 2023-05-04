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
import Footer from "../components/misc/footer";
import { countries } from "../countries";
import { documents } from "../documents";


// import { readUser, readUsers } from '../utils/api/user/readUser';
// import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Head from 'next/head';
import { MdAccountCircle } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import NavHeader from '../components/misc/NavHeader';


function AccountSettings() {
    const user = useAuth();
    const [activeTab, setActiveTab] = useState('personal');
    const [previewImage, setPreviewImage] = useState(null);
    const [prevImage, setPrevImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
    
    const inputRef = useRef(null);


    const API_ENDPOINT = 'https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/user/read-by-user-id';

    const userId = user.user?.userId;
    const userStat = user.user?.userStatus


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
        userIdentityType: '',
        userPicture: null,
        userIdentityImage: null,
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
        // console.log(response.data) // assuming that the API response is an object with the user data
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserData();
  }, );

//   useEffect(() => {
//     setTimeout(() => {
//       inputRef.current.focus();
//     }, 0);
//   }, []);

    
    // console.log(user?.user.userDateOfBirth)
    const [selectedImages, setSelectedImages] = useState([]);
    const [selected, setSelected] = useState([]);

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
                // console.log(data.url)
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

      const handleImage = (event) => {
        const files = Array.from(event.target.files);
        const selectedImagesCop = [...selected];
        const urls = [];
      
        files.forEach((file) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            const base64Image = reader.result.split(",")[1];
            selectedImagesCop.push({ file, preview: reader.result });
            setSelected(selectedImagesCop);

            const usernam = "hostId_" + Math.random().toString(36).slice(2);
      
            // Send ImageData to the API and log the response
            const ImageDat = {
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
              body: JSON.stringify(ImageDat),
            })
              .then((response) => response.json())
              .then((data) => {
                // console.log(data.url)
                const imageUri = data.url; // Retrieve the URL from the API response
                urls.push(imageUri);

                setUserData((prevState) => {
                    return {
                      ...prevState,
                      userIdentityImage: imageUri,
                    };
                  });

                setPreviewImage(imageUri)
                  
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
    
        //dispatch REMOVE_IMAGE action here
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

  const [formErrors, setFormErrors] = useState({});
  

  const profileApi = useApi(updateProfile);

  const onSubmit = async () => {
    let errors = {};
  
    // check if all required fields are filled
    if (!userData.userFirstName) {
      errors.userFirstName = "First name is required";
    }
    if (!userData.userLastName) {
      errors.userLastName = "Last name is required";
    }
    if (!userData.userEmail) {
      errors.userEmail = "Email is required";
    }
    if (!userData.userDateOfBirth) {
      errors.userDateOfBirth = "Date of birth is required";
    }
    if (!userData.userPhoneNumber) {
      errors.userPhoneNumber = "Phone number is required";
    }
    if (!userData.userCountry) {
      errors.userCountry = "Country is required";
    }
    if (!userData.userState) {
      errors.userState = "State is required";
    }
    if (!userData.userCity) {
      errors.userCity = "City is required";
    }
    if (!userData.userStreet) {
      errors.userStreet = "Street is required";
    }
    if (!userData.userIdentityType) {
      errors.userIdentityType = "Identity Type is required";
    }
    if (!userData.userIdentityNumber) {
      errors.userIdentityNumber = "Identity number is required";
    }
  
    // if there are errors, set the state and return
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    let req = {
      userId: user.user?.userId,
      ...userData,
    };
  
    let id = toast.loading("We are updating your profile...");
  
    const response = await profileApi.request(req);
  
    // console.log(response);
  
    toast.update(id, {
      type: response.data.responseCode !== "00" ? "error" : "success",
      render: response.data.responseMessage,
      isLoading: profileApi.loading,
      autoClose: true,
      onClick: () => !profileApi.errorMessage && toast.dismiss(),
    });
  };

//   console.log(user.user)

  // const onSubmit = async () => {
    
    

  //   let req = {
  //       userId: user.user?.userId,
  //       ...userData,
  //     };

  //     let id = toast.loading("We are updating your profile...");

  //     const response = await profileApi.request(req);

  //     console.log(response)

  //     toast.update(id, {
  //       type: response.data.responseCode !== "00" ? "error" : "success",
  //       render: response.data.responseMessage,
  //       isLoading: profileApi.loading,
  //       autoClose: true,
  //       onClick: () => !profileApi.errorMessage && toast.dismiss(),
  //     });

  // }

  
  
    
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
      <Head>
        <title>QooSpayce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/qoo_logo.png" />
      </Head>
        <NavHeader />
                        
        <main className='max-w-[66rem] w-full mx-auto mt-10'>
            <div className='flex flex-col lg:flex-row justify-between items-center'>
                <h1 className='font-bold text-2xl'>Account Settings</h1>
                <button
                    onClick={onSubmit}
                    className="bg-[#DB5461] hover:bg-[#c13845] text-white mt-5 rounded-lg px-4 py-2"
                    >
                        Save Changes
                </button>
            </div>

            <div className='flex flex-col lg:flex-row lg:items-start lg:justify-start justify-center items-center'>
                <div className='xl:sticky xl:top-5 border rounded-lg p-4 mr-2 w-72 h-72 mt-10'>
<div className='flex items-center flex-col'>
  <input
    type="file"
    id="imageInput"
    multiple
    onChange={handleImageSelect}
    className="hidden"
  />
  {userData.userPicture ? (
    <img
      src={userData.userPicture}
      alt=""
      className="w-20 h-20 object-cover rounded-full"
    />
  ) : (
    <MdAccountCircle className="w-20 h-20 text-gray-400 rounded-full" />
  )}
  {selectedImages.length === 0 && (
    <label htmlFor="imageInput" className="mt-2 font-bold text-sm cursor-pointer">
      {userData.userPicture ? 'Update profile image' : 'Add profile image'}
    </label>
  )}
</div>
                  {userStat === "INCOMPLETE_PROFILE" ? (
                    <div>
                        <p className='text-gray-500'>Joined in 2023</p>
                        <p>Identity</p>
                        <p>Email</p>
                        <p>Phone number</p>
                    </div>
                    
                  ): (
                    <div>
                      <p className='text-gray-500 text-sm'>Joined in 2023</p>
                    <div className='flex justify-between text-sm'>
                      <p>Identity</p>
                      <AiFillCheckCircle className='w-4 h-4 text-green-600' />
                    </div>
                    <div className='flex justify-between text-sm'>
                      <p>Email</p>
                      <AiFillCheckCircle className='w-4 h-4 text-green-600' />
                    </div>
                    <div className='flex justify-between text-sm'>
                      <p>Phone number</p>
                      <AiFillCheckCircle className='w-4 h-4 text-green-600' />
                    </div>
                </div>
                  )}
                </div>

                <div className='flex flex-col items-center lg:items-start mt-10 max-w-[40rem] ml-5'>
                {formErrors.userIdentityType && (
    <div className="text-red-500 text-sm">
      {formErrors.userIdentityType}
    </div>
  )}

{formErrors.userIdentityNumber && (
        <div className="text-red-500 text-sm">
          {formErrors.userIdentityNumber}
        </div>
      )}
                    
                {/* <div className=''> */}
      <div className="flex border justify-start items-center mb-4 ">
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
        <div className='max-w-[40rem] mb-10'>
        <div className='mt-2 lg:mt-3'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>First Name</p>
            </div>
            
            <input
        type="text"
        name="userFirstName"
        id="userFirstName"
        value={userData.userFirstName || ""}
        onChange={(e) =>
          setUserData({ ...userData, userFirstName: e.target.value })
        }
        className={`rounded-lg px-4 py-3 outline-none h-12 border ${
          formErrors.userFirstName ? "border-red-500" : "border-black"
        } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
        placeholder="Phone Number"
      />
      {formErrors.userFirstName && (
        <div className="text-red-500 text-sm">
          {formErrors.userFirstName}
        </div>
      )}
           
        </div>
        <div className='mt-10'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Last Name</p>
                {/* <button className='font-bold'>Edit</button> */}
            </div>
            
            <input
        type="text"
        name="userLastName"
        id="userLastName"
        value={userData.userLastName || ""}
        onChange={(e) =>
          setUserData({ ...userData, userLastName: e.target.value })
        }
        className={`rounded-lg px-4 py-3 outline-none h-12 border ${
          formErrors.userLastName ? "border-red-500" : "border-black"
        } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
        placeholder="Phone Number"
      />
      {formErrors.userLastName && (
        <div className="text-red-500 text-sm">
          {formErrors.userLastName}
        </div>
      )}
        </div>
        <div className='mt-10'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Email</p>
                {/* <button className='font-bold'>Edit</button> */}
            </div>
           
            <input
        type="email"
        name="userEmail"
        id="userEmail"
        value={userData.userEmail || ""}
        onChange={(e) =>
          setUserData({ ...userData, userEmail: e.target.value })
        }
        className={`rounded-lg px-4 py-3 outline-none h-12 border ${
          formErrors.userEmail ? "border-red-500" : "border-black"
        } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
        placeholder="Phone Number"
      />
      {formErrors.userEmail && (
        <div className="text-red-500 text-sm">
          {formErrors.userEmail}
        </div>
      )}
        </div>
        <div className='mt-10'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Date of Birth</p>
                {/* <button className='font-bold'>Edit</button> */}
            </div>
            <DatePicker
                className={`rounded-lg px-4 py-3 outline-none h-12 border ${
                  formErrors.userDateOfBirth ? "border-red-500" : "border-black"
                } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}                
                onChange={(date) => setUserData({ ...userData, userDateOfBirth: date })}
                selected={userData.userDateOfBirth}
                dateFormat="dd/MM/yyyy"
                value={userData.userDateOfBirth || ""}
                maxDate={new Date("2004-12-31")}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="Select Date of Birth"
            />
              {formErrors.userDateOfBirth && (
        <div className="text-red-500 text-sm">
          {formErrors.userDateOfBirth}
        </div>
      )}
        </div>
        <div className='mt-10'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Phone Number</p>
                {/* <button className='font-bold'>Edit</button> */}
            </div>
            
            <input
        type="text"
        name="userPhoneNumber"
        id="userPhoneNumber"
        value={userData.userPhoneNumber || ""}
        onChange={(e) =>
          setUserData({ ...userData, userPhoneNumber: e.target.value })
        }
        className={`rounded-lg px-4 py-3 outline-none h-12 border ${
          formErrors.userPhoneNumber ? "border-red-500" : "border-black"
        } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
        placeholder="Phone Number"
      />
      {formErrors.userPhoneNumber && (
        <div className="text-red-500 text-sm">
          {formErrors.userPhoneNumber}
        </div>
      )}
          
        </div>
        <div className='mt-10'>
  <div className='flex justify-between'>
    <p className='font-bold mb-3'>Country</p>
  </div>
  <select
    name="userCountry"
    id="userCountry"
    value={userData.userCountry || ""}
    onChange={(e) =>
      setUserData({ ...userData, userCountry: e.target.value })
    }
    className={`rounded-lg px-4 py-3 outline-none h-12 border ${
      formErrors.userCountry ? "border-red-500" : "border-black"
    } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
    placeholder="Country"
  >
    <option value="">Select a country</option>
    {countries.map((country) => (
      <option key={country} value={country}>
        {country}
      </option>
    ))}
  </select>
  {formErrors.userCountry && (
    <div className="text-red-500 text-sm">
      {formErrors.userCountry}
    </div>
  )}
</div>
        <div className='mt-10'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>State</p>
                {/* <button className='font-bold'>Edit</button> */}
            </div>
            
            <input
        type="text"
        name="userState"
        id="userState"
        value={userData.userState || ""}
        onChange={(e) =>
          setUserData({ ...userData, userState: e.target.value })
        }
        className={`rounded-lg px-4 py-3 outline-none h-12 border ${
          formErrors.userState ? "border-red-500" : "border-black"
        } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
        placeholder="State"
      />
      {formErrors.userState && (
        <div className="text-red-500 text-sm">
          {formErrors.userState}
        </div>
      )}
        </div>
        <div className='mt-10'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>City</p>
                {/* <button className='font-bold'>Edit</button> */}
            </div>
            
            <input
        type="text"
        name="userCity"
        id="userCity"
        value={userData.userCity || ""}
        onChange={(e) =>
          setUserData({ ...userData, userCity: e.target.value })
        }
        className={`rounded-lg px-4 py-3 outline-none h-12 border ${
          formErrors.userCity ? "border-red-500" : "border-black"
        } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
        placeholder="City"
      />
      {formErrors.userCity && (
        <div className="text-red-500 text-sm">
          {formErrors.userCity}
        </div>
      )}
        </div>
        <div className='mt-10'>
            <div className='flex justify-between'>
                <p className='font-bold mb-3'>Street</p>
                {/* <button className='font-bold'>Edit</button> */}
            </div>
            
            <input
        type="text"
        name="userStreet"
        id="userStreet"
        value={userData.userStreet || ""}
        onChange={(e) =>
          setUserData({ ...userData, userStreet: e.target.value })
        }
        className={`rounded-lg px-4 py-3 outline-none h-12 border ${
          formErrors.userStreet ? "border-red-500" : "border-black"
        } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
        placeholder="Street"
      />
      {formErrors.userStreet && (
        <div className="text-red-500 text-sm">
          {formErrors.userStreet}
        </div>
      )}
        </div>
        
    </div>
      )}
      {activeTab === "document" && (
        <div className='max-w-[40rem] mb-10'>
        <div className=''>
            {/* <h1 className='font-bold mt-10 text-xl ml-1 md:ml-0'>Documents</h1> */}

            <div className='max-w-[40rem]'>
            <div className='mt-10'>
  <div className='flex justify-between'>
    <p className='font-bold mb-3'>ID Type</p>
  </div>
  <select
    name="userIdentityType"
    id="userIdentityType"
    value={userData.userIdentityType || ""}
    onChange={(e) =>
      setUserData({ ...userData, userIdentityType: e.target.value })
    }
    className={`rounded-lg px-4 py-3 outline-none h-12 border ${
      formErrors.userIdentityType ? "border-red-500" : "border-black"
    } w-full md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
    placeholder="ID Type"
  >
    {/* <option className='' value="">Select an ID type</option> */}
    {documents.map((document) => (
      <option key={document} value={document}>
        {document}
      </option>
    ))}
  </select>
  {formErrors.userIdentityType && (
    <div className="text-red-500 text-sm">
      {formErrors.userIdentityType}
    </div>
  )}
</div>

                <div className='mt-10'>
                    <div className='flex items-center justify-between'>
                        <p className='font-bold mb-3'>ID NUMBER</p>
                        {/* <button className='font-bold'>Update</button> */}
                    </div>
                    
                <input
        type="text"
        name="userIdentityNumber"
        id="userIdentityNumber"
        value={userData.userIdentityNumber || ""}
        onChange={(e) =>
          setUserData({ ...userData, userIdentityNumber: e.target.value })
        }
        className={`rounded-lg px-4 py-3 outline-none h-12 border ${
          formErrors.userIdentityNumber ? "border-red-500" : "border-black"
        } w-[20rem] md:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2`}
        placeholder="Identity Number"
      />
      {formErrors.userIdentityNumber && (
        <div className="text-red-500 text-sm">
          {formErrors.userIdentityNumber}
        </div>
      )}
                </div>

                

                <div className='mt-10 border-b'>
                            <div className='flex justify-between'>
                                <p className='font-bold mb-3'>ID IMAGE</p>
                                <label htmlFor="image">Upload picture</label>
                            </div>
                            <div className="w-72 h-72 xl:h-96 xl:w-96 border-dashed border-2 border-gray-400 flex justify-center items-center">
                            <input
                              type="file"
                              id="image"
                              multiple
                              onChange={handleImage}
                              className="hidden"
                            />

                            
                          

                            <img
                                  src={userData.userIdentityImage}
                                  alt=""
                                  className="w-72 h-72 xl:w-96 xl:h-96 object-cover "
                                />
                            </div>
                            
                        </div>

                
                
            </div>
        </div>

    </div>
      )}
    {/* </div> */}
            </div>
        </div>


        </main>
        <Footer />
    </div>
  )
}

export default AccountSettings

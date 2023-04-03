import React, { useEffect, useState } from 'react'
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


function AccountSettings() {
    const user = useAuth();
    // const usersId = user?.user.userId;
    console.log(user)
    // console.log(user.user?.userFirstName)
    const [users, setUsers] = useState({});
    const [activeTab, setActiveTab] = useState('listing');
    // const [userFirstName, setUserFirstName] = useState('');
    // const [userLastName, setUserLastName] = useState('');
    // const [userEmail, setUserEmail] = useState('');
    // const [userDateOfBirth, setUserDateOfBirth] = useState('');
    // const [userPhoneNumber, setUserPhoneNumber] = useState('');
    // const [userCountry, setUserCountry] = useState('');
    // const [userState, setUserState] = useState('');
    // const [userCity, setUserCity] = useState('');
    // const [userStreet, setUserStreet] = useState('');
    // const [userIdentityNumber, setUserIdentityNumber] = useState('');
    // const datias = {
    //     userId: usersId 
    // }
    // useEffect(() => {
    //     async function fetchData() {
    //       const response = await fetch('https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/user/read-by-user-id', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(datias)
    //       });
    //       const data = await response.json();
    //       console.log(data)
    //       setUsers(data);
    //     }
    //     fetchData();
    //   }, []);

    //   console.log(users?.userLastName)
    //   console.log(users?.userId)
    //   const usersFirstName = users?.userFirstName
    //   console.log(usersFirstName)


    
    console.log(user?.user.userDateOfBirth)
   


    const [userData, setUserData] = useState({
        userFirstName: user?.user.userFirstName,
        userLastName: user?.user.userLastName,
        userEmail: user?.user.userEmail,
        userDateOfBirth: '',
        userPhoneNumber: user?.user.userPhoneNumber,
        userCountry: user?.user.userCountry,
        userState: user?.user.userState,
        userCity: user?.user.userCity,
        userStreet: user?.user.userStreet,
        userIdentityNumber: user?.user.userIdentityNumber,
        userPicture: 'rodeuxhlgwtut',
        userIdentityImage: '9870',
      });
    const [previewImage, setPreviewImage] = useState(null);


function handleDrop(event) {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setPreviewImage(imageUrl);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleImageClick() {
    if (previewImage) {
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
      img.src = previewImage;
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

  const onSubmit = async () => {
    let req = {
        userId: user?.user.userId,
        ...userData,
    // userFirstName,
    // userLastName,
    // userEmail,
    // userDateOfBirth,
    // userPicture: "rodeuxhlgwtut",
    // userPhoneNumber,
    // userCountry,
    // userState,
    // userCity,
    // userStreet,
    // userIdentityNumber,
    // userIdentityImage: "9870"
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
  
    



    // console.log(user.user)

    function PersonalInfo() {
        return (
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
                            name="userCity"
                            id="userCity"
                            value={userData.userStreet}
                            onChange={(e) => setUserData({ ...userData, userStreet: e.target.value })}
                            className="inputbox-full mb-5"
                            placeholder="Street"
                        />
                    </div>
                    
                </section>
            )
        }

    function Login(){
        return (
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
                        />
                        </div>

                        <div className='mt-10 border-b'>
                            <div className='flex justify-between'>
                                <p className='font-bold mb-3'>ID IMAGE</p>
                                <button className='font-bold'>Update</button>
                            </div>
                            <div
                                className="h-96 w-96 border-dashed border-2 border-gray-400 flex justify-center items-center"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onClick={handleImageClick}
                            >
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" />
                                ) : (
                                    <p>Drag and drop an image here</p>
                                )}
                            </div>
                        </div>
                        
                    </section>
                </div>

            </section>
        )
    }

    

    useEffect(() => {
        setActiveTab(tabs[0].id);
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
                        <Image src={AvatarProfile} alt=''  />
                        <p className='font-bold'>Update picture</p>
                    </div>
                    <div>
                        <p className='text-gray-500'>Joined in 2023</p>
                        <p>Identity</p>
                        <p>Email</p>
                        <p>Phone number</p>
                    </div>
                </div>

                <div className='mt-10 max-w-[40rem] ml-5'>
                    <div className="flex mb-5">
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
            
                </div>
            </div>
        </div>


        </main>
    </div>
  )
}

export default AccountSettings

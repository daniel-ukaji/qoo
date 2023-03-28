import React, { useEffect, useState } from 'react'
import HostHeader from '../components/misc/hostHeader'
import Image from 'next/image';
import AvatarProfile from '../public/images/AvatarProfile.png'
import { useAuth } from '../utils/hooks/useAuth';

function AccountSettings() {
    const [activeTab, setActiveTab] = useState('listing');

    const user = useAuth();

    // console.log(user.user)

    function PersonalInfo() {
        return (
            <section className='max-w-[40rem]'>
                    <div className='mt-10 border-b'>
                        <div className='flex justify-between'>
                            <p className='font-bold mb-3'>Full name</p>
                            <button className='font-bold'>Edit</button>
                        </div>
                        <p className='mb-5'>{user.user?.userFirstName} {user.user?.userLastName}</p>
                    </div>
                    <div className='mt-10 border-b'>
                        <div className='flex justify-between'>
                            <p className='font-bold mb-3'>Email</p>
                            <button className='font-bold'>Edit</button>
                        </div>
                        <p className='mb-5'>{user.user?.userEmail}</p>
                    </div>
                    <div className='mt-10 border-b'>
                        <div className='flex justify-between'>
                            <p className='font-bold mb-3'>Address</p>
                            <button className='font-bold'>Edit</button>
                        </div>
                        <p className='mb-5'>221 street Lagos</p>
                    </div>
                    <div className='mt-10 border-b'>
                        <div className='flex justify-between'>
                            <p className='font-bold mb-3'>Government Id</p>
                            <button className='font-bold'>Edit</button>
                        </div>
                        <p className='mb-5'>Not provided yet</p>
                    </div>
                </section>
            )
        }

    function Login(){
        return (
            <section className='max-w-[40rem]'>
                <div className=''>
                    <h1 className='font-bold mt-10 text-xl'>Login</h1>

                    <section className='max-w-[40rem]'>
                        <div className='mt-10 border-b'>
                            <div className='flex justify-between'>
                                <p className='font-bold mb-3'>Password</p>
                                <button className='font-bold'>Update</button>
                            </div>
                            <p className='mb-5'>Last updated 1 month ago</p>
                        </div>
                        <div className='mt-10 border-b'>
                            <h1 className='mb-10 font-bold text-xl'>Socials</h1>

                            <div className='flex justify-between'>
                                <p className='font-bold mb-3'>Instagram</p>
                                <button className='font-bold'>Connect</button>
                            </div>
                            <p className='mb-5'>Lota Okeke</p>
                        </div>
                        <div className='mt-10 border-b'>
                            <div className='flex justify-between'>
                                <p className='font-bold mb-3'>Twitter</p>
                                <button className='font-bold'>Connect</button>
                            </div>
                            <p className='mb-5'>lota.okeke@gmail.com</p>
                        </div>
                        <div className='mt-10 border-b'>
                            <div className='flex justify-between'>
                                <p className='font-bold mb-3'>Facebook</p>
                                <button className='font-bold'>Connect</button>
                            </div>
                            <p className='mb-5'>221 street Lagos</p>
                        </div>
                    </section>
                </div>

            </section>
        )
    }

    function Notification() {
        return (
            <div className='max-w-[40rem]'>
                <section className='max-w-[40rem]'>
                    <div className='mt-10 border-b'>
                        <div className='flex justify-between'>
                            <p className='font-bold mb-3'>Email notification</p>
                            <button className='font-bold'>Enable/Disable</button>
                        </div>
                        <p className='mb-5'>We would like to notify you of your activities on Qoospayce</p>
                    </div>
                    <div className='mt-10 border-b'>
                        <div className='flex justify-between'>
                            <p className='font-bold mb-3'>Push notification</p>
                            <button className='font-bold'>Enable/Disable</button>
                        </div>
                        <p className='mb-5'>We would like to notify you of your activities on Qoospayce</p>
                    </div>
                </section>
            </div>
        )
    }

    useEffect(() => {
        setActiveTab(tabs[0].id);
      }, []);


    const tabs = [
        { id: 'personalinfo', label: 'Personal Info' },
        {id: 'login', label: 'Login & Security'},
        {id: 'notification', label: 'Notification'},
      ];


  return (
    <div className='font-sora'>
        <HostHeader />
        <main className='max-w-[66rem] w-full mx-auto mt-10'>
            <div>
                <h1 className='font-bold text-2xl'>Account Settings</h1>
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
                    {activeTab === 'notification' && <Notification /> }
            
                </div>
            </div>
        </div>


        </main>
    </div>
  )
}

export default AccountSettings
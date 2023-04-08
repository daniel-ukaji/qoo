import { useState, useEffect } from "react";
import { useAuth } from "../utils/hooks/useAuth";
import { useApi } from "../utils/hooks/useApi";
import { updateProfile } from "../utils/api/user/updateUser";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AccountTest() {
    const user = useAuth();

  const [personalInfo, setPersonalInfo] = useState({});
  const [documentInfo, setDocumentInfo] = useState({});
  const [activeTab, setActiveTab] = useState("personal");
  const [userData, setUserData] = useState({
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userDateOfBirth: new Date(),
    userPhoneNumber: '',
    userCountry: '',
    userState: '',
    userCity: '',
    userStreet: '',
    userIdentityNumber: '',
    userPicture: null,
    userIdentityImage: '9870',
  });

  const API_ENDPOINT = 'https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev/user/read-by-user-id';

    const userId = user.user?.userId;

    const requestBody = {
        userId: userId
      };

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

  return (
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
  );
}

export default AccountTest;

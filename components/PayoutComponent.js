import Image from "next/image";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import logo from "/public/images/qoo_logo.png";
import { BsFacebook } from "react-icons/bs";
import { ImAppleinc } from "react-icons/im";
import { useApi } from "../utils/hooks/useApi";
import { login } from "../utils/api/auth/login";
import { AuthLevelContext } from "../utils/context/AuthLevelContext";
import Load from "./Load";
import { useAuth } from "../utils/hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ModalComponent from "./ModalComponent";
import { countries } from "../countries";
import { addPayout } from "../utils/api/payment/addPayout";



const PayoutComponent = ({ onClick }) => {
  const authLevel = useContext(AuthLevelContext);

  const user = useAuth();
    console.log(user.user)

    const userIds = user.user?.userId;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setchecked] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const router = useRouter();


  const addPayoutApi = useApi(addPayout);

  const onSubmit = async () => {
    
      let req = {
        userId: userIds,
        userPayoutBankName: bankName,
        userPayoutAccountName: accountName,
        userPayoutAccountNumber: accountNumber,
        userPayoutBillingCountry: billingCountry,
      };

      let id = toast.loading("Please wait while we update your payout account");

      const response = await addPayoutApi.request(req);

      console.log(response)

      toast.update(id, {
        type: response.data.responseCode !== "00" ? "error" : "success",
        render: response.data.responseMessage,
        isLoading: addPayoutApi.loading,
        autoClose: true,
        onClick: () => !addPayoutApi.errorMessage && toast.dismiss(),
      });

      if (response.data.responseCode === "00") {
        onClick(); // close the modal
      }
      
    
  };

  return (
    <div className="relative p-6 bg-white rounded-2xl">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-12 h-12">
          <Image src={logo} className="absolute w-full h-full" />
        </div>
        <h1 className="mt-3 text-lg font-semibold text-secondary">
          Add payout account
        </h1>
      </div>
      <button
        onClick={onClick}
        className="absolute flex items-center justify-center bg-gray-100 rounded-full top-6 right-6 w-7 h-7"
      >
        <MdClose className="w-4 h-4 font-bold text-black" />
      </button>

      <div className="flex flex-col items-center justify-center px-3 mt-9">
        {addPayoutApi.errorMessage && (
          <p className="mb-1 text-xs font-semibold text-red-500">
            {addPayoutApi.errorMessage}
          </p>
        )}
        <div className="flex flex-col justify-center items-center space-y-6">
          <input
            type="text"
            name="accountName"
            id="accountName"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="touch-auto rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Enter account name"
          />
          <input
            type="text"
            name="bankName"
            id="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="touch-auto	rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Enter bank name"
          />
          <select
            name="billingCountry"
            id="billingCountry"
            value={billingCountry}
            onChange={(e) => setBillingCountry(e.target.value)}
            className="touch-auto cursor-pointer rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            >
            <option value="">Select Billing Country</option>
            {countries.map((country, index) => (
                <option key={index} value={country}>
                {country}
                </option>
            ))}
          </select>
          <input
            type="text"
            name="accountNumber"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="touch-auto	rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Enter account number"
          />

          {addPayoutApi.loading ? (
            <div className="flex items-center justify-center">
              <Load />
            </div>
          ) : (
            <button
              type="text"
              name=""
              id=""
              className="rounded-lg px-4 bg-primary text-white text-center py-3 outline-none h-14 border border-gray-w00 w-[18.375rem] xl:w-[28.063rem]"
              onClick={onSubmit}
            >
              Proceed
            </button>
          )}
          
        </div>

      </div>
      
    </div>
  );
};

export default PayoutComponent;

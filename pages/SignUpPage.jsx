import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import logo from "../public/images/qoo_logo.png";
import { BsFacebook } from "react-icons/bs";
import { ImAppleinc } from "react-icons/im";
import { toast } from "react-toastify";
import ModalComponent from "../components/ModalComponent";
import LoginModal from "../components/LoginModal";
import OtpModal from "../components/OtpModal";
import ForgotPasswordComponent from "../components/ForgotPasswordComponent";
import ForgotOtpModal from "../components/ForgotOtpModal";
import ResetSuccess from "../components/ResetSuccess";

import Loader from "../components/Loader";
import { initialEnrollment } from "../utils/api/auth/initialEnrolment";
import { AuthLevelContext } from "../utils/context/AuthLevelContext.js";
import Navi from "../components/misc/Navi";


import { useApi } from "../utils/hooks/useApi";
import Load from "../components/Load";
import Head from "next/head";

const SignUpComponent = () => {
  const authLevel = useContext(AuthLevelContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [checked, setchecked] = useState(false);

  const inititialEnrolApi = useApi(initialEnrollment);

  let phoneNumber = "090" + Math.floor(100000000 + Math.random() * 900000000);
  let countryCode = "234";
  let source = "WEB";
  let country = "Nigeria";

  useEffect(() => {
    validatePassword();
  }, [password, confirmPassword]);

  const validatePassword = () => {
    if (password.length && confirmPassword.length) {
      if (password == confirmPassword) {
        setPasswordMatch(true);
        seterrorMessage("");
      } else {
        setPasswordMatch(false);
        seterrorMessage("Passwords do not match");
      }
    } else {
      seterrorMessage("");
    }
  };

  const onSubmit = async () => {
    seterrorMessage("");
    if (!passwordMatch) {
      seterrorMessage("Passwords do not match");
      return;
    }

    const enrollmentData = {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userCountryCode: countryCode,
      country,
      userPhone: phoneNumber,
      source,
    };

    // let id = toast.loading("Please wait whiles we complete your request");

    const response = await inititialEnrolApi.request(enrollmentData);

    // toast.update(id, {
    //   type: response.data.responseCode !== "00" ? "error" : "success",
    //   render: response.data.responseMessage,
    //   isLoading: inititialEnrolApi.loading,
    //   autoClose: true,
    //   onClick: () => !completeRegError && toast.dismiss(),
    // });

    if (response.data.responseCode !== "00") return;

    if (response.data.responseCode === "00") {
      authLevel.setModalVisible(true);
      authLevel.setModalType("OTP");
      authLevel.setEmail(email);
      authLevel.setPassword(password);
    }
  };

  return (
    <div className="relative p-6 bg-white rounded-2xl">
      <Head>
        <title>QuooSpace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden">
        <Navi />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-12 h-12">
          <Image src={logo} className="absolute w-full h-full" />
        </div>
        <h1 className="mt-3 text-lg font-semibold text-secondary">
          Create your Qoospace account{" "}
        </h1>
      </div>
      {/* <button
        onClick={() => authLevel.setModalVisible(false)}
        className="absolute flex items-center justify-center bg-gray-100 rounded-full top-6 right-6 w-7 h-7"
      >
        <MdClose className="w-4 h-4 font-bold text-black" />
      </button> */}

      <div className="flex flex-col items-center justify-center px-3 mt-9">
        <div className="flex flex-col justify-center items-center space-y-6">
          <div className="flex flex-col xl:flex-row space-y-6 xl:space-y-0 space-x-0 xl:space-x-4 items-center justify-between">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[13.375rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
              placeholder="First name"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[13.375rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
              placeholder="Last name"
            />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Email address"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Enter password"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-200 w-[18.375rem] xl:w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm focus:border-primary focus:border-2;"
            placeholder="Confirm password"
          />

          {errorMessage && (
            <p className="text-xs font-semibold text-red-500">{errorMessage}</p>
          )}

          <div className="text-[#68717F] text-xs font-normal flex items-center space-x-2">
            <input
              type="checkbox"
              name="checked"
              id="checked"
              value={checked}
              onChange={(e) => setchecked(!checked)}
              className="mr-2 border border-gray-900 border-opacity-10 accent-primary"
            />
            I agree to Qoospace’s Terms of Use & Privacy Policy
          </div>

          {inititialEnrolApi.loading ? (
            <div className="flex items-center justify-center">
              <Load />
            </div>
          ) : (
            <button
              type="text"
              name=""
              id=""
              onClick={onSubmit}
              disabled={
                !checked ||
                !firstName.length ||
                !lastName.length ||
                !email.length ||
                !password.length ||
                !confirmPassword.length
              }
              className="rounded-lg px-4 bg-primary text-white text-center py-3 outline-none h-14 border border-gray-w00 w-[18.375rem] xl:w-[28.063rem]"
            >
              Create account
            </button>
          )}
        </div>
        <div className="text-sm font-normal mt-6 text-[#68717F]">
          Already have an account?{" "}
          <span className="text-primary">
            <button onClick={() => {
        authLevel.setModalVisible(true);
        authLevel.setModalType("LOGIN");
      }}>
              Log in
            </button>
          </span>
        </div>

        <div className="flex flex-col mt-8 mb-3 space-y-2">
          <button
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 flex items-center justify-center bg-white space-x-4 text-center py-3 outline-none h-14 border border-gray-w00 w-[18.375rem] xl:w-[28.063rem]"
          >
            <FcGoogle className="w-6 h-6" />
            <h1 className="text-sm font-normal">Continue with Google</h1>
          </button>

          <button
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 flex items-center justify-center space-x-4 text-center py-3 outline-none h-14 border border-gray-w00 w-[18.375rem] xl:w-[28.063rem] bg-[#1877F2]"
          >
            <BsFacebook className="w-6 h-6 text-white" />
            <h1 className="text-sm font-normal text-white">
              Sign in with Facebook
            </h1>
          </button>

          <button
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 flex items-center justify-center bg-black space-x-4 text-center py-3 outline-none h-14 border border-gray-w00 w-[18.375rem] xl:w-[28.063rem]"
          >
            <ImAppleinc className="w-6 h-6 text-white" />
            <h1 className="text-sm font-normal text-white">
              Sign in with Apple
            </h1>
          </button>
        </div>
      </div>


      <ModalComponent
        isVisible={authLevel.modalVisible}
        shouldBeBlurAndDarkened
        shouldBeCentered
        onClose={() => authLevel.setModalVisible(false)}
      >
        {authLevel.modalType === "LOGIN" ? (
          <LoginModal />
        ) : authLevel.modalType === "REGISTER" ? (
          <SignUpComponent />
        ) : authLevel.modalType === "OTP" ? (
          <OtpModal />
        ) : authLevel.modalType === "FORGOT" ? (
          <ForgotPasswordComponent />
        ) : authLevel.modalType === "OTPRESET" ? (
          <ForgotOtpModal />
        ) : authLevel.modalType === "SUCCESS" ? (
          <ResetSuccess />
        ) : null}
      </ModalComponent>
    </div>
  );
};

export default SignUpComponent;

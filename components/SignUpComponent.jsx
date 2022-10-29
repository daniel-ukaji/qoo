import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import logo from "/public/images/qoo_logo.png";
import { BsFacebook } from "react-icons/bs";
import { ImAppleinc } from "react-icons/im";
import Loader from "../components/Loader";
import { initialEnrollment } from "../utils/api/auth/initialEnrolment";
import { AuthLevelContext } from "../utils/context/AuthLevelContext.js";

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
  const [loading, setLoading] = useState(false);

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
      firstName,
      lastName,
      email,
      countryCode,
      country,
      phone: phoneNumber,
      source,
    };

    setLoading(true);

    let response = await initialEnrollment(enrollmentData);

    setLoading(false);
    console.log("response", response);
    if (response.status === 200) {
      if (response.data.responseCode === "00") {
        authLevel.setModalType("OTP");
        authLevel.setEmail(email);
      }
    } else {
      seterrorMessage("Oops! something happened");
    }
  };

  console.log("passwordMatch", passwordMatch);

  return (
    <div className="relative p-6 overflow-scroll bg-white rounded-2xl">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-12 h-12">
          <Image src={logo} className="absolute w-full h-full" />
        </div>
        <h1 className="mt-3 text-lg font-semibold text-secondary">
          Create your Qoospace account{" "}
        </h1>
      </div>
      <button
        onClick={() => authLevel.setModalVisible(false)}
        className="absolute flex items-center justify-center bg-gray-100 rounded-full top-6 right-6 w-7 h-7"
      >
        <MdClose className="w-4 h-4 font-bold text-black" />
      </button>

      <div className="flex flex-col items-center justify-center px-3 mt-9">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="inputbox"
              placeholder="First name"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              className="inputbox"
              placeholder="Last name"
            />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputbox-full"
            placeholder="Email address"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputbox-full"
            placeholder="Enter password"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="inputbox-full"
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

          {loading ? (
            <div className="flex items-center justify-center">
              <Loader />
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
              className="rounded-lg px-4 bg-primary text-white text-center py-3 outline-none h-14 border border-gray-w00 w-[28.063rem]"
            >
              Create account
            </button>
          )}
        </div>
        <div className="text-sm font-normal mt-6 text-[#68717F]">
          Already have an account?
          <span className="text-primary">
            <button onClick={() => authLevel.setModalType("LOGIN")}>
              Log in
            </button>
          </span>
        </div>

        <div className="flex flex-col mt-8 mb-3 space-y-2">
          <button
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 flex items-center justify-center bg-white space-x-4 text-center py-3 outline-none h-14 border border-gray-300 w-[28.063rem]"
          >
            <FcGoogle className="w-6 h-6" />
            <h1 className="text-sm font-normal">Continue with Google</h1>
          </button>

          <button
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 flex items-center justify-center space-x-4 text-center py-3 outline-none h-14 border  w-[28.063rem] bg-[#1877F2]"
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
            className="rounded-lg px-4 flex items-center justify-center bg-black space-x-4 text-center py-3 outline-none h-14  w-[28.063rem]"
          >
            <ImAppleinc className="w-6 h-6 text-white" />
            <h1 className="text-sm font-normal text-white">
              Sign in with Apple
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;

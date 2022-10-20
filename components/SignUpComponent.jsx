import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import logo from "/public/images/qoo_logo.png";
import { BsFacebook } from "react-icons/bs";
import { ImAppleinc } from "react-icons/im";

const SignUpComponent = ({ onClick, onChange }) => {
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
        onClick={onClick}
        className="absolute flex items-center justify-center bg-gray-100 rounded-full top-6 right-6 w-7 h-7"
      >
        <MdClose className="w-4 h-4 font-bold text-black" />
      </button>

      <div className="flex flex-col items-center justify-center px-3 mt-9">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <input
              type="text"
              name=""
              id=""
              className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-w00 w-[13.375rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm"
              placeholder="First name"
            />
            <input
              type="text"
              name=""
              id=""
              className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-w00 w-[13.375rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm"
              placeholder="Last name"
            />
          </div>
          <input
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-w00 w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm"
            placeholder="Email address"
          />
          <input
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-w00 w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm"
            placeholder="Enter password"
          />
          <input
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 py-3 outline-none h-12 border border-gray-w00 w-[28.063rem] placeholder:text-secondary placeholder:text-opacity-40 text-sm"
            placeholder="Confirm password"
          />

          <div className="text-[#68717F] text-xs font-normal flex items-center space-x-2">
            <input
              type="checkbox"
              name=""
              id=""
              className="mr-2 border border-gray-900 border-opacity-10 checked:bg-primary"
            />
            I agree to Qoospace’s Terms of Use & Privacy Policy
          </div>

          <button
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 bg-primary text-white text-center py-3 outline-none h-14 border border-gray-w00 w-[28.063rem]"
          >
            Create account
          </button>
        </div>
        <div className="text-sm font-normal mt-6 text-[#68717F]">
          Already have an account?{" "}
          <span className="text-primary">
            <button onClick={onChange}> Log in</button>
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

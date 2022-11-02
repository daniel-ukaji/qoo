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
import Loader from "./Loader";
import { useAuth } from "../utils/hooks/useAuth";
import { toast } from "react-toastify";

const LoginModal = () => {
  const authLevel = useContext(AuthLevelContext);
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginApi = useApi(login);

  const onSubmit = async () => {
    if (email.length && password.length) {
      let req = {
        username: email,
        password,
      };

      let id = toast.loading("Please wait whiles we complete your request");

      const response = await loginApi.request(req);

      toast.update(id, {
        type: response.data.responseCode !== "00" ? "error" : "success",
        render: response.data.responseMessage,
        isLoading: loginApi.loading,
        autoClose: true,
        onClick: () => !loginApi.errorMessage && toast.dismiss(),
      });

      if (response.data && response.data.responseCode === "00") {
        let unusualResponseString = response.data.token;
        let token = unusualResponseString.slice(7).trim();
        auth.logIn(token);
        authLevel.setModalVisible(false);
        authLevel.setModalType("NONE");
      }
    }
  };

  return (
    <div className="relative p-6 bg-white rounded-2xl">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-12 h-12">
          <Image src={logo} className="absolute w-full h-full" />
        </div>
        <h1 className="mt-3 text-lg font-semibold text-secondary">
          Log in to your Qoospace account
        </h1>
      </div>
      <button
        onClick={() => authLevel.setModalVisible(false)}
        className="absolute flex items-center justify-center bg-gray-100 rounded-full top-6 right-6 w-7 h-7"
      >
        <MdClose className="w-4 h-4 font-bold text-black" />
      </button>

      <div className="flex flex-col items-center justify-center px-3 mt-9">
        {loginApi.errorMessage && (
          <p className="mb-1 text-xs font-semibold text-red-500">
            {loginApi.errorMessage}
          </p>
        )}
        <div className="flex flex-col space-y-6">
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

          {loginApi.loading ? (
            <div className="flex items-center justify-center">
              <Loader fill_color="fill-primary" />
            </div>
          ) : (
            <button
              type="text"
              name=""
              id=""
              className="rounded-lg px-4 bg-primary text-white text-center py-3 outline-none h-14 border border-gray-w00 w-[28.063rem]"
              onClick={onSubmit}
            >
              Login
            </button>
          )}
        </div>
        <div className="text-sm font-normal mt-6 text-[#68717F]">
          Don’t have an account?{" "}
          <span className="text-primary">
            <button onClick={() => authLevel.setModalType("REGISTER")}>
              Sign up
            </button>
          </span>
        </div>

        <div className="flex flex-col mt-8 mb-6 space-y-2">
          <button
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 flex items-center justify-center bg-white space-x-4 text-center py-3 outline-none h-14 border border-gray-w00 w-[28.063rem]"
          >
            <FcGoogle className="w-6 h-6" />
            <h1 className="text-sm font-normal">Continue with Google</h1>
          </button>

          <button
            type="text"
            name=""
            id=""
            className="rounded-lg px-4 flex items-center justify-center space-x-4 text-center py-3 outline-none h-14 border border-gray-w00 w-[28.063rem] bg-[#1877F2]"
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
            className="rounded-lg px-4 flex items-center justify-center bg-black space-x-4 text-center py-3 outline-none h-14 border border-gray-w00 w-[28.063rem]"
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

export default LoginModal;

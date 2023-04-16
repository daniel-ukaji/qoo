import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthLevelContext } from "../utils/context/AuthLevelContext";
import OtpInput from "../components/misc/OtpInput";
import { useApi } from "../utils/hooks/useApi";
import { resendOtp as ResendOtpFunc } from "../utils/api/auth/resendOtp";
import { completeErrollment } from "../utils/api/auth/completeErollment";
import { completePasswordReset } from "../utils/api/auth/completePasswordReset";

import Head from "next/head";

const ForgotOtpModal = () => {
  const authLevel = useContext(AuthLevelContext);

  const splittedMail = authLevel.email.split("@");
  let halved = splittedMail[0];
  let halvedValue = halved.slice(0, halved.length / 2);
  let hashedValue = `${halvedValue}****@${splittedMail[1]}`;

  const {
    error: resendError,
    loading: resendLoading,
    request,
    errorMessage: resendOtpErrorMessage,
  } = useApi(ResendOtpFunc);

  const {
    error: completeRegError,
    loading: completeRegLoading,
    request: completeReqRequest,
    errorMessage: completeRegErrorMessage,
  } = useApi(completePasswordReset);

  const [otpValue, setOtpValue] = useState("");

  useEffect(() => {
    if (otpValue.length === 6) {
      handleSubmit();
    }
  }, [otpValue]);

  const handleSubmit = async () => {
    if (otpValue.length === 6) {
      let id = toast.loading("Please wait while we complete your password change");
      let requestData = {
        userOtp: otpValue,
        username: authLevel.email,
        userPassword: authLevel.password,
        userPasswordConfirmation: authLevel.password,
        countryCode: "234",
      };

      const response = await completeReqRequest(requestData);
      console.log("response", response);

      toast.update(id, {
        type: response.data.responseCode !== "00" ? "error" : "success",
        render: response.data.responseMessage,
        isLoading: completeRegLoading,
        autoClose: true,
        onClick: () => toast.dismiss(),
      });

      setOtpValue("");
      if (response.data.responseCode === "00") authLevel.setModalType("SUCCESS");
    }
  };

  const onClickResend = async () => {
    let id = toast.loading("Please wait whiles we send the otp!");

    let countryCode = "234";
    let username = authLevel.email;

    let requestData = {
      countryCode,
      username,
    };

    const response = await request(requestData);

    toast.update(id, {
      type: response.data.responseCode !== "00" ? "error" : "success",
      render: response.data.responseMessage,
      isLoading: resendLoading,
      autoClose: true,
      onClick: () => !resendLoading && toast.dismiss(),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 bg-white rounded-lg font-sora">
      <Head>
        <title>QuooSpace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="mt-6 text-xl font-bold text-secondary">Verify your email</p>

      <p className=" mt-3 text-sm xl:text-base font-normal text-gray-500">
        We've sent a code to {hashedValue}
      </p>

      {completeRegError && (
        <p className="mt-3 text-xs text-red-600">{completeRegErrorMessage}</p>
      )}

      {resendError && (
        <p className="mt-3 text-xs text-red-600">{resendOtpErrorMessage}</p>
      )}

      <div className="flex flex-col items-center justify-center">
        <OtpInput
          autoFocus
          isNumberInput
          inputLength={6}
          onChangeOtp={(otp) => setOtpValue(otp)}
        />
        <p className="mt-4 text-xs font-normal text-center text-gray-500">
          Didn't get a code?{" "}
          <button onClick={onClickResend} className="text-primary">
            click to resend
          </button>
        </p>
      </div>
      <div className="flex items-center justify-center w-full mt-16">
        <button
          disabled={otpValue.length !== 6}
          onClick={handleSubmit}
          className="rounded-xl w-[12rem] xl:w-[27.375rem] h-[3.125rem] text-center bg-primary text-white text-sm"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default ForgotOtpModal;

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthLevelContext } from "../utils/context/AuthLevelContext";
import OtpInput from "../components/misc/OtpInput";
import { useApi } from "../utils/hooks/useApi";
import { resendOtp as ResendOtpFunc } from "../utils/api/auth/resendOtp";
import { completeErrollment } from "../utils/api/auth/completeErollment";

const OtpModal = () => {
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
  } = useApi(completeErrollment);

  const [otpValue, setOtpValue] = useState("");

  useEffect(() => {
    if (otpValue.length === 6) {
      handleSubmit();
    }
  }, [otpValue]);

  const handleSubmit = async () => {
    if (otpValue.length === 6) {
      let id = toast.loading("Please wait whiles we complete your request");
      let requestData = {
        userOtp: otpValue,
        userEmail: authLevel.email,
        userPassword: authLevel.password,
        userConfirmPassword: authLevel.password,
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
      if (response.data.responseCode === "00") authLevel.setModalType("LOGIN");
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
      <p className="mt-6 text-xl font-bold text-secondary">Verify your email</p>

      <p className="mt-3 text-base font-normal text-gray-500">
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
          className="rounded-xl w-[27.375rem] h-[3.125rem] text-center bg-primary text-white text-sm"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpModal;

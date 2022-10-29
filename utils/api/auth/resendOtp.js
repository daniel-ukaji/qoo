import { RESEND_OTP } from "../API_URL";
import apiClient from "../apiClient";

export const resendOtp = (otpData) => apiClient.post(`/${RESEND_OTP}`, otpData);

import apiClient from "../apiClient";
import { VERIFYPAYMENT } from "../API_URL";

export const getPaymentStatus = (logReq) => apiClient.post(`/${VERIFYPAYMENT}`, logReq);


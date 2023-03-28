import { CREATEPAYMENT } from "../API_URL";
import apiClient from "../apiClient";

export const createpayment = (logReq) => apiClient.post(`/${CREATEPAYMENT}`, logReq);

import { CREATEPROPERTY } from "../API_URL";
import apiClient from "../apiClient";

export const createproperty = (logReq) => apiClient.post(`/${CREATEPROPERTY}`, logReq);

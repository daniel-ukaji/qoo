import { VERIFYPROFILE } from "../API_URL";
import apiClient from "../apiClient";

export const verifyuser = (logReq) => apiClient.post(`/${VERIFYPROFILE}`, logReq);

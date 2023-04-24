import { ADDPAYOUT } from "../API_URL";
import apiClient from "../apiClient";

export const addPayout = (logReq) => apiClient.post(`/${ADDPAYOUT}`, logReq);

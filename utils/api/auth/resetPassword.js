import { PASSWORD_RESET } from "../API_URL";
import apiClient from "../apiClient";

export const resetPassword = (logReq) => apiClient.post(`/${PASSWORD_RESET}`, logReq);

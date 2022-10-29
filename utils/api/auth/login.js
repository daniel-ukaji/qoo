import { LOGIN } from "../API_URL";
import apiClient from "../apiClient";

export const login = (logReq) => apiClient.post(`/${LOGIN}`, logReq);

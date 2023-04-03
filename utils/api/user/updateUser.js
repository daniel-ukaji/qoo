import { UPDATEPROFILE } from "../API_URL";
import apiClient from "../apiClient";

export const updateProfile = (log) => apiClient.put(`/${UPDATEPROFILE}`, log);

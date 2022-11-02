import apiClient from "../apiClient";
import { ME } from "../API_URL";

export const getUserProfile = () => apiClient.get(`/${ME}`);

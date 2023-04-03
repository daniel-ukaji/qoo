import apiClient from "../apiClient";
import { READBYUSERID } from "../API_URL";

export const readUser = (userId) =>
  apiClient.post(`/${READBYUSERID}`, userId);


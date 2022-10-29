import { ENROllMENT } from "../API_URL";
import apiClient from "../apiClient";

export const initialEnrollment = (enrollmentData) =>
  apiClient.post(`/${ENROllMENT}`, enrollmentData);

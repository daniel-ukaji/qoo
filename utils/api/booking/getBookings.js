import apiClient from "../apiClient";
import { GETBOOKINGS } from "../API_URL";

export const getBookings = () => apiClient.get(`/${GETBOOKINGS}`);

export const fetchbookings = async () => {
  let response = await getBookings();
  if (response.ok && response.data && response.data.responseCode === "00") {
    return response.data.data;
  }
  Promise.reject(
    response.data.responseMessage
      ? response.data.responseMessage
      : response.originalError
  );
};

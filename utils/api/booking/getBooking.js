import apiClient from "../apiClient";
import { GETBOOKING } from "../API_URL";

export const getBooking = (bookingId) =>
  apiClient.post(`/${GETBOOKING}`, {
    bookingId,
  });

export const fetchbooking = async (bookingId) => {
  let response = await getBooking(bookingId);
  if (response.ok && response.data && response.data.responseCode === "00") {
    return response.data.data;
  }
  Promise.reject(
    response.data.responseMessage
      ? response.data.responseMessage
      : response.originalError
  );
};

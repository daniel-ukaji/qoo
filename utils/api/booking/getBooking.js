import apiClient from "../apiClient";
import { GETBOOKING } from "../API_URL";

export const getBooking = (bookingRenterUserId) =>
  apiClient.post(`/${GETBOOKING}`, {
    bookingRenterUserId,
  });

export const fetchbooking = async (bookingRenterUserId) => {
  let response = await getBooking(bookingRenterUserId);
  if (response.ok && response.data && response.data.responseCode === "00") {
    return response.data.data;
  }
  Promise.reject(
    response.data.responseMessage
      ? response.data.responseMessage
      : response.originalError
  );
};

import apiClient from "../apiClient";
import { GETBOOKINGRENTER } from "../API_URL";

export const getBooking = (bookingRenterUserId) =>
  apiClient.post(`/${GETBOOKINGRENTER}`, {
    bookingRenterUserId,
  });

export const fetchBooking = async (bookingRenterUserId) => {
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

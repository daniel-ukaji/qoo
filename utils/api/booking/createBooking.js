import apiClient from "../apiClient";
import { CREATEBOOKINGS } from "../API_URL";
import { bookingData } from "../../../pages/book-property"



export const createBooking = (bookingData) =>
  apiClient.post(`/${CREATEBOOKINGS}`,bookingData);

export const fetchbooking = async (bookingData) => {
  let response = await createBooking(bookingData);
  if (response.ok && response.data && response.data.responseCode === "00") {
    return response.data.data;
  }
  Promise.reject(
    response.data.responseMessage
      ? response.data.responseMessage
      : response.originalError
  );
};

import apiClient from "../apiClient";
import { CREATEBOOKINGS } from "../API_URL";



export const createBooking = (bookingData) => apiClient.post(`/${CREATEBOOKINGS}`,bookingData);

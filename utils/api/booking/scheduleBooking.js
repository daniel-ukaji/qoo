import apiClient from "../apiClient";
import { SCHEDULEBOOKINGS } from "../API_URL";



export const scheduleBooking = (bookingData) => apiClient.post(`/${SCHEDULEBOOKINGS}`,bookingData);

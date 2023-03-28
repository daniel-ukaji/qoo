import { UPDATEPROPERTY } from "../API_URL";
import apiClient from "../apiClient";

export const updateProperty = (log) => apiClient.put(`/${UPDATEPROPERTY}`, log);

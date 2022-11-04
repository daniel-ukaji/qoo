import apiClient from "../apiClient";
import { GETPROPERTY } from "../API_URL";

export const getProperty = (propertyId) =>
  apiClient.post(`/${GETPROPERTY}`, {
    propertyId,
  });

export const fetchproperty = async (propertyId) => {
  let response = await getProperty(propertyId);
  if (response.ok && response.data && response.data.responseCode === "00") {
    return response.data.data;
  }
  Promise.reject(
    response.data.responseMessage
      ? response.data.responseMessage
      : response.originalError
  );
};

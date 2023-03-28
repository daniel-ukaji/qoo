import apiClient from "../apiClient";
import { EDITPROPERTYBYID } from "../API_URL";

export const getProperty = (propertyName) =>
  apiClient.post(`/${EDITPROPERTYBYID}`, {
    propertyName,
  });

export const fetcheditproperty = async (propertyName) => {
  let response = await getProperty(propertyName);
  if (response.ok && response.data && response.data.responseCode === "00") {
    return response.data.data;
  }
  Promise.reject(
    response.data.responseMessage
      ? response.data.responseMessage
      : response.originalError
  );
};

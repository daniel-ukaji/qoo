import apiClient from "../apiClient";
import { GETPROPETIES } from "../API_URL";

export const getProperties = () => apiClient.get(`/${GETPROPETIES}`);

export const fetchproperties = async () => {
  let response = await getProperties();
  if (response.ok && response.data && response.data.responseCode === "00") {
    return response.data.data;
  }
  Promise.reject(
    response.data.responseMessage
      ? response.data.responseMessage
      : response.originalError
  );
};

import apiClient from "../apiClient";
import { GETPROPERTYHOSTID } from "../API_URL";

export const getPropertyHostId = (propertyHostId) =>
  apiClient.post(`/${GETPROPERTYHOSTID}`, {
    propertyHostId,
  });

export const fetchpropertyHostId = async (propertyHostId) => {
  let response = await getPropertyHostId(propertyHostId);
  if (response.ok && response.data && response.data.responseCode === "00") {
    return response.data.data;
  }
  Promise.reject(
    response.data.responseMessage
      ? response.data.responseMessage
      : response.originalError
  );
};

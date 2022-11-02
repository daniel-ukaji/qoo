import { useState } from "react";

export const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const request = async (...args) => {
    setErrorMessage("");
    setError(false);
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      setData([]);
      setError(true);
      setErrorMessage(response.originalError);

      return Promise.reject(
        response.data.responseMessage
          ? response.data.responseMessage
          : "Oops! Something happened 🥲"
      );
    } else if (response.ok && response.data.responseCode != "00") {
      setError(true);

      setErrorMessage(
        response.data ? response.data.responseMessage : response.originalError
      );
      return response;
    } else if (response.ok && response.data.responseCode === "00") {
      setError(false);
      setErrorMessage("");
      setData(response.data.data ? response.data.data : []);
      return response;
    }
  };

  return { data, error, loading, request, errorMessage };
};

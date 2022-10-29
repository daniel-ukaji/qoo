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

    if (response.data.responseCode !== "00" || !response.ok) {
      setLoading(false);
      setError(true);
      setErrorMessage(
        response.data.responseMessage
          ? response.data.responseMessage
          : "Oops! Something happened 🥲"
      );

      return Promise.reject(
        response.data.responseMessage
          ? response.data.responseMessage
          : "Oops! Something happened 🥲"
      );
    } else {
      setLoading(false);
      setData(response.data.data ? response.data.data : []);
    }
    return response;
  };

  return { data, error, loading, request, errorMessage };
};

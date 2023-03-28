import { create } from "apisauce";
import storage from "../storage";

const apiClient = create({
  baseURL: "https://m2nz1o078e.execute-api.us-east-1.amazonaws.com/prod/",
});

apiClient.addAsyncRequestTransform(async (reqTransformer) => {
  const authToken = storage.getToken();
  if (!authToken) return;
  reqTransformer.headers["Authorization"] = `Bearer ${authToken} `;
});

export default apiClient;

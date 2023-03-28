import { create } from "apisauce";
import storage from "../storage";

const apiClient = create({
  baseURL: "https://6v50nb72wg.execute-api.us-east-1.amazonaws.com/dev",
});

apiClient.addAsyncRequestTransform(async (reqTransformer) => {
  const authToken = storage.getToken();
  if (!authToken) return;
  reqTransformer.headers["Authorization"] = `Bearer ${authToken} `;
});

export default apiClient;

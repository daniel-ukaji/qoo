import { create } from "apisauce";
import storage from "../storage";

const apiClient = create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

apiClient.addAsyncRequestTransform(async (reqTransformer) => {
  const authToken = storage.getToken();
  if (!authToken) return;
  reqTransformer.headers["Authorization"] = `Bearer ${authToken}`;
});

export default apiClient;

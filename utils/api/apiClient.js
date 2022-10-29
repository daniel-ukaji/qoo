import { create } from "apisauce";

const apiClient = create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

export default apiClient;

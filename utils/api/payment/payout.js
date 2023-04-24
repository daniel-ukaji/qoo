import { PAYOUT } from "../API_URL";
import apiClient from "../apiClient";

export const payout = (logReq) => apiClient.post(`/${PAYOUT}`, logReq);

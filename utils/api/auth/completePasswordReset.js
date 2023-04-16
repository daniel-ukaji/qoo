import { COMPLETE_PASSWORD_RESET } from "../API_URL";
import apiClient from "../apiClient";

export const completePasswordReset = (complere_reg_req) =>
  apiClient.post(`/${COMPLETE_PASSWORD_RESET}`, complere_reg_req);

import { COMPLETE_ENROLLMENT } from "../API_URL";
import apiClient from "../apiClient";

export const completeErrollment = (complere_reg_req) =>
  apiClient.post(`/${COMPLETE_ENROLLMENT}`, complere_reg_req);

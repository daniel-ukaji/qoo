import { IMAGEURL } from "../API_URL";
import apiImage from "../apiImage";

export const imageurl = (logReq) => apiImage.post(`/${IMAGEURL}`, logReq);

import Axios from "axios";
import { API_URL } from "../utils/constants";

export const getStatus = () => {
  return Axios.get(API_URL + "/status");
};

export const addStatus = (status) => {
  return Axios.post(API_URL + "/status", status);
};

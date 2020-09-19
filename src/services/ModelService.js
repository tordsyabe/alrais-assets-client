import Axios from "axios";
import { API_URL } from "../utils/constants";

export const getModels = () => {
  return Axios.get(API_URL + "/models");
};

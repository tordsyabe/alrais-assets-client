import Axios from "axios";
import { API_URL } from "../utils/constants";

export const getAssets = () => {
  return Axios.get(API_URL + "/assets");
};

export const addAsset = (asset) => {
  return Axios.post(API_URL + "/assets", asset);
};

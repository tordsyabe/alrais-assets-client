import { API_URL } from "./../utils/constants";
import Axios from "axios";

export const getLocations = () => {
  return Axios.get(API_URL + "/locations");
};

export const addLocation = (location) => {
  return Axios.post(API_URL + "/locations", location);
};

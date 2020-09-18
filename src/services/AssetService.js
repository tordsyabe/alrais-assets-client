import Axios from "axios";

export const getAssets = () => {
  return Axios.get("http://localhost:5000/api/v1/assets");
};

export const addAsset = (asset) => {
  return Axios.post("http://localhost:5000/api/v1/assets", asset);
};

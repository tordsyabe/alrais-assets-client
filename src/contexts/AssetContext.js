import React, { createContext, useState, useEffect } from "react";
import { getAssets } from "../services/AssetService";

export const AssetContext = createContext();

export default function AssetContextProvider(props) {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getAssets().then((response) => {
      setAssets(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <AssetContext.Provider value={{ assets }}>
      {props.children}
    </AssetContext.Provider>
  );
}

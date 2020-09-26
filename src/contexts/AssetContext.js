import React, { createContext, useEffect, useReducer } from "react";
import { assetReducer } from "../components/reducers/AssetReducer";
import { getAssets } from "../services/AssetService";
import { assetActionType } from "../utils/constants";

export const AssetContext = createContext();

export default function AssetContextProvider(props) {
  const [assets, dispatch] = useReducer(assetReducer, []);

  useEffect(() => {
    getAssets().then((response) => {
      dispatch({ type: assetActionType.SET_ASSETS, payload: response.data });
    });
  }, [assets]);

  return (
    <AssetContext.Provider value={{ assets, dispatch }}>
      {props.children}
    </AssetContext.Provider>
  );
}

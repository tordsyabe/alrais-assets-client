import React, { createContext, useEffect, useReducer } from "react";
import { statusReducer } from "../components/reducers/StatusReducer";
import { getStatus } from "../services/StatusService";
import { statusActionType } from "../utils/constants";

export const StatusContext = createContext();

export default function StatusContextProvider(props) {
  const [status, dispatch] = useReducer(statusReducer, []);

  useEffect(() => {
    getStatus().then((response) => {
      dispatch({ type: statusActionType.SET_STATUS, payload: response.data });
    });
  }, []);

  return (
    <StatusContext.Provider value={{ status, dispatch }}>
      {props.children}
    </StatusContext.Provider>
  );
}

import React, { createContext, useEffect, useReducer } from "react";
import { locationReducer } from "../components/reducers/LocationReducer";
import { getLocations } from "../services/LocationService";

export const LocationContext = createContext();

export default function LocationContextProvider(props) {
  const [locations, dispatch] = useReducer(locationReducer, []);

  useEffect(() => {
    getLocations().then((response) => {
      dispatch({ type: "SET_LOCATIONS", payload: response.data });
    });
  }, []);

  return (
    <LocationContext.Provider value={{ locations, dispatch }}>
      {props.children}
    </LocationContext.Provider>
  );
}

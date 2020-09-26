import React, { createContext, useState, useEffect } from "react";
import { getLocations } from "../services/LocationService";

export const LocationContext = createContext();

export default function LocationContextProvider(props) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then((response) => {
      setLocations(response.data);
    });
  }, []);

  return (
    <LocationContext.Provider value={{ locations }}>
      {props.children}
    </LocationContext.Provider>
  );
}

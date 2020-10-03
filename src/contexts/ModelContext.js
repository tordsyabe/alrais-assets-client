import React, { createContext, useState, useEffect } from "react";

import { getModels } from "../services/ModelService";

export const ModelContext = createContext();

export default function ModelContextProvider(props) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    getModels().then((response) => {
      setModels(response.data);
    });
  }, []);

  return (
    <ModelContext.Provider value={{ models }}>
      {props.children}
    </ModelContext.Provider>
  );
}

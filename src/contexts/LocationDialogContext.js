import React, { createContext, useState } from "react";

export const LocationDialogContext = createContext();

export default function LocationDialogContextProvider(props) {
  const [open, setOpen] = useState(false);

  const handleOpenLocationForm = () => {
    setOpen(true);
  };

  const handleCloseLocationForm = () => {
    setOpen(false);
  };

  return (
    <LocationDialogContext.Provider
      value={{ open, setOpen, handleOpenLocationForm, handleCloseLocationForm }}
    >
      {props.children}
    </LocationDialogContext.Provider>
  );
}

import React, { createContext, useState } from "react";

export const StatusDialogContext = createContext();

export default function StatusDialogContextProvider(props) {
  const [open, setOpen] = useState(false);

  const handleOpenStatusForm = () => {
    setOpen(true);
  };

  const handleCloseStatusForm = () => {
    setOpen(false);
  };

  return (
    <StatusDialogContext.Provider
      value={{ open, setOpen, handleOpenStatusForm, handleCloseStatusForm }}
    >
      {props.children}
    </StatusDialogContext.Provider>
  );
}

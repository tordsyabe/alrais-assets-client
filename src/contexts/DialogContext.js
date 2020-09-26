import React, { createContext, useState } from "react";

export const DialogContext = createContext();

export default function DialogContextProvider(props) {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{ open, setOpen, handleDialogOpen, handleDialogClose }}
    >
      {props.children}
    </DialogContext.Provider>
  );
}

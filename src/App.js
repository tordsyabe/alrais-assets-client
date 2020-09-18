import React, { useState, useEffect } from "react";
import "./App.css";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";

import { getAssets } from "./services/AssetService";
import Routes from "./Routes";

import { theme } from "./theme";

function App() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getAssets()
      .then((response) => {
        response.data.forEach((asset) => {
          setAssets(asset);
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container>
        <Routes />
      </Container>
    </ThemeProvider>
  );
}

export default App;

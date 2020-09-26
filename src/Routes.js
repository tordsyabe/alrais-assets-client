import React from "react";
import { Switch, Route } from "react-router-dom";
import AssetsPage from "./components/pages/AssetsPage";
import AssetForm from "./components/assets/AssetForm";
import Asset from "./components/assets/Asset";
import SideDrawer from "./components/ui/SideDrawer";
import AssetsContextProvider from "./contexts/AssetContext";
import ModelContextProvider from "./contexts/ModelContext";
import { Grid } from "@material-ui/core";
import DialogContextProvider from "./contexts/DialogContext";
import LocationContextProvider from "./contexts/LocationContext";

export default function Routes(props) {
  return (
    <React.Fragment>
      <AssetsContextProvider>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideDrawer />
          </Grid>
          <Grid item xs={11}>
            <Switch>
              <Route exact path='/assets' component={AssetsPage} />
              <ModelContextProvider>
                <LocationContextProvider>
                  <DialogContextProvider>
                    <Route exact path='/assets/new' component={AssetForm} />
                  </DialogContextProvider>
                </LocationContextProvider>
              </ModelContextProvider>
              <Route path='/assets/:id' component={Asset} />
            </Switch>
          </Grid>
        </Grid>
      </AssetsContextProvider>
    </React.Fragment>
  );
}

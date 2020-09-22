import React from "react";
import { Switch, Route } from "react-router-dom";
import AssetsPage from "./components/pages/AssetsPage";
import AssetForm from "./components/assets/AssetForm";
import Asset from "./components/assets/Asset";
import SideDrawer from "./components/ui/SideDrawer";

export default function Routes(props) {
  return (
    <React.Fragment>
      <SideDrawer />
      <Switch>
        <Route exact path="/assets" component={AssetsPage} />
        <Route exact path="/assets/new" component={AssetForm} />
        <Route path="/assets/:id" component={Asset} />
      </Switch>
    </React.Fragment>
  );
}

import React from "react";
import { Switch, Route } from "react-router-dom";
import AssetsPage from "./components/pages/AssetsPage";
import AssetForm from "./components/assets/AssetForm";
import Asset from "./components/assets/Asset";

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path='/assets' component={AssetsPage} />
      <Route exact path='/assets/new' component={AssetForm} />
      <Route path='/assets/:id' component={Asset} />
    </Switch>
  );
}

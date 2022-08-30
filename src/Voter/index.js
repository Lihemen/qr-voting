import React from "react";
import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom";

import { PrivateRoute } from "../components/PrivateRoute";
import { AdminRoute } from "../components/AdminRoute";

import Authenticate from "./Authenticate";
import Create from "./Create";
import Info from "./Info";
import VoterList from "./List";
import Vote from "./Vote";

export default function VoterRouter() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <AdminRoute path={path} exact component={Authenticate} />
      <AdminRoute path={`${path}/all`} component={VoterList} />
      <Route path={`${path}/create`} component={Create} />
      <Route path={`${path}/:id/vote`} exact component={Vote} />
      <PrivateRoute path={`${path}/:id`} component={Info} />
      <Redirect path="**" to="/login" />
    </Switch>
  );
}

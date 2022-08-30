import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
// import { PrivateRoute } from '../components/PrivateRoute';

import Create from './Create';
import Info from './Info';
import Registered from './Registered';

export default function PartyRouter() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact component={Registered} />
      <Route path={`${path}/create`} component={Create} />
      <Route path={`${path}/:partyId`} component={Info} />
    </Switch>
  );
}

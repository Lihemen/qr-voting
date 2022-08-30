import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from '../Dashboard';

import AllElections from './AllElections';
import Create from './Create';
import Results from './Results';
import Election from './Election';

export default function ElectionsRouter() {
  const { path } = useRouteMatch();
  return (
    <Dashboard>
      <Switch>
        <Route path={path} exact component={AllElections} />
        <Route path={`${path}/create`} component={Create} />
        <Route path={`${path}/results`} component={Results} />
        <Route path={`${path}/:electionId`} component={Election} />
        <Redirect path='**' to='/login' />
      </Switch>
    </Dashboard>
  );
}

import React from 'react';

import { Redirect, Route } from 'react-router-dom';

function AdminRoute({ component: Component, ...rest }) {
  const admin = JSON.parse(localStorage.getItem('admin'));
  return (
    <Route
      {...rest}
      render={(props) =>
        admin && admin.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export { AdminRoute };

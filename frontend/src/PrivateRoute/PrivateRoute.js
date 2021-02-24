import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export const WriterRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        (isAuthenticated && user.role === 'admin') || user.role === 'writer' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export const UserRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

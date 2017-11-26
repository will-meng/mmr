import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({component: Component, path, currentUser}) => (
  <Route path={path} render={(props) => (
    !currentUser ? (
      <Component {...props} />
    ) : (
      <Redirect to={`/user/${currentUser.id}/dashboard`} />
    )
  )}/>
);

const Protected = ({ component: Component, path, currentUser }) => (
  <Route path={path} render={(props) => (
    currentUser ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )} />
);

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
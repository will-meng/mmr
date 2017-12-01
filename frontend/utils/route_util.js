import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const authComp = (props, currentUser, Component) => (
  !currentUser ? (
    <Component {...props} />
  ) : (
    <Redirect to={`/user/${currentUser.id}/dashboard`} />
  )
);

const Auth = ({component: Component, path, currentUser}) => {
  return path === '/' ? (
      <Route path={path} render={props => 
        authComp(props, currentUser, Component)}
      />
    ) : (
      <Route exact path={path} render={props => 
        authComp(props, currentUser, Component)}
      />
    );
};

const Protected = ({ component: Component, path, currentUser }) => (
  <Route exact path={path} render={props => (
    currentUser ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
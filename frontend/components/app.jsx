import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

import SignupFormContainer from './session_forms/signup_form_container';
import LoginFormContainer from './session_forms/login_form_container';
import Splash from './splash/splash';
import RouteCreateContainer from './routes/route_create/route_create_container';
import RouteShowContainer from './routes/route_show/route_show_container';

const App = () => (
  <div>
    <NavBarContainer/>

    <section className='main'>
      <Switch>
        <AuthRoute path='/signup' component={SignupFormContainer}/>
        <AuthRoute path='/login' component={LoginFormContainer}/>
        <Route exact path='/' component={Splash}/>
        <ProtectedRoute path='/route/create' component={RouteCreateContainer}/>
        <ProtectedRoute path='/route/:routeId' component={RouteShowContainer}/>
      </Switch>
    </section>
  </div>
);

export default App;
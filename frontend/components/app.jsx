import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SignupFormContainer from './session_forms/signup_form_container';
import LoginFormContainer from './session_forms/login_form_container';
import Splash from './splash/splash';
import RouteCreateContainer from './routes/route_create_container';

const App = () => (
  <div>
    <NavBarContainer/>

    <section className='main'>
      <AuthRoute path='/signup' component={SignupFormContainer}/>
      <AuthRoute path='/login' component={LoginFormContainer}/>
      <Route exact path='/' component={Splash}/>
      <ProtectedRoute path='/route/create' component={RouteCreateContainer}/>
    </section>
  </div>
);

export default App;
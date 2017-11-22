import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../utils/route_util';
import SignupFormContainer from './session_forms/signup_form_container';
import LoginFormContainer from './session_forms/login_form_container';
import Splash from './splash/splash';

const App = () => (
  <div>
    <NavBarContainer/>
    
    <section className='main'>
      <AuthRoute path='/signup' component={SignupFormContainer}/>
      <AuthRoute path='/login' component={LoginFormContainer}/>
      <Route exact path='/' component={Splash}/>
    </section>
  </div>
);

export default App;
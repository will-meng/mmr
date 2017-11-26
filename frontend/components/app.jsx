import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

import SignupFormContainer from './session_forms/signup_form_container';
import LoginFormContainer from './session_forms/login_form_container';
import UserDashboard from './users/user_dashboard';
import RouteCreateContainer from './routes/route_create/route_create_container';
import RouteShowContainer from './routes/route_show/route_show_container';
import RouteIndexContainer from './routes/route_index/route_index_container';
import WorkoutFormContainer from './workouts/workout_form/workout_form_container';
import Splash from './splash/splash';

const App = () => (
  <div>
    <NavBarContainer/>

    <section className='main'>
      <Switch>
        <AuthRoute path='/signup' component={SignupFormContainer}/>
        <AuthRoute path='/login' component={LoginFormContainer}/>
        <Route path='/user/:userId/dashboard' component={RouteIndexContainer}/>
        <ProtectedRoute path='/route/edit/:routeId' component={RouteCreateContainer}/>
        <ProtectedRoute path='/route/create' component={RouteCreateContainer}/>
        <Route path='/route/:routeId' component={RouteShowContainer}/>
        <Route path='/routes' component={RouteIndexContainer}/>
        <ProtectedRoute path='/workout/edit/:workoutId' component={WorkoutFormContainer}/>
        <ProtectedRoute path='/workout/create' component={WorkoutFormContainer}/>
        {/* <Route path='/workout/:workoutId' component={WorkoutShowContainer}/>
        <Route path='/workouts' component={WorkoutIndexContainer}/> */}
        <AuthRoute path='/' component={Splash}/>
      </Switch>
    </section>
  </div>
);

export default App;
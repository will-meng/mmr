import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

import SignupFormContainer from './session_forms/signup_form_container';
import LoginFormContainer from './session_forms/login_form_container';
import RouteCreateContainer from './routes/route_create/route_create_container';
import RouteShowContainer from './routes/route_show/route_show_container';
import RouteIndexContainer from './routes/route_index/route_index_container';
import WorkoutFormContainer from './workouts/workout_form/workout_form_container';
import WorkoutShowContainer from './workouts/workout_show/workout_show_container';
import WorkoutIndexContainer from './workouts/workout_index/workout_index_container';
import FriendIndexContainer from './users/friend_index_container';
import Splash from './splash/splash';

const App = () => (
  <div>
    <NavBarContainer/>

    <section className='main'>
      <Switch>
        <AuthRoute path='/signup' component={SignupFormContainer}/>
        <AuthRoute path='/login' component={LoginFormContainer}/>
        <Route exact path='/user/:userId/dashboard' component={RouteIndexContainer}/>
        <ProtectedRoute path='/route/edit/:routeId' component={RouteCreateContainer}/>
        <ProtectedRoute path='/route/create' component={RouteCreateContainer}/>
        <Route exact path='/route/:routeId' component={RouteShowContainer}/>
        <Route exact path='/routes' component={RouteIndexContainer}/>
        <ProtectedRoute path='/workout/edit/:workoutId' component={WorkoutFormContainer}/>
        <ProtectedRoute path='/workout/create' component={WorkoutFormContainer}/>
        <ProtectedRoute path='/workout/:workoutId' component={WorkoutShowContainer}/>
        <ProtectedRoute path='/user/:userId/workouts' component={WorkoutIndexContainer}/>
        <ProtectedRoute path='/friends/search' component={FriendIndexContainer}/>
        <ProtectedRoute path='/friends' component={FriendIndexContainer}/>
        <AuthRoute path='/' component={Splash}/>
      </Switch>
    </section>
  </div>
);

export default App;
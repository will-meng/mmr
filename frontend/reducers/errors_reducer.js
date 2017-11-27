import { combineReducers } from 'redux';
import signupErrorsReducer from './signup_errors_reducer';
import loginErrorsReducer from './login_errors_reducer';
import routeErrorsReducer from './route_errors_reducer';
import workoutErrorsReducer from './workout_errors_reducer';

const errorsReducer = combineReducers({
  signup: signupErrorsReducer,
  login: loginErrorsReducer,
  route: routeErrorsReducer,
  workout: workoutErrorsReducer
});

export default errorsReducer;
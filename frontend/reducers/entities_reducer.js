import { combineReducers } from 'redux';
import routesReducer from './routes_reducer';
import workoutsReducer from './workouts_reducer';
import usersReducer from './users_reducer';
import commentsReducer from './comments_reducer';

const entitiesReducer = combineReducers({
  routes: routesReducer,
  workouts: workoutsReducer,
  users: usersReducer,
  comments: commentsReducer
});

export default entitiesReducer;
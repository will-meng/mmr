import { combineReducers } from 'redux';
import routesReducer from './routes_reducer';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
  routes: routesReducer,
  users: usersReducer
});

export default entitiesReducer;
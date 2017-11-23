import { 
  RECEIVE_ROUTES, 
  RECEIVE_ROUTE, 
  REMOVE_ROUTE 
} from '../actions/route_actions';
import merge from 'lodash/merge';

const routesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ROUTES:
      return action.routes;
    case RECEIVE_ROUTE:
      return merge({}, state, { [action.route.id]: action.route });
    case REMOVE_ROUTE:
      const newRoutes = merge({}, state);
      delete newRoutes[action.routeId];
      return newRoutes;
    default:
      return state;
  }
};

export default routesReducer;
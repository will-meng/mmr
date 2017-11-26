import { START_LOADING, STOP_LOADING } from '../actions/loading_actions';
import { RECEIVE_ROUTES, RECEIVE_ROUTE } from '../actions/route_actions';

const loadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case START_LOADING:
      return true;
    case STOP_LOADING:
    case RECEIVE_ROUTES:
    case RECEIVE_ROUTE:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
import { START_LOADING } from '../actions/loading_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { 
  RECEIVE_ROUTES, 
  RECEIVE_ROUTE,
  REMOVE_ROUTE,
  RECEIVE_ROUTE_ERRORS 
} from '../actions/route_actions';
import { 
  RECEIVE_WORKOUTS, 
  RECEIVE_WORKOUT,
  REMOVE_WORKOUT,
  RECEIVE_WORKOUT_ERRORS 
} from '../actions/workout_actions';
import { 
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
  RECEIVE_COMMENT_ERRORS 
} from '../actions/comment_actions';
import { RECEIVE_USERS } from '../actions/user_actions';

const loadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case START_LOADING:
      return true;
    case RECEIVE_ROUTES:
    case RECEIVE_ROUTE:
    case REMOVE_ROUTE:
    case RECEIVE_ROUTE_ERRORS:
    case RECEIVE_WORKOUTS:
    case RECEIVE_WORKOUT:
    case REMOVE_WORKOUT:
    case RECEIVE_WORKOUT_ERRORS:
    case RECEIVE_USERS:
    case RECEIVE_COMMENT:
    case REMOVE_COMMENT:
    case RECEIVE_COMMENT_ERRORS:
    case RECEIVE_CURRENT_USER:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
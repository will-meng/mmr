import { 
  RECEIVE_LOGIN_ERRORS, 
  RECEIVE_CURRENT_USER 
} from '../actions/session_actions';
import { REMOVE_ERRORS } from '../actions/error_actions';

const loginErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LOGIN_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    case REMOVE_ERRORS:
      return [];
    default:
      return state;
  }
};

export default loginErrorsReducer;
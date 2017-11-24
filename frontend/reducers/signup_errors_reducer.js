import { 
  RECEIVE_SIGNUP_ERRORS, 
  RECEIVE_CURRENT_USER 
} from '../actions/session_actions';
import { REMOVE_ERRORS } from '../actions/error_actions';

const signupErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SIGNUP_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    case REMOVE_ERRORS:
      return [];
    default:
      return state;
  }
};

export default signupErrorsReducer;
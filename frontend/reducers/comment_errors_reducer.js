import { RECEIVE_COMMENT_ERRORS, RECEIVE_COMMENT } from '../actions/comment_actions';
import { REMOVE_ERRORS } from '../actions/error_actions';

const commentErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case RECEIVE_COMMENT:
      return [];
    case REMOVE_ERRORS:
      return [];
    default:
      return state;
  }
};

export default commentErrorsReducer;
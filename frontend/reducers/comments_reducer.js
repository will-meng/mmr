import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_WORKOUT } from '../actions/workout_actions';
import merge from 'lodash/merge';

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT:
    case RECEIVE_WORKOUT:
      return merge({}, state, action.payload.comments);
    case REMOVE_COMMENT:
      const newComments = merge({}, state);
      delete newComments[Object.keys(action.payload.comments)[0]];
      return newComments;
    default:
      return state;
  }
};

export default commentsReducer;
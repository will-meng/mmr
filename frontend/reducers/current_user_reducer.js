import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS } from '../actions/user_actions';
import { RECEIVE_FRIENDSHIP } from '../actions/friendship_actions';
import merge from 'lodash/merge';

const currentUserReducer = (state = null, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.currentUser;
    case RECEIVE_USERS:
      return Object.assign(newState, action.payload.currentUser);
    case RECEIVE_FRIENDSHIP:
      return Object.assign(newState, action.currentUser);
    default:
      return state;
  }
};

export default currentUserReducer;
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS } from '../actions/user_actions';
import merge from 'lodash/merge';

const _nullSession = { currentUser: null };

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.currentUser };
    case RECEIVE_USERS:
      const newState = merge({}, state);
      newState.currentUser.searchResultIds = 
        action.payload.currentUser.searchResultIds;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
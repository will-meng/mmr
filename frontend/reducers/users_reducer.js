import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_ROUTES } from '../actions/route_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_ROUTES:
      if (action.payload.user)
        return merge({}, state, action.payload.user);
    default:
      return state;
  }
};

export default usersReducer;
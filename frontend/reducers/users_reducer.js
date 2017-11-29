import { RECEIVE_USER, RECEIVE_USERS } from '../actions/user_actions';
import { RECEIVE_ROUTES } from '../actions/route_actions';
import { RECEIVE_WORKOUTS, RECEIVE_WORKOUT } from '../actions/workout_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let userId;

  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_USERS:
    case RECEIVE_WORKOUTS:
    case RECEIVE_WORKOUT:
      return merge({}, state, action.payload.users);
    case RECEIVE_ROUTES:
      if (action.payload.user) {
        return merge({}, state, action.payload.users);
      }
      return state;
    default:
      return state;
  }
};

export default usersReducer;
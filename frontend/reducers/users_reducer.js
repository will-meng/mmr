import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_ROUTES } from '../actions/route_actions';
import { RECEIVE_WORKOUTS } from '../actions/workout_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let userId;

  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_WORKOUTS:
      userId = Object.keys(action.payload.user)[0];
      const workoutIds = action.payload.user[userId].workoutIds;
      return merge({}, state, { [userId]: { workoutIds } });
    case RECEIVE_ROUTES:
      if (action.payload.user) {
        userId = Object.keys(action.payload.user)[0];
        const routeIds = action.payload.user[userId].routeIds;
        return merge({}, state, { [userId]: { routeIds } });
      }
      return state;
    default:
      return state;
  }
};

export default usersReducer;
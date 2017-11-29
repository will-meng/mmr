import { 
  RECEIVE_WORKOUTS, 
  RECEIVE_WORKOUT, 
  REMOVE_WORKOUT 
} from '../actions/workout_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import merge from 'lodash/merge';

const workoutsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newWorkouts;
  switch (action.type) {
    case RECEIVE_WORKOUTS:
    case RECEIVE_WORKOUT:
    case RECEIVE_COMMENT:
      return merge({}, state, action.payload.workouts);
    case REMOVE_COMMENT:
      const workoutId = Object.keys(action.payload.workouts)[0];
      const workout = action.payload.workouts[workoutId];
      newWorkouts = merge({}, state);
      newWorkouts[workoutId].comment_ids = workout.comment_ids;
      return newWorkouts;
    case REMOVE_WORKOUT:
      newWorkouts = merge({}, state);
      delete newWorkouts[action.workoutId];
      return newWorkouts;
    default:
      return state;
  }
};

export default workoutsReducer;
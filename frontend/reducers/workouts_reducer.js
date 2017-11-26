import { 
  RECEIVE_WORKOUTS, 
  RECEIVE_WORKOUT, 
  REMOVE_WORKOUT 
} from '../actions/workout_actions';
import merge from 'lodash/merge';

const workoutsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_WORKOUTS:
      return merge({}, state, action.payload.workouts);
    case RECEIVE_WORKOUT:
      return merge({}, state, { [action.workout.id]: action.workout });
    case REMOVE_WORKOUT:
      const newWorkouts = merge({}, state);
      delete newWorkouts[action.workoutId];
      return newWorkouts;
    default:
      return state;
  }
};

export default workoutsReducer;
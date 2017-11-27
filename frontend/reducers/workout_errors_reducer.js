import { RECEIVE_WORKOUT_ERRORS, RECEIVE_WORKOUT } from '../actions/workout_actions';
import { REMOVE_ERRORS } from '../actions/error_actions';

const workoutErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_WORKOUT_ERRORS:
      return action.errors;
    case RECEIVE_WORKOUT:
      return [];
    case REMOVE_ERRORS:
      return [];
    default:
      return state;
  }
};

export default workoutErrorsReducer;
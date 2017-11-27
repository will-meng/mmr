import { 
  requestUserWorkouts,
  deleteWorkout 
} from '../../../actions/workout_actions';
import { requestUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import WorkoutIndex from './workout_index';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const ownerId = ownProps.match.params.userId || currentUser.id;
  return { 
    workouts: Object.values(state.entities.workouts),
    owner: state.entities.users[ownerId],
    ownerId,
    currentUser,
    loading: state.ui.loading
   };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestUserWorkouts: userId => dispatch(requestUserWorkouts(userId)),
    deleteWorkout: workoutId => dispatch(deleteWorkout(workoutId)),
    requestUser: userId => dispatch(requestUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutIndex);

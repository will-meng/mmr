import { requestWorkout, deleteWorkout } from '../../../actions/workout_actions';
import { requestUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import WorkoutShow from './workout_show';

const mapStateToProps = (state, ownProps) => {
  const workoutId = parseInt(ownProps.match.params.workoutId);
  const workout = state.entities.workouts[workoutId];
  const creator = workout ? state.entities.users[workout.user_id] : null;
  return { 
    workoutId,
    workout,
    creator,
    currentUser: state.session.currentUser,
    loading: state.ui.loading
   };
};

const mapDispatchToProps = dispatch => ({
  requestWorkout: workoutId => dispatch(requestWorkout(workoutId)),
  deleteWorkout: workoutId => dispatch(deleteWorkout(workoutId)),
  requestUser: userId => dispatch(requestUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutShow);

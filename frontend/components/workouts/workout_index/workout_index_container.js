import { requestUserWorkouts } from '../../../actions/workout_actions';
import { connect } from 'react-redux';
import WorkoutIndex from './workout_index';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const ownerId = ownProps.match.params.userId;
  const owner = state.entities.users[ownerId];
  const workoutsObj = state.entities.workouts;
  const workouts = owner && owner.workoutIds ?
     owner.workoutIds.map(workoutId => workoutsObj[workoutId]) : [];

  return { 
    workouts,
    owner,
    ownerId,
    currentUser,
    loading: state.ui.loading
   };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestUserWorkouts: userId => dispatch(requestUserWorkouts(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutIndex);

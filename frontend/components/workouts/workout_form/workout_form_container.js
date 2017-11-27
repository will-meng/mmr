import { 
  createWorkout, 
  updateWorkout, 
  requestWorkout 
} from '../../../actions/workout_actions';
import { requestUserRoutes } from '../../../actions/route_actions';
import { removeErrors } from '../../../actions/error_actions';
import { connect } from 'react-redux';
import WorkoutForm from './workout_form';

const mapStateToProps = (state, ownProps) => {
  const workoutId = parseInt(ownProps.match.params.workoutId);
  const currentUser = state.session.currentUser;
  const user = state.entities.users[currentUser.id];
  const routeIds = (user && user.routeIds) || [];
  const routesObj = {};
  routeIds.forEach(routeId => {
    routesObj[routeId] = state.entities.routes[routeId];
  });
  return {
    workoutId,
    workout: state.entities.workouts[workoutId],
    routesObj,
    errors: state.errors.workout,
    currentUser,
    loading: state.ui.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.match.params.workoutId ? 'edit' : 'new';
  const submitAction = formType === 'new' ? createWorkout : updateWorkout;
  return {
    formType,
    requestWorkout: workoutId => dispatch(requestWorkout(workoutId)),
    requestUserRoutes: userId => dispatch(requestUserRoutes(userId)),
    removeErrors: () => dispatch(removeErrors()),
    submitAction: workout => dispatch(submitAction(workout))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutForm);

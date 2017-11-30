import { requestUser } from '../../actions/user_actions';
import { connect } from 'react-redux';
import Dashboard from './dashboard';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const userId = parseInt(ownProps.match.params.userId);
  const user = state.entities.users[userId];
  const workouts = {};
  if (user && user.recent_workout_ids)
    user.recent_workout_ids.forEach(id => {
      workouts[id] = state.entities.workouts[id];
    });
  const routes = {};
  if (user && user.recent_route_ids)
    user.recent_route_ids.forEach(id => {
      routes[id] = state.entities.routes[id];
    });

  return { 
    userId,
    user,
    currentUser,
    workouts,
    routes,
    loading: state.ui.loading
   };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestUser: userId => dispatch(requestUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

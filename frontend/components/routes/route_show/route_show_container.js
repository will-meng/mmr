import { requestRoute, deleteRoute } from '../../../actions/route_actions';
import { requestUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import RouteShow from './route_show';

const mapStateToProps = (state, ownProps) => {
  const routeId = parseInt(ownProps.match.params.routeId);
  const route = state.entities.routes[routeId];
  let creator = null;
  if (route) creator = state.entities.users[route.creator_id];
  return { 
    routeId, 
    route,
    creator,
    currentUser: state.session.currentUser,
    loading: state.ui.loading
   };
};

const mapDispatchToProps = dispatch => ({
  requestRoute: routeId => dispatch(requestRoute(routeId)),
  deleteRoute: routeId => dispatch(deleteRoute(routeId)),
  requestUser: userId => dispatch(requestUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteShow);

import { requestRoutes, deleteRoute } from '../../../actions/route_actions';
import { requestUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import RouteIndex from './route_index';

const mapStateToProps = (state, ownProps) => {
  return { 
    routes: Object.values(state.entities.routes),
    currentUser: state.session.currentUser
   };
};

const mapDispatchToProps = dispatch => ({
  requestRoutes: () => dispatch(requestRoutes()),
  deleteRoute: routeId => dispatch(deleteRoute(routeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteIndex);

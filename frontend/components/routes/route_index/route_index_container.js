import { 
  requestRoutes, 
  requestUserRoutes,
  deleteRoute 
} from '../../../actions/route_actions';
import { requestUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import RouteIndex from './route_index';

const mapStateToProps = (state, ownProps) => {
  const ownerId = ownProps.match.params.userId;
  return { 
    routesObj: state.entities.routes,
    owner: ownerId && state.entities.users[ownerId],
    ownerId,
    currentUser: state.session.currentUser,
    loading: state.ui.loading
   };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestRoutes: () => dispatch(requestRoutes()),
    requestUserRoutes: userId => dispatch(requestUserRoutes(userId)),
    deleteRoute: routeId => dispatch(deleteRoute(routeId)),
    requestUser: userId => dispatch(requestUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteIndex);

import { createRoute, updateRoute, requestRoute } from '../../../actions/route_actions';
import { removeErrors } from '../../../actions/error_actions';
import { connect } from 'react-redux';
import RouteCreate from './route_create';

const mapStateToProps = (state, ownProps) => {
  console.log('this')
  const routeId = parseInt(ownProps.match.params.routeId);
  return {
    routeId,
    route: state.entities.routes[routeId],
    errors: state.errors.route,
    currentUser: state.session.currentUser,
    loading: state.ui.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.match.params.routeId ? 'edit' : 'new';
  const submitAction = formType === 'new' ? createRoute : updateRoute;
  return {
    formType,
    requestRoute: routeId => dispatch(requestRoute(routeId)),
    removeErrors: () => dispatch(removeErrors()),
    submitAction: route => dispatch(submitAction(route))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreate);

import { requestRoute } from '../../../actions/route_actions';
import { connect } from 'react-redux';
import RouteShow from './route_show';

const mapStateToProps = (state, ownProps) => {
  const routeId = parseInt(ownProps.match.params.routeId);
  const route = state.entities.routes[routeId] || {};
  return { routeId, route };
};

const mapDispatchToProps = dispatch => ({
  requestRoute: routeId => dispatch(requestRoute(routeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteShow);

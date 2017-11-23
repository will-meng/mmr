import { createRoute } from '../../actions/route_actions';
import { connect } from 'react-redux';
import RouteCreate from './route_create';

const mapStateToProps = state => ({
  errors: state.errors.route
});

const mapDispatchToProps = dispatch => ({
  createRoute: routeForm => dispatch(createRoute(routeForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreate);

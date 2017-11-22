
import { connect } from 'react-redux';
import RouteForm from './route_form';

const mapStateToProps = state => ({
  errors: state.errors.routes
});

const mapDispatchToProps = dispatch => ({
  createRoute: routeForm => dispatch(createRoute(routeForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteForm);

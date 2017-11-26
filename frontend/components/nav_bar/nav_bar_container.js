import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './nav_bar';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  path: ownProps.location.pathname
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(logout()).then(() => ownProps.history.push('/login'))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
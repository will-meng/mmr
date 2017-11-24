import { login } from '../../actions/session_actions';
import { removeErrors } from '../../actions/error_actions';
import { connect } from 'react-redux';
import LoginForm from './login_form';

const mapStateToProps = state => ({
  errors: state.errors.login,
  loggedIn: Boolean(state.session.currentUser)
});

const mapDispatchToProps = dispatch => ({
  login: userForm => dispatch(login(userForm)),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

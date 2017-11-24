import { signup } from '../../actions/session_actions';
import { removeErrors } from '../../actions/error_actions';
import { connect } from 'react-redux';
import SignupForm from './signup_form';

const mapStateToProps = state => ({
  errors: state.errors.signup,
  loggedIn: Boolean(state.session.currentUser)
});

const mapDispatchToProps = dispatch => ({
  signup: userForm => dispatch(signup(userForm)),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
import { signup } from '../../actions/session_actions';
import { connect } from 'react-redux';
import SignupForm from './signup_form';

const mapStateToProps = state => ({
  errors: state.errors.signup
});

const mapDispatchToProps = dispatch => ({
  signup: userForm => dispatch(signup(userForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
import { requestCurrentUser, updateUser } from '../../actions/user_actions';
import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state, ownProps) => {

  return { 
    currentUser: state.session.currentUser,
    errors: state.errors.signup
   };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestCurrentUser: () => dispatch(requestCurrentUser()),
    updateUser: (formData, userId) => dispatch(updateUser(formData, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

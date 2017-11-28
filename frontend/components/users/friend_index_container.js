import { requestFriends } from '../../actions/user_actions';
import { 
  confirmFriendship,
  deleteFriendship 
} from '../../actions/friendship_actions';
import { connect } from 'react-redux';
import FriendIndex from './friend_index';

const mapStateToProps = (state, ownProps) => {
  const friendIds = state.session.currentUser.friendIds || [];
  const inRequests = state.session.currentUser.inRequests || [];
  const outRequests = state.session.currentUser.outRequests || [];
  const allUsers = state.entities.users;
  const friendlyUsers = {};
  friendIds.forEach(id => {friendlyUsers[id] = allUsers[id];});
  inRequests.forEach(id => {friendlyUsers[id] = allUsers[id];});
  outRequests.forEach(id => {friendlyUsers[id] = allUsers[id];});

  return { 
    friendIds, 
    inRequests, 
    outRequests,
    friendlyUsers,
    loading: state.ui.loading 
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    requestFriends: () => dispatch(requestFriends()),
    confirmFriendship: requestorId => dispatch(confirmFriendship(requestorId)),
    deleteFriendship: friendId => dispatch(deleteFriendship(friendId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendIndex);
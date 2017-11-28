import { searchUsers, requestFriends } from '../../actions/user_actions';
import { 
  requestFriendship,
  confirmFriendship,
  deleteFriendship 
} from '../../actions/friendship_actions';
import { connect } from 'react-redux';
import FriendSearch from './friend_search';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const searchResultIds = currentUser.searchResultIds || [];
  const searchResults = searchResultIds.map(userId => 
    state.entities.users[userId]
  );

  return {
    searchResults,
    currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    searchUsers: query => dispatch(searchUsers(query)),
    requestFriends: () => dispatch(requestFriends()),
    requestFriendship: requesteeId => dispatch(requestFriendship(requesteeId)),
    confirmFriendship: requestorId => dispatch(confirmFriendship(requestorId)),
    deleteFriendship: friendId => dispatch(deleteFriendship(friendId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearch);

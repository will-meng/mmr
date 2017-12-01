import * as FriendshipAPIUtil from '../utils/friendship_api_util';
export const RECEIVE_FRIENDSHIP = 'RECEIVE_FRIENDSHIP';

const receiveFriendship = currentUser => ({
  type: RECEIVE_FRIENDSHIP,
  currentUser
});

export const requestFriendship = requesteeId => dispatch => (
  FriendshipAPIUtil.requestFriendship(requesteeId)
    .then(currentUser => dispatch(receiveFriendship(currentUser)))
);

export const confirmFriendship = requestorId => dispatch => (
  FriendshipAPIUtil.confirmFriendship(requestorId)
    .then(currentUser => dispatch(receiveFriendship(currentUser)))
);

export const deleteFriendship = friendId => dispatch => (
  FriendshipAPIUtil.deleteFriendship(friendId)
    .then(currentUser => dispatch(receiveFriendship(currentUser)))
);
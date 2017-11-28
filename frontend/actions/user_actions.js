import * as UserAPIUtils from '../utils/user_api_util';
import * as FriendshipAPIUtils from '../utils/friendship_api_util';
import { startLoading } from './loading_actions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveUsers = payload => ({
  type: RECEIVE_USERS,
  payload
});

export const requestUser = userId => dispatch => (
  UserAPIUtils.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)), console.log)
);

export const searchUsers = query => dispatch => {
  dispatch(startLoading());
  return UserAPIUtils.searchUsers(query)
    .then(payload => dispatch(receiveUsers(payload)), console.log);
};

export const requestFriends = () => dispatch => {
  dispatch(startLoading());
  return FriendshipAPIUtils.fetchFriends()
    .then(payload => dispatch(receiveUsers(payload)), console.log);
};
import * as UserAPIUtils from '../utils/user_api_util';
import * as FriendshipAPIUtils from '../utils/friendship_api_util';
import { receiveCurrentUser, receiveSignupErrors } from './session_actions';
import { startLoading } from './loading_actions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

const receiveUser = payload => ({
  type: RECEIVE_USER,
  payload
});

const receiveUsers = payload => ({
  type: RECEIVE_USERS,
  payload
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH
});

export const updateUser = (formData, userId) => dispatch => {
  dispatch(startLoading());
  return UserAPIUtils.updateUser(formData, userId)
    .then(user => dispatch(receiveCurrentUser(user)), 
      errors => dispatch(receiveSignupErrors(errors.responseJSON)));
};

export const requestCurrentUser = userId => dispatch => (
  UserAPIUtils.fetchCurrentUser()
    .then(user => dispatch(receiveCurrentUser(user)))
);

export const requestUser = userId => dispatch => (
  UserAPIUtils.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)))
);

export const searchUsers = query => dispatch => {
  // dispatch(startLoading());
  return UserAPIUtils.searchUsers(query)
    .then(payload => dispatch(receiveUsers(payload)));
};

export const requestFriends = () => dispatch => {
  dispatch(startLoading());
  return FriendshipAPIUtils.fetchFriends()
    .then(payload => dispatch(receiveUsers(payload)));
};
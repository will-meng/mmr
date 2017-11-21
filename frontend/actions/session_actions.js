import * as SessionAPIUtil from '../utils/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const login = userForm => dispatch => (
  SessionAPIUtil.login(userForm)
    .then(user => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const signup = userForm => dispatch => (
  SessionAPIUtil.signup(userForm)
    .then(user => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
  SessionAPIUtil.logout()
    .then(user => dispatch(receiveCurrentUser(null)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);
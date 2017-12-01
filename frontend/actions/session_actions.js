import * as SessionAPIUtil from '../utils/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SIGNUP_ERRORS = 'RECEIVE_SIGNUP_ERRORS';
export const RECEIVE_LOGIN_ERRORS = 'RECEIVE_LOGIN_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveSignupErrors = errors => ({
  type: RECEIVE_SIGNUP_ERRORS,
  errors
});

const receiveLoginErrors = errors => ({
  type: RECEIVE_LOGIN_ERRORS,
  errors
});

export const login = userForm => dispatch => (
  SessionAPIUtil.login(userForm)
    .then(user => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveLoginErrors(errors.responseJSON)))
);

export const signup = userForm => dispatch => (
  SessionAPIUtil.signup(userForm)
    .then(user => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveSignupErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
  SessionAPIUtil.logout()
    .then(user => dispatch(receiveCurrentUser(null)))
);
import * as UserAPIUtils from '../utils/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const requestUser = userId => dispatch => (
  UserAPIUtils.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)), console.log)
);


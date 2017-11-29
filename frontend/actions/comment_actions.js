import * as CommentAPIUtils from '../utils/comment_api_util';
import { startLoading } from './loading_actions';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

const receiveComment = payload => ({
  type: RECEIVE_COMMENT,
  payload
});

const removeComment = payload => ({
  type: REMOVE_COMMENT,
  payload
});

const receiveCommentErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors
});

export const createComment = commentForm => dispatch => {
  // dispatch(startLoading());
  return CommentAPIUtils.createComment(commentForm)
    .then(comment => dispatch(receiveComment(comment)),
      errors => dispatch(receiveCommentErrors(errors.responseJSON)));
};

export const deleteComment = commentId => dispatch => {
  // dispatch(startLoading());
  return CommentAPIUtils.deleteComment(commentId)
    .then(payload => dispatch(removeComment(payload)), console.log);
};
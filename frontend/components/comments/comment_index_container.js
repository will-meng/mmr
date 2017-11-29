import { createComment, deleteComment } from '../../actions/comment_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentIndex from './comment_index';

const mapStateToProps = (state, ownProps) => {
  const workoutId = ownProps.workoutId;
  const commentIds = state.entities.workouts[workoutId].comment_ids || [];
  const comments = commentIds.map(id => state.entities.comments[id]);
  const users = {};
  comments.forEach(comment => {
    users[comment.commenter_id] = state.entities.users[comment.commenter_id];
  });

  return {
    workoutId,
    comments,
    users,
    currentUser: state.session.currentUser,
    errors: state.errors.comment
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    createComment: comment => dispatch(createComment(comment)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentIndex));
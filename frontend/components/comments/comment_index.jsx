import React from 'react';
import CommentIndexItem from './comment_index_item';
import CommentForm from './comment_form';

const CommentIndex = ({ workoutId, comments, users, currentUser, errors, createComment, deleteComment }) => (
  <div className='comment-container'>
    <h2>Comments</h2>
    <ul>
      {
        comments.map(comment => 
          <CommentIndexItem key={comment.id}
            comment={comment}
            user={users[comment.commenter_id]}
            deleteComment={currentUser.id === comment.commenter_id ? deleteComment : null}
          />
        )
      }
    </ul>
    <CommentForm 
      workoutId={workoutId} 
      createComment={createComment}
      currentUser={currentUser}
      errors={errors}
    />
  </div>
);

export default CommentIndex;
import React from 'react';
import { Link } from 'react-router-dom';

const CommentIndexItem = ({ user, comment, deleteComment }) => (
  <li>
    <Link to={`/user/${user.id}/dashboard`}>
      <img src={user.img_url} alt="Comment Author photo"/>
    </Link>

    <div className='comment-body-group'>
      <div className='comment-header'>
        <Link to={`/user/${user.id}/dashboard`}>{user.fname} {user.lname}</Link>
        <a onClick={() => deleteComment(comment.id)}>
          {deleteComment ? 'Delete' : ''}
        </a>
      </div>
      <p>{comment.body}</p> 
    </div>
  </li>
);

export default CommentIndexItem;
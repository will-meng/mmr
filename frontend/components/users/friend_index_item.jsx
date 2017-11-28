import React from 'react';
import { Link } from 'react-router-dom';

const FriendIndexItem = ({ user, deleteName, handleConfirm, handleDelete, addClass}) => (
  <li className={addClass}>
    <div className='friend-info'>
      <img src={user.img_url} alt="User's photo"/>
      <Link to=''>{user.fname}{user.lname}</Link>
    </div>

    <div>
      <a className='button' onClick={() => handleDelete(user.id)}>{deleteName}</a>
      { deleteName === 'Deny' ? (
          <a className='orange-btn button' 
            onClick={() => handleConfirm(user.id)}>Accept
          </a>
        ) : (null)
      }
    </div>
  </li>
);

export default FriendIndexItem;
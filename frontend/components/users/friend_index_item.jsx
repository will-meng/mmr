import React from 'react';
import { Link } from 'react-router-dom';

const FriendIndexItem = ({ user, deleteName, handleAdd, handleConfirm, handleDelete, formType, addClass}) => (
  <li className={addClass}>
    <div className='friend-info'>
      <img src={user.img_url} alt="User's photo"/>
      <Link to={`/user/${user.id}/dashboard`}>{user.fname} {user.lname}</Link>
    </div>
    { formType === 'my-friends' ? (
      <div>
        <a className='button' onClick={() => handleDelete(user.id)}>{deleteName}</a>
        { deleteName === 'Deny' ? (
            <a className='orange-btn button' 
              onClick={() => handleConfirm(user.id)}>Accept
            </a>
          ) : (null)
        }
      </div>
    ) : (
      <a className='orange-btn button' onClick={() => handleAdd(user.id)}>Add</a>
    )
    }
  </li>
);

export default FriendIndexItem;
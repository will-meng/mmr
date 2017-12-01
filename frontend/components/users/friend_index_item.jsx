import React from 'react';
import { Link } from 'react-router-dom';

const friendButtons = ({ user, handleAdd, handleConfirm, handleDelete, inRequests, outRequests, friendIds }) => {
  if (friendIds.includes(user.id))
    return <a className='button' onClick={() => handleDelete(user.id)}>Unfriend</a>;
  else if (outRequests.includes(user.id))
    return <a className='button' onClick={() => handleDelete(user.id)}>Cancel</a>;
  else if (inRequests.includes(user.id))
    return (
      <div>
        <a className='button' onClick={() => handleDelete(user.id)}>Deny</a>
        <a className='orange-btn button' onClick={() => handleConfirm(user.id)}>Accept</a>
      </div>
    );
  else
    return <a className='orange-btn button' onClick={() => handleAdd(user.id)}>Add</a>;
};

const FriendIndexItem = props => {
  const { user, deleteName, handleAdd, handleConfirm, handleDelete, formType, addClass} = props;
  return (<li className={addClass}>
    <div className='friend-info'>
      <div className='thumbnail-container'>
        <img src={user.img_url} className='profile' alt="User's photo"/>
      </div>
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
      friendButtons(props)
    )
    }
  </li>);
};

export default FriendIndexItem;
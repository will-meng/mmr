import React from 'react';
import { Link } from 'react-router-dom';
import FriendIndexItem from './friend_index_item';
import LoadingModal from '../loading/loading_modal';

class FriendIndex extends React.Component {
  componentDidMount() {
    this.props.requestFriends();
  }

  handleConfirmFriend(requestorId) {
    this.props.confirmFriendship(requestorId);
  }

  handleDeleteFriend(friendId) {
    this.props.deleteFriendship(friendId);
  }

  render() {
    const { friendIds, inRequests, outRequests, friendlyUsers, loading } = this.props;

    console.log(this.props);
    if (loading)
      return <LoadingModal/>;
    else
      return (
        <div className=''>
          <Link to='/friends/search'>Friend Search</Link><br/>

          <h1>Friend Requests</h1>
            <ul>
              {
                inRequests.map(userId => 
                  <li key={userId}>{friendlyUsers[userId].fname} {friendlyUsers[userId].lname}
                    <button onClick={() => this.handleConfirmFriend(userId)}>Accept</button>
                    <button onClick={() => this.handleDeleteFriend(userId)}>Deny</button>
                  </li>
                )
              }
            </ul>

          <h1>Friends</h1>
            <ul>
              {
                friendIds.map(userId => 
                  <li key={userId}>{friendlyUsers[userId].fname} {friendlyUsers[userId].lname}
                    <button onClick={() => this.handleDeleteFriend(userId)}>Unfriend</button>;
                  </li>
                )
              }
            </ul>

          <h1>Requests to Others</h1>
            <ul>
              {
                outRequests.map(userId => 
                  <li key={userId}>{friendlyUsers[userId].fname} {friendlyUsers[userId].lname}
                    <button onClick={() => this.handleDeleteFriend(userId)}>Cancel</button>
                  </li>
                )
              }
            </ul>
          
        </div>
      );
  }
}

export default FriendIndex;
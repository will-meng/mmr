import React from 'react';
import { Link } from 'react-router-dom';
import FriendIndexItem from './friend_index_item';
import LoadingModal from '../loading/loading_modal';

class FriendIndex extends React.Component {
  componentDidMount() {
    this.props.requestFriends();
  }

  handleConfirm(requestorId) {
    this.props.confirmFriendship(requestorId);
  }

  handleDelete(friendId) {
    this.props.deleteFriendship(friendId);
  }

  render() {
    const { friendIds, inRequests, outRequests, friendlyUsers, loading } = this.props;
    const myFriends = this.props.match.path === '/friends' ? 'current-tab' : '';

    if (loading)
      return <LoadingModal/>;
    else
      return (
        <div className='friend-index-container'>
          <div className='index-title'>
            <h1>My Friends</h1>
          </div>
          
          <div className='friend-tabs'>
            <Link to='/friends' className={myFriends}>My Friends</Link>
            <Link to='/friends/search' id='find-friends'>Find Friends</Link>
            <Link to='/friends'>Invite Friends</Link>
          </div>

          <div className='friend-category'>
            <h3>Friend Requests ({inRequests.length})</h3>
            <ul>
              {
                inRequests.map(userId => 
                  <FriendIndexItem key={userId} addClass=''
                    deleteName='Deny'
                    user={friendlyUsers[userId]}
                    handleConfirm={this.handleConfirm.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                  />
                )
              }
            </ul>
          </div>
          
          <div className='friend-category'>
            <h3>Friends ({friendIds.length})</h3>
              <ul>
                {
                  friendIds.map(userId => 
                    <FriendIndexItem key={userId} addClass='half-width'
                      deleteName='Unfriend'
                      user={friendlyUsers[userId]}
                      handleConfirm={this.handleConfirm.bind(this)}
                      handleDelete={this.handleDelete.bind(this)}
                    />
                  )
                }
              </ul>
            </div>
          
          <div className='friend-category'>
            <h3>Requests to Others ({outRequests.length})</h3>
            <ul>
              {
                outRequests.map(userId => 
                  <FriendIndexItem key={userId} addClass='half-width'
                    deleteName='Cancel'
                    user={friendlyUsers[userId]}
                    handleConfirm={this.handleConfirm.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                  />
                )
              }
            </ul>
          </div>
        </div>
      );
  }
}

export default FriendIndex;
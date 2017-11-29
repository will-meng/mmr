import React from 'react';
import { Link } from 'react-router-dom';
import FriendIndexItem from './friend_index_item';
import LoadingModal from '../loading/loading_modal';

class FriendIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.requestFriends();
  }

  handleAdd(requesteeId) {
    this.props.requestFriendship(requesteeId);
  } 

  handleConfirm(requestorId) {
    this.props.confirmFriendship(requestorId);
  }

  handleDelete(friendId) {
    this.props.deleteFriendship(friendId);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchUsers(this.state.query);
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  render() {
    const { friendIds, inRequests, outRequests, friendlyUsers, loading, formType, searchResults } = this.props;
    const myFriends = formType === 'my-friends' ? 'current-tab' : '';
    const findFriends = formType === 'find-friends' ? 'current-tab' : '';

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
            <Link to='/friends/search' className={findFriends}>Find Friends</Link>
            <Link to='/friends'>Invite Friends</Link>
          </div>

          { formType === 'my-friends' ?
          (<div className='my-friends'>
            <div className='friend-category'>
              <h3>Friend Requests ({inRequests.length})</h3>
              <ul>
                {
                  inRequests.map(userId => 
                    <FriendIndexItem key={userId} addClass=''
                      formType={formType}
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
                        formType={formType}
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
                      formType={formType}
                      deleteName='Cancel'
                      user={friendlyUsers[userId]}
                      handleConfirm={this.handleConfirm.bind(this)}
                      handleDelete={this.handleDelete.bind(this)}
                    />
                  )
                }
              </ul>
            </div>
          </div>)
            :
          (<div className='find-friends'>
            <h3>FIND MAPMYFITNESS FRIENDS BY FIRST NAME, LAST NAME, OR EMAIL:</h3>
            <div className='friend-search-container'>
              <input type="text" 
                className=''
                onChange={this.update('query')}
                value={this.state.query}
              />
              <a className='orange-btn button' onClick={this.handleSubmit}>
                Search
              </a>
            </div>

            <div className='friend-category'>
              <ul>
                {
                  searchResults.map(user =>
                    <FriendIndexItem key={user.id} addClass='half-width'
                      formType={formType}
                      deleteName='Deny'
                      user={user}
                      handleAdd={this.handleAdd.bind(this)}
                      handleConfirm={this.handleConfirm.bind(this)}
                      handleDelete={this.handleDelete.bind(this)}
                      inRequests={inRequests}
                      outRequests={outRequests}
                      friendIds={friendIds}
                    />
                  )
                }
              </ul>
            </div>
          </div>)
          }
        </div>
      );
  }
}

export default FriendIndex;
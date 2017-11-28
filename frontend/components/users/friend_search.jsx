import React from 'react';
import LoadingModal from '../loading/loading_modal';

class FriendSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.requestFriends();
  }

  handleAddFriend(requesteeId) {
    this.props.requestFriendship(requesteeId);
  } 

  handleConfirmFriend(requestorId) {
    this.props.confirmFriendship(requestorId);
  }

  handleDeleteFriend(friendId) {
    this.props.deleteFriendship(friendId);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchUsers(this.state.query);
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  friendButtons(userId) {
    const currentUser = this.props.currentUser;
    if (currentUser.friendIds.includes(userId))
      return <button onClick={() => this.handleDeleteFriend(userId)}>Unfriend</button>;
    else if (currentUser.outRequests.includes(userId))
      return <button onClick={() => this.handleDeleteFriend(userId)}>Cancel</button>;
    else if (currentUser.inRequests.includes(userId))
      return (
        <div>
          <button onClick={() => this.handleConfirmFriend(userId)}>Accept</button>
          <button onClick={() => this.handleDeleteFriend(userId)}>Deny</button>
        </div>
      );
    else
      return <button onClick={() => this.handleAddFriend(userId)}>Add</button>;
  }

  render() {
    const { searchResults, currentUser } = this.props;

    return (
      <div>
        <input type="text" 
          className=''
          onChange={this.update('query')}
          value={this.state.query}
        />
        <button onClick={this.handleSubmit}>Search</button>

        <ul>
          {
            searchResults.map(user =>
              <li key={user.id}>{user.fname} -> {this.friendButtons(user.id)}
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default FriendSearch;
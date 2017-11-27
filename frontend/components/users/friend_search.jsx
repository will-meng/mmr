import React from 'react';
import LoadingModal from '../loading/loading_modal';

class FriendSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchUsers(this.state.query);
      // .then(console.log);
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
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
              <li key={user.id}>{user.fname}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default FriendSearch;
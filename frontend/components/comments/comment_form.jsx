import React from 'react';
import { Link } from 'react-router-dom';

const _nullState = { body: '', error: '' };

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = _nullState;
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.body === '')
      this.setState({error: 'Please enter some text'});
    else {
      this.props.createComment({ 
        body: this.state.body,
        workout_id: this.props.workoutId 
      }).then(() => this.setState(_nullState));
    }
  }

  updateBody(e) {
    this.setState({ body: e.currentTarget.value });
  }

  render() {
    const error = this.props.errors[0];
    return (
      <div className='comment-form-container'>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Link to={`/user/${this.props.currentUser.id}/dashboard`}>
          <div className='thumbnail-container'>
            <img src={this.props.currentUser.img_url} className='profile' alt="Current user's photo"/>
          </div>
        </Link>
        <input type="text"
          onChange={this.updateBody.bind(this)}
          value={this.state.body}
          placeholder='Write a comment...'
        />
        <input type="submit" value='Post'/>
      </form>

      <span className='error-msg'>{this.state.error}</span>
      </div>
    );
  }
}

export default CommentForm;
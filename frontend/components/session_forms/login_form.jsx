import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state)
      .then(this.props.history.push('/'));
  }

  render() {
    const { errors } = this.props;
    return (
      <div>
        <Link className='login' to='/signup'>SIGN UP</Link>
        <ul>
          { errors.map(error => <li key={error}>{error}</li>) }
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type='text'
            placeholder='Email'
            onChange={this.update('email')}
          />
          <input type='password'
            placeholder='Password'
            onChange={this.update('password')}
          />

        <input type='submit' className='submit-login' value='LOG IN'/>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);

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
      <div className='auth-main'>
      <div className='signup-container'>
        <Link className='login-from-signup' to='/signup'>Sign Up</Link>

        <ul>
          { errors.map(error => <li key={error}>{error}</li>) }
        </ul>

        <form onSubmit={this.handleSubmit} className='form'>
          <div className='input-container'>
            <input type='text'
              placeholder='Email'
              onChange={this.update('email')}
            />
            <span className='error-msg'></span>
          </div>

          <div className='input-container'>
            <input type='password'
              placeholder='Password'
              onChange={this.update('password')}
            />
            <span className='error-msg'></span>
          </div>

        <input type='submit' className='green-btn' value='Log In'/>
        </form>
      </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);

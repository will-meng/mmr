import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const demoEmail = 'jc@36berlin.com';
const demoPassword = 'password';
const int = 70; // ms interval between typed demo keys

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.removeErrors();
    if (this.props.location.search.substr(1) === 'demo')
      this.demoLogin();
  }

  demoLogin() {
    $('input').prop('disabled',true);
    let i = 0;
    $('#email').addClass('focus');
    demoEmail.split('').forEach(ch => 
      setTimeout(this.demoType('email', ch) ,int * i++));
    setTimeout(() => $('#email').removeClass('focus'), int * i++);
    setTimeout(() => $('#password').addClass('focus'), int * i++);
    demoPassword.split('').forEach(ch => 
      setTimeout(this.demoType('password', ch) ,int * i++));
    setTimeout(() => $('#password').removeClass('focus'), int * i++);
    setTimeout(() => $('input[type=submit]').addClass('fake-hover'), int * i++);
    setTimeout(() => $('input[type=submit]').removeClass('fake-hover'), int * i++);
    setTimeout(() => this.props.login(this.state), int * ++i);
  }

  resetState() {
    return () => this.setState({email: '', password: ''});
  }

  demoType(field, char) {
    return () => this.setState({ [field]: this.state[field] + char });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state)
      .then(() => this.props.history.push('/dashboard'), this.handleErrors.bind(this));
  }

  handleErrors() {
    if (RegExp('password').test(this.props.errors)) {
      $(`#email`).addClass('error-border');
      $(`#password`).addClass('error-border');
    }
  }
  

  render() {
    return (
      <div className='auth-main'>
      <div className='signup-container'>
        <Link className='login-from-signup' to='/signup'>Sign Up</Link>

        <ul>
          {
            this.props.errors.map(error => 
              <li className='error-msg' key={error}>{error}</li>) 
          }
        </ul>

        <form onSubmit={this.handleSubmit} className='form'>
          <div className='input-container'>
            <input type='text' id='email'
              placeholder='Email'
              onChange={this.update('email')}
              value={this.state.email}
            />
          </div>

          <div className='input-container'>
            <input type='password' id='password'
              placeholder='Password'
              onChange={this.update('password')}
              value={this.state.password}
            />
          </div>

        <input type='submit' className='green-btn' value='Log In'/>
        </form>
      </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);

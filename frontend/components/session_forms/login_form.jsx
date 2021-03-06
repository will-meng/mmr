import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const demoEmail = 'captain.america@gmail.com';
const demoPassword = 'hunter12';
const int = 50; // ms interval between typed demo keys

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.props.removeErrors();
    if (this.props.location.search.substr(1) === 'demo')
      this.demoLogin();
  }

  demoLogin() {
    this.resetState()();
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
    setTimeout(() => this.login(), int * ++i);
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
    this.login();
  }

  login() {
    this.props.login(this.state)
      .then(action => 
        this.props.history.push(`/`), this.handleErrors.bind(this));
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
        <span>
          <p>New User?</p>
          <Link to="/signup">Sign Up</Link>
        </span>

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

        <button className='orange-btn demo-button' onClick={() => this.demoLogin()}>
          Demo Login
        </button>
      </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);

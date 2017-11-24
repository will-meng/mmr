import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const demoEmail = 'jc@36berlin.com';
const demoPassword = 'password';
const int = 80; // ms interval between typed demo keys

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
    if (this.props.loggedIn)
      this.props.history.push('/');
    if (this.props.location.search.substr(1) === 'demo')
      this.demoLogin();
  }

  demoLogin() {
    document.getElementById('email').disabled = true;
    document.getElementById('password').disabled = true;
    let i = 0;
    demoEmail.split('').forEach(ch => 
      setTimeout(this.demoType('email', ch) ,int * i++));
    demoPassword.split('').forEach(ch => 
      setTimeout(this.demoType('password', ch) ,int * i++));
    setTimeout(() => this.props.login(this.state), int * i + 300);
  }

  resetState() {
    return () => this.setState({email: '', password: ''});
  }

  demoType(field, char) {
    console.log(char);
    return () => this.setState({ [field]: this.state[field] + char });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className='auth-main'>
      <div className='signup-container'>
        <Link className='login-from-signup' to='/signup'>Sign Up</Link>

        <ul>
          {
            errors.map(error => 
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
            <span className='error-msg'></span>
          </div>

          <div className='input-container'>
            <input type='password' id='password'
              placeholder='Password'
              onChange={this.update('password')}
              value={this.state.password}
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

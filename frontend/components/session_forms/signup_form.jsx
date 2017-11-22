import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO remove hard coded fields
    this.state = {
      email: '',
      fname: '',
      lname: '',
      password: '',
      birthday: '1999/01/01',
      gender: 'female',
      img_url: 'placeholder'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state)
      .then(this.props.history.push('/'));
  }

  render() {
    const { errors } = this.props;
    return (
      <div>
        <Link className='login' to='/login'>LOG IN</Link>
        <ul>
          { errors.map(error => <li key={error}>{error}</li>) }
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type='text'
            placeholder='First Name'
            onChange={this.update('fname')}
          />
          <input type='text'
            placeholder='Last Name'
            onChange={this.update('lname')}
          />
          <input type='text'
            placeholder='Email'
            onChange={this.update('email')}
          />
          <input type='password'
            placeholder='Password'
            onChange={this.update('password')}
          />

        <input type='submit' className='submit-signup' value='SIGN UP'/>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);

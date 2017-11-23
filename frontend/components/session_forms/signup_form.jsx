import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { range } from 'lodash';

const days = range(1, 32);
const months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
const years = range(2005, 1896);

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO remove hard coded fields
    this.state = {
      email: '',
      fname: '',
      lname: '',
      password: '',
      day: null,
      month: null,
      year: null,
      gender: 'female',
      img_url: 'https://mmf.cachefly.net/d/website/avatars/avatar_ride_male_80.jpg'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.birthday = 
      this.state.year + '/' + this.state.month + '/' + this.state.day;
    this.props.signup(this.state)
      .then(this.props.history.push('/'));
  }

  render() {
    const { errors } = this.props;
    return (
      <div className='auth-main'>
        <div className='signup-container'>
          <Link className='login-from-signup' to='/login'>LOG IN</Link>

          <ul>
            { errors.map(error => <li key={error}>{error}</li>) }
          </ul>

          <form onSubmit={this.handleSubmit} className='form'>
            <div className='input-container'>
              <input type='text'
                placeholder='First Name'
                onChange={this.update('fname')}
              />
              <span className='error-msg'></span>
            </div>

            <div className='input-container'>
              <input type='text'
                placeholder='Last Name'
                onChange={this.update('lname')}
              />
              <span className='error-msg'></span>
            </div>

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

            <div className='birthday'>
              <select onChange={this.update('day')} 
                className='day' defaultValue='Day'>
                <option value='Day' disabled>Day</option>
                {
                  days.map(num => 
                    <option key={num} value={`${num}`}>{num}</option>)
                }
              </select>
            
              <select onChange={this.update('month')} 
                className='month' defaultValue='Month'>
                <option value='Month' disabled>Month</option>
                {
                  months.map((month, i) => 
                    <option key={month} value={`${i + 1}`}>{month}</option>)
                }
              </select>
            
              <select onChange={this.update('year')} 
                className='year' defaultValue='Year'>
                <option value='Year' disabled>Year</option>
                {
                  years.map(year => 
                    <option key={year} value={`${year}`}>{year}</option>)
                }
              </select>
            </div>

          <input type='submit' className='green-btn' value='Sign Up'/>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);

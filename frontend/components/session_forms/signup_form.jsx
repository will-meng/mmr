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

  componentDidMount() {
    this.props.removeErrors();
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.birthday = 
      this.state.year + '/' + this.state.month + '/' + this.state.day;
    this.props.signup(this.state)
      .then(() => this.props.history.push('/'), this.handleErrors.bind(this));
  }

  handleErrors() {
    ['Fname', 'Lname', 'Email', 'Password', 'Birthday'].forEach(field => {
      if (RegExp(field).test(this.props.errors)) {
        $(`#${field}e`).removeClass('hidden');
        $(`#${field}`).addClass('error-border');
        if (field === 'Birthday') $(`.${field}`).addClass('error-border');
      } else {
        $(`#${field}e`).addClass('hidden');
        $(`#${field}`).removeClass('error-border');
      }
    });
  }

  render() {
    
    return (
      <div className='auth-main'>
        <div className='signup-container'>
          <Link className='login-from-signup' to='/login'>LOG IN</Link>

          <form onSubmit={this.handleSubmit} className='form'>
            <div className='input-container'>
              <input type='text' id='Fname'
                placeholder='First Name'
                onChange={this.update('fname')}
                value={this.state.fname}
              />
              <span id='Fnamee' className='error-msg hidden'>
                First name is required.
              </span>
            </div>

            <div className='input-container'>
              <input type='text' id='Lname'
                placeholder='Last Name'
                onChange={this.update('lname')}
                value={this.state.lname}
              />
              <span id='Lnamee' className='error-msg hidden'>
                Last name is required.
              </span>
            </div>

            <div className='input-container'>
              <input type='text' id='Email'
                placeholder='Email'
                onChange={this.update('email')}
                value={this.state.email}
              />
              <span id='Emaile' className='error-msg hidden'>
                Email is required.
              </span>
            </div>

            <div className='input-container'>
              <input type='password' id='Password'
                placeholder='Password'
                onChange={this.update('password')}
              />
              <span id='Passworde' className='error-msg hidden'>
                Password must be at least 6 characters in length.
              </span>
            </div>

            <div className='birthday-container'>
              <div className='birthday'>
                <select onChange={this.update('day')} 
                  className='day Birthday' defaultValue='Day'>
                  <option value='Day' disabled>Day</option>
                  {
                    days.map(num => 
                      <option key={num} value={`${num}`}>{num}</option>)
                  }
                </select>
              
                <select onChange={this.update('month')} 
                  className='month Birthday' defaultValue='Month'>
                  <option value='Month' disabled>Month</option>
                  {
                    months.map((month, i) => 
                      <option key={month} value={`${i + 1}`}>{month}</option>)
                  }
                </select>
              
                <select onChange={this.update('year')} 
                  className='year Birthday' defaultValue='Year'>
                  <option value='Year' disabled>Year</option>
                  {
                    years.map(year => 
                      <option key={year} value={`${year}`}>{year}</option>)
                  }
                </select>
              </div>
              <span id='Birthdaye' className='error-msg hidden'>
                Birthday required
              </span>
            </div>

          <input type='submit' className='green-btn' value='Sign Up'/>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);

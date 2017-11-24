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
    if (this.props.loggedIn)
      this.props.history.push('/');
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.birthday = 
      this.state.year + '/' + this.state.month + '/' + this.state.day;
    this.props.signup(this.state);
  }

  render() {
    const { errors } = this.props;
    const errorClass = 'error-msg', hiddenClass='hidden';
    const fError = /Fname/.test(errors) ? errorClass : hiddenClass;
    const lError = /Lname/.test(errors) ? errorClass : hiddenClass;
    const eError = /Email/.test(errors) ? errorClass : hiddenClass;
    const pError = /Password/.test(errors) ? errorClass : hiddenClass;
    const bError = /Birthday/.test(errors) ? errorClass : hiddenClass;
    return (
      <div className='auth-main'>
        <div className='signup-container'>
          <Link className='login-from-signup' to='/login'>LOG IN</Link>

          <form onSubmit={this.handleSubmit} className='form'>
            <div className='input-container'>
              <input type='text'
                placeholder='First Name'
                onChange={this.update('fname')}
                value={this.state.fname}
              />
              <span className={fError}>First name is required.</span>
            </div>

            <div className='input-container'>
              <input type='text'
                placeholder='Last Name'
                onChange={this.update('lname')}
                value={this.state.lname}
              />
              <span className={lError}>Last name is required.</span>
            </div>

            <div className='input-container'>
              <input type='text'
                placeholder='Email'
                onChange={this.update('email')}
                value={this.state.email}
              />
              <span className={eError}>Email is required.</span>
            </div>

            <div className='input-container'>
              <input type='password'
                placeholder='Password'
                onChange={this.update('password')}
              />
              <span className={pError}>
                Password must be at least 6 characters in length.
              </span>
            </div>

            <div className='birthday-container'>
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
              <span className={bError}>Birthday required</span>
            </div>

          <input type='submit' className='green-btn' value='Sign Up'/>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);

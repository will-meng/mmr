import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <section className='homepage'>
    <div className='content'>
      <h1>MAKE EVERY MILE COUNT, 
        JOIN FREE TODAY
      </h1>
      <p>You pound the pavement, we provide the motivation. Plan each stride and
        <br/>learn from every route with MapMyRun.
      </p>
      <div className='signup-buttons'>
        <Link to='/login' className='demo-btn button'>Demo Login (cool!)</Link>
        or
        <Link to='/signup' className='signup-btn button'>Sign Up (lame!)</Link>
      </div>
      <div className='empty'></div>
      <div className="login-prompt">
        Already a member?
        <Link to='/login' className='login-btn button'>Log In</Link>
      </div>
      <p className='terms'> By joining MyMap.Run, you agree to the
        <Link to='/'> Terms and Conditions </Link> and
        <Link to='/'> Privacy Policy</Link>
      </p>
    </div>
  </section>
);
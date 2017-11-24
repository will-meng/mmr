import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <section className='homepage'>
      <div className='content'>
        <h1>MAKE EVERY MILE COUNT, 
          JOIN FREE TODAY
        </h1>
        <p>You pound the pavement, we provide the motivation. Plan each stride and
          <br/>learn from every route with MapMyRun.
        </p>
        <div className='signup-buttons'>
          <Link to='/login?demo' className='demo-btn button'>
            Demo Login (cool!)
          </Link>
          or
          <Link to='/signup' className='signup-btn orange-btn button'>
            Sign Up (lame!)
          </Link>
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

    <section className='features'>
      <div className="feature">
        <h2>Map Your Route</h2>
        <p>
            Know where you're going, see where you've been. We have over 70 million routes to chose from - or be bold and create your own.
        </p>
        <Link to="/route/create">Check it out</Link>
      </div>

      <div className="feature">
        <h2>Track Your Activity</h2>
        <p>
            Record activity with our mobile apps, import data from third-party devices, enter workouts manually and never miss a beat.
        </p>
        <Link to="/">Check it out</Link>
      </div>

      <div className="feature">
        <h2>Log Your Food</h2>
        <p>
            Fitness isn't just an activity, it's a lifestyle. Keep track of what you eat alongside your workouts to get a complete picture of your health.
        </p>
        <Link to="/">Check it out</Link>
      </div>

      <div className="feature">
        <h2>Share with Friends</h2>
        <p>
            Add a social twist to your exercise routine. Get extra encouragement, cheer on your buddies or start a little friendly competition.
        </p>
        <Link to="/">Check it out</Link>
      </div>
    </section>
  </div>
);
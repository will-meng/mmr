import React from 'react';
import { Link } from 'react-router-dom';

const navRight = (currentUser, logout, path) => {
   if (path !== '/signup' && path !== '/login')
    return currentUser ? (
      <div className='nav-right'>
        <Link to='/'>
          <div className='thumbnail-container'>
            <img src={`${currentUser.img_url}`} className='profile' alt="Profile Image"/>
          </div>
        </Link>
        <ul className='nav-submenu nav-dropdown'>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/profile'>My Profile</Link></li>
          <li><button className='logout-btn' onClick={logout}>Logout</button></li>
        </ul>
      </div> 
    ) : (
      <div className='nav-right'>
        <ul className='nav-menu'>
          <li><Link to='/login' className='nav-login-btn'>Log In</Link></li>
          <li><Link to='/signup' className='nav-signup-btn green-btn'>Sign Up</Link></li>
        </ul>
      </div> 
    );
  else
    return <div className='nav-right'></div>;
};
  
const NavBar = ({ currentUser, logout, path }) => (
  <nav className='nav'>
    <div className='nav-left'>
      <Link to='/'>
        <img alt="MapMyRun" className='logoImage' src="https://mapmy.uastatic.com/951e3794f22d8fe360605b039ee14d4b.svg"/>
      </Link>
      <ul className='nav-menu'>
        <li className='nav-training'>
          <Link to='/workout/create'>Training</Link>
          <ul className='training-submenu nav-dropdown'>
            <li><Link to='/workout/create'>Log Workout</Link></li>
            { currentUser ? (
            <li>
              <Link to={`/user/${currentUser.id}/workouts`}>My Workouts</Link>
            </li>
            ) : (null)
            }
          </ul>
        </li>
        <li className='nav-routes'>
          <Link to='/routes'>Routes</Link>
          <ul className='routes-submenu nav-dropdown'>
            <li><Link to='/routes'>All Routes</Link></li>
            <li><Link to='/route/create'>Create Route</Link></li>
            { currentUser ? (
              <li><Link to={`/user/${currentUser.id}/routes`}>My Routes</Link></li>
              ) : (null)
            }
          </ul>
        </li>
        <li className='nav-friends'>
          <Link to='/friends'>Community</Link>
            <ul className='friends-submenu nav-dropdown'>
              <li><Link to='/friends'>Friends</Link></li>
              <li><Link to='/friends/search'>Find Friends</Link></li>
            </ul>
        </li>
        <li><a href="#">Blog</a></li>
      </ul>
    </div>

    {navRight(currentUser, logout, path)}
  </nav>
);

export default NavBar;
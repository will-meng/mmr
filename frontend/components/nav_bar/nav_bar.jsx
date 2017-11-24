import React from 'react';
import { Link } from 'react-router-dom';

const navRight = (currentUser, logout, path) => {
   if (path !== '/signup' && path !== '/login')
    return currentUser ? (
      <div className='nav-right'>
        <img src={`${currentUser.img_url}`} alt="Profile Image"/>
        <ul className='nav-submenu'>
          <li><Link to='/' className='friends-btn'>Friends</Link></li>
          <li><Link to='/' className='settings-btn'>Settings</Link></li>
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
        <li><a href="#">Training</a></li>
        <li><Link to='/route/create'>Routes</Link></li>
        <li><a href="#">Challenges</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
    </div>

    {navRight(currentUser, logout, path)}
  </nav>
);

export default NavBar;
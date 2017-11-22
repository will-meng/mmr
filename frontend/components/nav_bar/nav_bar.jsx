import React from 'react';
import { Link } from 'react-router-dom';


const navRight = (currentUser, logout) => (
   currentUser ? (
    <div className='nav-right'>
      <p>{currentUser.fname}</p>
      <button className='logout' onClick={logout}>Logout</button>
    </div> 
  ) : (
    <div className='nav-right'>
      <Link to='/login'>Log In</Link>
      <Link to='/signup' className='nav-signup-btn'>Sign Up</Link>
    </div> 
  )
);
  
const NavBar = ({currentUser, logout}) => (
  <nav className='nav'>
    <div className='nav-left'>
      <img alt="MapMyRun" className='logoImage' src="https://mapmy.uastatic.com/951e3794f22d8fe360605b039ee14d4b.svg"/>
      <ul className='nav-menu'>
        <li><a href="#">Training</a></li>
        <li><a href="#">Routes</a></li>
        <li><a href="#">Challenges</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
    </div>

    {navRight(currentUser, logout)}
  </nav>
);



export default NavBar;
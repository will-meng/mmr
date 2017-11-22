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
      <Link to='/login' className='login'>LOG IN</Link>
      <Link to='/signup' className='signup'>SIGN UP</Link>
    </div> 
  )
);
  
const NavBar = ({currentUser, logout}) => (
  <nav>
    <img alt="MapMyRun" className='logoImage' src="https://mapmy.uastatic.com/951e3794f22d8fe360605b039ee14d4b.svg"/>
    {navRight(currentUser, logout)}
  </nav>
);



export default NavBar;
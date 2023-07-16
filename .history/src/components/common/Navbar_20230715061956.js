// Navbar.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {
  const loggedIn = useSelector(state => state.user.loggedIn);

console.log('loggedIn:', loggedIn);

  return (
    <nav>
      <ul className='navbar-nav'>
        <li className='nav-item'><Link className='App-link' to='/courses'>Course Catalog</Link></li>
        {loggedIn ? (
          <>
            {/* The user is logged in, show the dashboard and logout options */}
            <li className='nav-item'><Link className='App-link' to='/dashboard'>Your Dashboard</Link></li>
            <li className='nav-item'><Link className='App-link' to='/logout'>Logout</Link></li>
          </>
        ) : (
          <>
            {/* The user is not logged in, show the register and login options */}
            <li className='nav-item'><Link className='App-link' to='/register'>Register</Link></li>
            <li className='nav-item'><Link className='App-link' to='/login'>Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

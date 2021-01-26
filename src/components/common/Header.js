import React from 'react';
import { Dropdown } from 'bootstrap';

import { NavLink } from 'react-router-dom';
import { AboutPage } from '../about/About';

const Header = () => {
  const activeClassName = 'active';

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          G
        </NavLink>
        <button
          className='navbar-toggler btn'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarOpts'
          aria-controls='navbarOpts'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <i className='bi bi-list'></i>
        </button>
        <div className='collapse navbar-collapse' id='navbarOpts'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeClassName={activeClassName}
                to='/'
                exact
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeClassName={activeClassName}
                to='/calc'
              >
                Calculator
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeClassName={activeClassName}
                to='/about'
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useState } from 'react';
import { Link, NavLink as RouterNavLink} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

// import { NavLink } from 'react-router-dom';
import AboutPage from '../about/About';
import brandLogo from '../../assets/g-damage-logo-2.svg';

const Header = () => {
  const activeClassName = 'active';
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color='primary' dark expand='md' className='navbar'>
      <div className='container-fluid'>
        <NavbarBrand to='/'>
          <img src={brandLogo} min-width='50' alt='g-damage-calc logo' />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className='navbar-collapse' navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/"
              activeClassName="active" exact>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/calc" activeClassName="active">Calc</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/about" activeClassName="active">About</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;

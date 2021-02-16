import React, { useEffect, useState } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import styled from 'styled-components';

import brandLogo from '../../assets/g-damage-logo-2.svg';

const NavContainer = styled.div`
  flex-wrap: ${(props: { collapse: boolean }) => {
    return props.collapse ? 'wrap' : 'nowrap';
  }};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// TODO: In here I'm hard-coding the dropdown height: I'm not a fan
const NavCollapse = styled.div`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: ${(props: { navDropdown: boolean; height: string }) => {
    if (props.navDropdown) {
      return '120px';
    } else {
      return '0px';
    }
  }};
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

const NavFlat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NavList = styled.ul`
  flex-direction: ${(props: { collapse: boolean }) => {
    return props.collapse ? 'column' : 'row';
  }};
`;

const Header = () => {
  const [collapse, setCollapse] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 750) {
        setCollapse(true);
        setNavDropdown(false);
      } else {
        setCollapse(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ListItems = () => {
    return (
      <NavList className='navbar-nav' collapse={collapse}>
        <li className='nav-item'>
          <RouterNavLink
            className='nav-link px-2'
            activeClassName='active'
            to='/'
            exact
          >
            Home
          </RouterNavLink>
        </li>
        <li className='nav-item'>
          <RouterNavLink
            className='nav-link px-2'
            activeClassName='active'
            to='/calc'
          >
            Calc
          </RouterNavLink>
        </li>
        <li className='nav-item'>
          <RouterNavLink
            className='nav-link px-2'
            activeClassName='active'
            to='/about'
          >
            About
          </RouterNavLink>
        </li>
      </NavList>
    );
  };

  return (
    <nav className='navbar navbar-dark bg-primary'>
      <NavContainer className='px-3' collapse={collapse}>
        <a className='navbar-brand' href='/'>
          <img src={brandLogo} min-width='50' alt='g-damage-calc logo' />
        </a>
        {collapse ? (
          <>
            <button
              className='btn navbar-toggler'
              onClick={() => setNavDropdown(!navDropdown)}
            >
              <i className='bi bi-list'></i>
            </button>
            <NavCollapse navDropdown={navDropdown}>
              <ListItems />
            </NavCollapse>
          </>
        ) : (
          <NavFlat>
            <ListItems />
          </NavFlat>
        )}
      </NavContainer>
    </nav>
  );
};

export default Header;

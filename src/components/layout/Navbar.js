/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavbarLinks from './NavbarLinks';

const Navbar = props => {
  const handleClick = () => {
    const nav = document.querySelector('.nav-menu');
    nav.classList.toggle('open');
  };

  return (
    <header id="header" className="fixed-top">
      <div className="container-fluid d-flex align-items-center">
        <h1 className="logo mr-auto"><Link to="/">DTW-EXAM</Link></h1>
        <span className="mobile-nav-toggle" id="toggle" onClick={handleClick}>
          <i className="ri-menu-5-fill" />
        </span>
        <nav className="nav-menu">
          <NavbarLinks userInfo={props} />
        </nav>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(Navbar);

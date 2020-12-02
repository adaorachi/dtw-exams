import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavbarLinks from './NavbarLinks';

const Navbar = props => (
  <header id="header" className="fixed-top">
    <div className="container-fluid d-flex align-items-center">
      <h1 className="logo mr-auto"><Link to="/">DTW-EXAM</Link></h1>
      <nav className="nav-menu d-none d-lg-block">
        <NavbarLinks userInfo={props} />
      </nav>
    </div>
  </header>
);

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(Navbar);

/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { clearExamSubjects } from '../../store/actions/examActions';

const NavbarLinks = props => {
  const { userInfo, signOut } = props;
  const { auth, profile } = userInfo;

  const dropdownItemsForPE = {
    dropdownList: ['JAMB Practice Exam', 'WAEC Practice Exam', 'NECO Practice Exam'],
    dropdownListURL: ['jamb', 'wassce', 'neco'],
  };
  const userList = {
    dropdownList: ['Edit Profile', 'Account', 'Logout'],
    dropdownListURL: ['edit-profile', 'account', 'logout'],
  };

  const handleLogout = e => {
    e.preventDefault();
    signOut();
    const { history } = props;
    history.push('/');
  };

  return (
    <ul>
      <li><NavLink to="/">Past Questions</NavLink></li>
      <li className="drop-down">
        <NavLink to="#">Practice Exam</NavLink>
        <i className="ri-arrow-down-s-line" />
        <ul>
          {dropdownItemsForPE.dropdownList.map((link, ind) => (
            <li key={link}><Link to={`/practise-exam/${dropdownItemsForPE.dropdownListURL[ind]}`}>{link}</Link></li>
          ))}
        </ul>
      </li>
      <li><NavLink to="/">Courses</NavLink></li>
      <li><NavLink to="/">Ask a Question</NavLink></li>

      {(auth.uid && profile.firstName) ? (
        <li className="avatar drop-down drop-down-left">
          <span className="avatar-initials">{profile.firstName[0]}</span>
          <span className="font-weight-bold username">
            &nbsp;
            {profile.firstName}
          </span>
          <ul>
            {userList.dropdownList.map((link, ind) => {
              if (link === 'Logout') {
                return (<li key={link}><a href="#" onClick={e => handleLogout(e)}>{link}</a></li>);
              }
              return (
                <li key={link}><Link to={`/${userList.dropdownListURL[ind]}`}>{link}</Link></li>
              );
            })}
          </ul>
        </li>
      )
        : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </>
        )}
    </ul>
  );
};

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(clearExamSubjects()).then(() => dispatch(signOut())),
});

export default withRouter(connect(null, mapDispatchToProps)(NavbarLinks));

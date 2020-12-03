/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      email: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.outputMessage = this.outputMessage.bind(this);
  }

  outputMessage = message => `<div class="alert alert-danger alert-dismissible fade show mb-0" id="alert-box" role="alert">
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`

  handleSubmit = e => {
    e.preventDefault();
    const len = Object.entries(this.state).filter(i => (i[1] === ''));
    if (len <= 0) {
      const { signUp } = this.props;
      signUp(this.state);
    } else {
      const errorCont = document.querySelector('.error-container');
      errorCont.innerHTML = this.outputMessage('Enter all fields!');
    }
    // e.target.reset();
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const { auth, authError } = this.props;

    let msg;
    if (authError === 'The email address is badly formatted.') {
      msg = 'Input correct email address!';
    } else if (authError === 'The email address is already in use by another account.') {
      msg = 'Email Address is already in use!';
    } else {
      msg = authError;
    }

    if (authError) {
      const errorCont = document.querySelector('.error-container');
      errorCont.innerHTML = this.outputMessage(msg);
    }

    if (auth.uid) return (<Redirect to="/" />);

    return (
      <div className="card form-card">
        <div className="auth-page">
          <div className="form-header mb-0">
            <h1 className="mb-2">Create a DTW-Exam Account</h1>
            <div className="error-container" />
          </div>
          <div className="form">
            <form className="register-form" onSubmit={this.handleSubmit}>
              <input id="first_name" type="text" placeholder="First Name" onChange={this.handleChange} />
              <input id="last_name" type="text" placeholder="Last Name" onChange={this.handleChange} />
              <input id="username" type="text" placeholder="Username" onChange={this.handleChange} />
              <input id="email" type="email" placeholder="Email" onChange={this.handleChange} />
              <input id="password" type="password" placeholder="Password" onChange={this.handleChange} />
              <button className="form-button" type="submit">Register</button>
              <p className="message">
                Already registered?
                {' '}
                <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  signUp: newCreds => dispatch(signUp(newCreds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

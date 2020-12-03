/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const errorCont = document.querySelector('.error-container');
    if (location.loginStatus === false) {
      errorCont.innerHTML = this.outputMessage('You must be logged in to start exam');
    }
  }

  outputMessage = message => `<div class="alert alert-danger alert-dismissible fade show mb-0" id="alert-box" role="alert">
  ${message}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`

  handleSubmit = e => {
    e.preventDefault();
    const { signIn } = this.props;
    signIn(this.state);
    // e.target.reset();

    const { authError } = this.props;
    if (authError) {
      const errorCont = document.querySelector('.error-container');
      errorCont.innerHTML = this.outputMessage(authError);
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const { auth } = this.props;

    if (auth.uid) return (<Redirect to="/" />);

    return (
      <div className="card form-card">
        <div className="auth-page">
          <div className="form-header mb-0">
            <h1 className="mb-2">Login to DTW-Exam</h1>
            <div className="error-container" />
          </div>
          <div className="form">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <input id="email" type="email" placeholder="Email" onChange={this.handleChange} />
              <input id="password" type="password" placeholder="Password" onChange={this.handleChange} />
              <button className="form-button" type="submit">Login</button>
              <p className="message"><Link to="/register">Forgot your password?</Link></p>
              <p className="message">
                Not registered?
                {' '}
                <Link to="/register">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.authError,
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  signIn: creds => dispatch(signIn(creds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

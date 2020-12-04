/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ExamProfile from '../../snippets/user/ExamProfile';
import image from '../../../assets/img/avatar.png';
import { getExamScores } from '../../../store/actions/examActions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { getExamScores } = this.props;
    getExamScores();
  }

  render() {
    const { examScore, profile } = this.props;

    return (
      <div className="profile-page">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12 col-sm-3">
              <div className="card profile-card m-auto text-white mb-3">
                <h5 className="card-header bg-success">
                  {(profile.firstName) ? (
                    <>
                      {profile.firstName}
                      {' '}
                      {profile.lastName}
                      <br />
                      <small>{profile.username}</small>
                    </>
                  ) : ('')}
                </h5>
                <img src={image} className="card-img-top" alt="" width="100" />
                <div className="card-body">
                  <p className="card-text">
                    <Link to="/" className="form-button">Edit Profile</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-9">
              <ExamProfile examScore={examScore} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  examScore: state.subjects.examScore,
});

const mapDispatchToProps = dispatch => ({
  getExamScores: () => dispatch(getExamScores()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

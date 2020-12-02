/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAnalysis from '../../snippets/examSummary/TimeAnalysis';
import ExamOverview from '../../snippets/examSummary/ExamOverview';
import ExamScores from '../../snippets/examSummary/ExamScores';

class ExamSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClearExam = this.handleClearExam.bind(this);
    this.handleUpdatepath = this.handleUpdatepath.bind(this);
  }

  componentDidMount() {
    const { getExamScores } = this.props;
    getExamScores();
  }

  handleClearExam = e => {
    const { clearExam } = this.props;
    clearExam();
    e.preventDefault();
  }

  handleUpdatepath = e => {
    const { updatePath } = this.props;
    updatePath('', 'view-explanation');
    e.preventDefault();
  }

  render() {
    const { examScore } = this.props;

    return (
      <div className="jambPE-page">
        <div className="notification-container redirect-error-container" id="redirect-error" />
        <div className="breadcrumbs">

          <div className="container">
            <h2>Examination Summary and Performance</h2>
            <p>mem</p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="card p-3 my-3 col-9 border-card">
              <div className="row">
                <ExamScores examScore={examScore} />
                <div className="col-lg-5">
                  <TimeAnalysis examScore={examScore} />
                </div>
              </div>
              <hr />
              <div className="row p-4">
                <div className="col-12">
                  <ExamOverview examScore={examScore} />
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <Link className="form-button max-width" to="#" onClick={e => this.handleUpdatepath(e)}>
                  View Correct Answers
                </Link>
                <Link className="form-button max-width" to="#" onClick={e => this.handleClearExam(e)}>
                  Start Another Exam
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamSummary;

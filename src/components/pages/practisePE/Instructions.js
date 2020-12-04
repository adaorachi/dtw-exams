/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { subjectList } from '../../snippets/utils/Utils';

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 'Random',
    };

    this.handleClearExamMode = this.handleClearExamMode.bind(this);
    this.handleUpdateExamPath = this.handleUpdateExamPath.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClearExamMode = (e, action) => {
    const { clearExam } = this.props;
    clearExam(action);
    e.preventDefault();
  }

  handleUpdateExamPath = e => {
    const { updatePath } = this.props;
    const { year } = this.state;
    updatePath(year, 'cbt-exam');
    e.preventDefault();
  }

  handleChange = e => {
    this.setState({
      year: e.target.value,
    });
  }

  render() {
    const { userSubject, history, match } = this.props;
    const getSelectedSubject = userSubject;
    const { params } = match;

    const selectYear = ['Random', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
    const selectedYear = selectYear.map(year => (
      <>
        <option value={year}>{year}</option>
      </>
    ));

    return (
      <div className="instruction-page">
        <div className="breadcrumbs">
          <div className="container">
            <h2>Instructions</h2>
            <p>Please read the following instructions carefully before starting the exam. </p>
          </div>
        </div>
        <div className="container">
          <div className="card p-3 my-3 border-card features">
            <div className="card-body">
              <div className="card-tabs mb-4">
                <div className="row">
                  <div className="col-lg-6 col-md-6 mt-4">
                    <div className="icon-box">
                      <i className="ri-bar-chart-box-line" style={{ color: '#4caf50' }} />
                      <h3>
                        Test:
                        {' '}
                        {params.subSlug.toUpperCase()}
                        {' '}
                        CBT
                      </h3>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mt-4">
                    <div className="icon-box">
                      <i className="ri-bar-chart-box-line" style={{ color: '#4caf50' }} />
                      <div>
                        <h3>
                          Total Time: 35 mins
                        </h3>
                        <h3>
                          Total Number of Questions: 50
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mt-4">
                    <div className="icon-box">
                      <i className="ri-bar-chart-box-line" style={{ color: '#4caf50' }} />
                      <h3>
                        Subject:
                        <span className="selected-subject-list">
                          {' '}
                          {getSelectedSubject && (getSelectedSubject.map((sub, ind) => (ind === 3 ? <span key={sub}>{subjectList[sub]}</span> : <span key={sub}>{`${subjectList[sub]}, `}</span>)))}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 mt-4">
                    <div className="icon-box">
                      <i className="ri-bar-chart-box-line" style={{ color: '#4caf50' }} />
                      <h3 className="d-md-flex w-100">
                        Select Year:
                        <select onChange={this.handleChange} defaultValue="Random" className="custom-select">
                          {selectedYear}
                        </select>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h4>Please Read All</h4>
                <p>
                  <i className="ri-checkbox-circle-line icon-green" />
                  You will be given 20 questions in English Language and 10 questions on each of the other subjects (a total of 50 questions). The questions will be presented 1 each in series starting with English Language.
                </p>
                <p>
                  <i className="ri-checkbox-circle-line icon-green" />
                  You will be given 35 mins to answer all 50 questions and submit.
                </p>
                <p>
                  <i className="ri-checkbox-circle-line icon-green" />
                  If you do not have an instant idea of a question you can skip it by clicking on the next button, you can re-attempt the skipped question when you have attempted others.
                </p>
                <p>
                  <i className="ri-checkbox-circle-line icon-green" />
                  The attempted questions will have their button colored below the page.
                </p>
                <p>
                  <i className="ri-checkbox-circle-line icon-green" />
                  Upon answering your questions, you can click on each question button below to re-visit the question.
                  {' '}
                </p>
                <p>
                  <i className="ri-checkbox-circle-line icon-green" />
                  Clicking on the submit button will give you the opportunity to submit your test.
                </p>
                <p>
                  <i className="ri-checkbox-circle-line icon-green" />
                  In the event of exhausting your maximum allowed time , the system will end the test and automatically submit it for grading.
                </p>
                <p>
                  <i className="ri-checkbox-circle-line icon-green" />
                  Your ranking will be based on a cumulative of all your scores this week and the number of free exams written. The time taken to finish each exam will also be taken into consideration. So you have to keep trying new exams for FRESH SET OF QUESTIONS to gain more points and rise in ranking. Keep trying everytime, everyday and your coming exam will be a walk-over for you.
                </p>
                <p>
                  <i className="ri-checkbox-circle-line icon-green" />
                  To start now, click on the &quot;Start Exam&quot; button below.
                </p>
              </div>
              <div className="text-center text-md-left">
                <div className="mt-3 d-block d-md-inline ml-2">
                  <Link to="#" onClick={e => this.handleUpdateExamPath(e)} className="form-button">Start Exam</Link>
                </div>
                <div className="mt-3 d-block d-md-inline ml-2">
                  <Link to="#" onClick={e => this.handleClearExamMode(e, '')} className="form-button">Change Subjects</Link>
                </div>
                <div className="mt-3 d-block d-md-inline ml-2">
                  <Link to="#" onClick={e => this.handleClearExamMode(e, history.push('/'))} className="form-button">Quit Exam</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Instructions);

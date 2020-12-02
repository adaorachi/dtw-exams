/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import QuestionContainer from '../../snippets/cbt/QuestionContainer';

class CBTExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      subjectInfo, clearExam, submitExam, year,
    } = this.props;

    const { examSubjects } = subjectInfo;

    return (
      <div className="cbt-page">
        <div className="breadcrumbs">
          <div className="container">
            <h2>Exam In Session ...</h2>
          </div>
        </div>
        {examSubjects && examSubjects.length === 4 ? <QuestionContainer subjectInfo={subjectInfo} clearExam={clearExam} submitExam={submitExam} year={year} /> : ''}
      </div>
    );
  }
}

export default CBTExam;

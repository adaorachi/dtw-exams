/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import QuestionContainer from '../../snippets/cbt/QuestionContainer';

class ViewExplanation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      clearExam, subjectInfo, examReview,
    } = this.props;
    const { questionData } = subjectInfo;

    return (
      <div className="cbt-page">
        <div className="breadcrumbs">
          <div className="container">
            <h2>{(!examReview) ? 'Exam In Session ...' : 'Exam Review' }</h2>
          </div>
        </div>
        {questionData ? <QuestionContainer subjectInfo={subjectInfo} clearExam={clearExam} examReview={examReview} /> : ''}
      </div>
    );
  }
}

export default ViewExplanation;

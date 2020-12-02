/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  examSubjects,
  getExamSubjects,
  clearExamSubjects,
  updateExamPath,
  submitExam,
  getExamScores,
} from '../../../store/actions/examActions';
import { clearTimerInterval } from '../../snippets/utils/Utils';
import Instructions from './Instructions';
import ChooseSubjects from './ChooseSubjects';
import CBTExam from './CBTExam';
import ExamSummary from './ExamSummary';
import ViewExplanation from './ViewExplanation';

class JambPE extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { getExamSubjects } = this.props;
    getExamSubjects();
  }

  componentDidUpdate(prevProps) {
    const { subjectInfo, match, clearExamSubjects } = this.props;
    const { examPath } = subjectInfo;
    if (examPath !== prevProps.subjectInfo.examPath) {
      window.scrollTo(0, 0);
    }
    if (match.params.subSlug !== prevProps.match.params.subSlug) {
      clearExamSubjects();
    }
  }

  componentWillUnmount() {
    const { clearExamSubjects, subjectInfo } = this.props;
    const { examPath } = subjectInfo;
    if (examPath === 'cbt-exam') {
      clearExamSubjects();
      clearTimerInterval();
    }
  }

  render() {
    const {
      subjectInfo, auth, submitSubjects, clearExamSubjects, updateExamPath, submitExam, getExamScores,
    } = this.props;

    const {
      examPath, examSubjects, examScore, year,
    } = subjectInfo;

    return (
      <>
        {examPath === 'choose-subjects'
          ? (
            <ChooseSubjects auth={auth} userSubject={examSubjects} submitSubjects={submitSubjects} />
          ) : (examPath === 'instructions') ? (
            <Instructions userSubject={examSubjects} clearExam={clearExamSubjects} updatePath={updateExamPath} />
          ) : (examPath === 'cbt-exam') ? (
            <CBTExam subjectInfo={subjectInfo} clearExam={clearExamSubjects} submitExam={submitExam} year={year} />
          ) : (examPath === 'conclude-exam') ? (
            <ExamSummary clearExam={clearExamSubjects} getExamScores={getExamScores} examScore={examScore} updatePath={updateExamPath} />
          ) : (examPath === 'view-explanation') ? (
            <ViewExplanation clearExam={clearExamSubjects} getExamScores={getExamScores} subjectInfo={subjectInfo} examReview />
          ) : (
            <Redirect to="/" />
          )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  subjectInfo: state.subjects,
});

const mapDispatchToProps = dispatch => ({
  submitSubjects: (subjects, path) => dispatch(examSubjects(subjects, path)),
  getExamSubjects: () => dispatch(getExamSubjects()),
  clearExamSubjects: action => dispatch(clearExamSubjects()).then(() => (action)),
  updateExamPath: (year, path) => dispatch(updateExamPath(year, path)),
  submitExam: (dataSet, resetSet) => dispatch(submitExam(dataSet, resetSet)),
  getExamScores: () => dispatch(getExamScores()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JambPE);

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { timeLeft, calculateExamScore, clearTimerInterval } from '../utils/Utils';

export default function NavigationButtons(props) {
  const [dateNow, setDateNow] = useState(0);
  const [options, setOptions] = useState(0);
  useEffect(() => {
    setDateNow(Date.now());
    setOptions(document.querySelectorAll('.custom-control-input').length);
  }, []);

  const {
    answers, id, ind, item, navClick, submitExam, data, examReview, clearExam,
  } = props;

  const handleNavClick = (e, sub, length) => {
    navClick(e, sub, length);
  };

  const handleExamSubmit = e => {
    const cal = calculateExamScore(data, answers);
    const dataSet = {
      examType: 'JAMB',
      examLength: cal.questionLength,
      timeLeft: timeLeft(),
      totalTime: '00:30:00',
      examScore: cal.correctAnswers,
      attemptedQuestions: cal.attemptedQuestions,
      startTime: dateNow,
    };

    const resetSet = {
      submittedAnswers: answers,
      questionData: data,
    };
    submitExam(dataSet, resetSet);
    clearTimerInterval();
    e.preventDefault();
  };

  const handleClearExam = e => {
    clearExam();
    clearTimerInterval();
    e.preventDefault();
  };

  // eslint-disable-next-line no-prototype-builtins
  if (answers[item.subject].hasOwnProperty(id)) {
    const aa = answers[item.subject][`${id}`];
    const optionsList = {
      a: 0, b: 1, c: 2, d: 3, e: 4,
    };
    if (aa !== '' && options > 0) {
      const optionMap = parseInt(optionsList[aa], 10);
      const optionsdd = document.getElementsByName(`options-${item.subject}`)[optionMap];
      optionsdd.checked = true;
    }
  }

  return (
    <div className="navigation-buttons my-3">
      <div className="row">
        <div className="col-button mx-2">
          <span className="previous">
            <a key={ind} href="#" className="form-button d-inline-block" id="prev" onClick={e => handleNavClick(e, item.subject, item.questions.length)}>
              <i className="ri-arrow-left-line nav-icon" />
              {' '}
              Previous
            </a>
          </span>
        </div>
        <div className="col-button mx-2">
          <span className="next">
            <a key={ind} href="#" className="form-button d-inline-block" id="next" onClick={e => handleNavClick(e, item.subject, item.questions.length)}>
              Next
              <i className="ri-arrow-right-line nav-icon" />
            </a>
          </span>
        </div>
      </div>
      {(!examReview) ? (
        <div className="row mt-4 lower-row">
          <div className="col-button m-2">
            <span className="submit">
              <a href="#" onClick={e => handleClearExam(e)} className="form-button d-inline-block">
                Quit Exam
              </a>
            </span>
          </div>
          <div className="col-button m-2">
            <span className="submit">
              <a href="#" onClick={e => handleExamSubmit(e)} className="form-button d-inline-block">
                Submit Exam
              </a>
            </span>
          </div>
        </div>
      ) : (
        <div className="row mt-4 lower-row">
          <div className="col-button m-2">
            <span className="submit">
              <a href="#" onClick={e => handleClearExam(e)} className="form-button max-width d-inline-block">
                Start another Exam
              </a>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import renderHTML from 'react-render-html';
import { compareAnswers, sortObject } from '../utils/Utils';

export default function QuestionOptions(props) {
  const {
    id, option, item, answerChange, examReview, submittedAnswers, questionData,
  } = props;
  const handleAnswerChange = (e, sub, id) => {
    answerChange(e, sub, id);
  };

  return (
    <div className="options py-4">
      <form id={`form-${id}`} className="form-options">
        {Object.entries(sortObject(option)).map(entry => (
          <div className="option d-flex align-items-center mb-3" key={entry[0]}>
            <span className="mr-4">
              (
              {entry[0].toUpperCase()}
              )
            </span>
            <span className="custom-control custom-radio d-flex align-items-center">
              {(!examReview) ? (
                <input type="radio" className="custom-control-input" id={`option-${id}-${entry[0]}`} name={`options-${item.subject}`} value={entry[0]} onChange={e => handleAnswerChange(e, item.subject, id)} />
              ) : (
                <input type="radio" className="custom-control-input" id={`option-${id}-${entry[0]}`} name={`options-${item.subject}`} value={entry[0]} disabled />
              )}
              <label className="custom-control-label" htmlFor={`option-${id}-${entry[0]}`}>{entry[1]}</label>
              {(examReview) ? (
                <span>
                  &nbsp;
                  {renderHTML(compareAnswers(questionData, item.subject, entry[0], id, submittedAnswers)[0])}
                </span>
              ) : ('')}
            </span>
          </div>
        ))}
        {(examReview) ? (
          <small className="text-danger">
            {' '}
            {compareAnswers(questionData, item.subject, '', id, submittedAnswers)[1]}
          </small>
        ) : ('')}
      </form>
    </div>
  );
}

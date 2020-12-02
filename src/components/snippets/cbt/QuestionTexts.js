/* eslint-disable react/prop-types */
import React from 'react';
import renderHTML from 'react-render-html';

export default function QuestionTexts(props) {
  const {
    length, questionIndex, section, question,
  } = props;

  return (
    <div>
      <div className="font-weight-bold mb-2">
        Question
        {' '}
        {questionIndex + 1}
        {' '}
        of
        {' '}
        {length}
      </div>
      <div className="question d-flex">
        <span>
          {questionIndex + 1}
          . &nbsp; &nbsp;
        </span>
        <span>
          {section && (
          <div className="section-question">{renderHTML(section.trim().charAt(0).toUpperCase() + section.trim().slice(1))}</div>
          )}
          {question && (
            <div className="question-text">{renderHTML(question)}</div>
          )}
        </span>
      </div>
    </div>
  );
}

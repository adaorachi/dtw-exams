/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { compareAForQT } from '../utils/Utils';

export default function QuestionButtons(props) {
  const {
    item, navClick, examReview, submittedAnswers, questionData,
  } = props;
  const handleNavClick = (e, sub, length) => {
    navClick(e, sub, length);
  };
  return (
    <div className={`question-tabs question-tabs-${item.subject} d-flex flex-wrap`}>
      {item.questions.map((it, ind) => {
        if (!examReview) {
          return (
            <button type="button" key={it.id} className="tab-button form-button num-button mr-2 mb-1" data-id={ind + 1} data-key={it.id} onClick={e => handleNavClick(e, item.subject, item.questions.length)}>{ind + 1}</button>
          );
        }
        return (
          <button type="button" key={it.id} className="tab-button form-button num-button mr-2 mb-1" data-id={ind + 1} data-key={it.id} onClick={e => handleNavClick(e, item.subject, item.questions.length)} data-style={compareAForQT(questionData, item.subject, it.id, submittedAnswers)}>{ind + 1}</button>
        );
      })}
    </div>
  );
}

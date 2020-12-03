/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { compareAForQT } from '../utils/Utils';

export default function QuestionButtons(props) {
  const {
    item, navClick, examReview, submittedAnswers, questionData,
  } = props;

  useEffect(() => {
    const firstTab = document.querySelectorAll(`.question-tabs-${item.subject} .tab-button`)[0];
    firstTab.classList.add('shadow-tab');
  }, []);

  const handleNavClick = (e, sub, length, id) => {
    navClick(e, sub, length);
    const allTabs = document.querySelectorAll(`.question-tabs-${sub} .tab-button`);

    allTabs.forEach(tab => {
      const tabId = tab.id;
      if (tabId === id.toString()) {
        tab.classList.add('shadow-tab');
      } else {
        tab.classList.remove('shadow-tab');
      }
    });
  };
  return (
    <div className={`question-tabs question-tabs-${item.subject} d-flex flex-wrap`}>
      {item.questions.map((it, ind) => {
        if (!examReview) {
          return (
            <button type="button" key={it.id} className="tab-button form-button num-button m-1" data-id={ind + 1} data-key={it.id} id={it.id} onClick={e => handleNavClick(e, item.subject, item.questions.length, it.id)}>{ind + 1}</button>
          );
        }
        return (
          <button type="button" key={it.id} className="tab-button form-button num-button m-1" data-id={ind + 1} data-key={it.id} id={it.id} onClick={e => handleNavClick(e, item.subject, item.questions.length, it.id)} data-style={compareAForQT(questionData, item.subject, it.id, submittedAnswers)}>{ind + 1}</button>
        );
      })}
    </div>
  );
}

/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../pages/Loader';
import SubjectTabs from './SubjectTabs';
import ExamInfo from './ExamInfo';
import NavigationButtons from './NavigationButtons';
import QuestionButtons from './QuestionButtons';
import QuestionOptions from './QuestionOptions';
import QuestionTexts from './QuestionTexts';
import ExamReviewExplanation from './ExamReviewExplanation';
import { apiCall, examReviewCall } from './apiCall';

const QuestionContainer = props => {
  const {
    clearExam, submitExam, year, match, subjectInfo, examReview,
  } = props;
  const { submittedAnswers, questionData, examSubjects } = subjectInfo;
  const [data, setData] = useState([]);
  const [nav, setNav] = useState({});
  const [answers, setAnswers] = useState({});

  const { params } = match;

  const yearSelected = () => {
    if (year !== 'Random') return `&year=${year}`;
    return '';
  };

  const questionNo = sub => {
    if (sub !== 'english') return '10';
    return '20';
  };

  useEffect(() => {
    if (!examReview) {
      const getSelectedSubject = examSubjects;
      const cors = 'https://stark-taiga-63457.herokuapp.com/';
      if (getSelectedSubject && getSelectedSubject.length === 4) {
        const examSubjects2 = getSelectedSubject.map(examID => axios.get(`${cors}https://questions.aloc.ng/api/q/${questionNo(examID)}?subject=${examID}&type=${params.subSlug}${yearSelected()}`));
        Promise.all(examSubjects2)
          .then(result => {
            const { array, subjArray, subjAnswers } = apiCall(result);

            setData([...array]);
            setNav(subjArray);
            setAnswers(subjAnswers);
          })
          .catch(error => {
            throw error;
          });
      }
    } else {
      const { submittedAnswers, questionData } = subjectInfo;
      const { subjArray } = examReviewCall(questionData);
      setData(questionData);
      setAnswers(submittedAnswers);
      setNav(subjArray);
    }
  }, []);

  const handleNavClick = (e, sub, length) => {
    let navNo = 0;
    if (e.target.id === 'prev') {
      navNo = nav[sub] <= 1 ? 1 : nav[sub] - 1;
      setNav({ ...nav, [sub]: navNo });
    } else if (e.target.id === 'next') {
      navNo = nav[sub] >= length ? length : nav[sub] + 1;
      setNav({ ...nav, [sub]: navNo });
    } else if (e.target.classList.contains('num-button')) {
      setNav({ ...nav, [sub]: parseInt(e.target.getAttribute('data-id'), 10) });
    }

    const ele = document.getElementsByName(`options-${sub}`);
    for (let i = 0; i < ele.length; i += 1) {
      ele[i].checked = false;
    }

    e.preventDefault();
  };

  const handleAnswerChange = (e, sub, id) => {
    const aa = { ...answers[sub], [id]: e.target.value };
    setAnswers({
      ...answers,
      [sub]: aa,
    });
    const allTabs = document.querySelectorAll(`.question-tabs-${sub} .tab-button`);
    allTabs.forEach(tab => {
      const dataId = tab.getAttribute('data-key');
      if (aa[dataId] !== '') {
        tab.classList.add('attempted');
      }
    });
  };

  let questionPanel = '';
  let examInfo = '';
  if (data && Object.keys(nav).length > 0 && Object.keys(answers).length > 0 && data.length > 0) {
    questionPanel = data.map((item, ind) => {
      const questionIndex = nav[item.subject] - 1;
      const {
        question, section, option, id,
      } = item.questions[questionIndex];

      return (
        <div key={item.subject} className={`tab-pane fade show ${ind === 0 ? 'active' : ''} p-3`} id={`pills-${item.subject}`} role="tabpanel" aria-labelledby={`pills-${item.subject}-tab`}>
          {/* <div>{JSON.stringify(answers)}</div> */}

          <QuestionButtons item={item} ind={ind} navClick={handleNavClick} examReview={examReview} submittedAnswers={submittedAnswers} questionData={questionData} />
          <QuestionTexts length={item.questions.length} questionIndex={questionIndex} section={section} question={question} />
          <QuestionOptions id={id} option={option} item={item} answerChange={handleAnswerChange} examReview={examReview} submittedAnswers={submittedAnswers} questionData={questionData} />
          <NavigationButtons data={data} answers={answers} id={id} item={item} ind={ind} navClick={handleNavClick} submitExam={submitExam} examReview={examReview} clearExam={clearExam} />

        </div>
      );
    });
    examInfo = (!examReview) ? (<ExamInfo submitExam={submitExam} clearExam={clearExam} />) : '';
  } else {
    return <Loader />;
  }

  return (
    <div className="container-fluid my-4">
      <div className="row px-4">
        <div className="col-lg-8 order-2 order-md-1 p-0 p-md-2">
          <div className="card border-card">
            <nav>
              <SubjectTabs data={data} />
            </nav>
            <div className="tab-content" id="pills-tabContent">
              {questionPanel}
            </div>
          </div>

          {(examReview) ? (
            <ExamReviewExplanation />
          ) : ('')}

        </div>
        <div className="col-lg-4 order-1 order-md-2 p-0 p-md-2">
          {examInfo}
        </div>
      </div>
    </div>
  );
};

export default withRouter(QuestionContainer);

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { subjectList, timeDiff, getScore } from '../utils/Utils';

export default function ExamProfile(props) {
  const { examScore } = props;
  let totalScore = '';
  if (examScore) {
    if (examScore.length > 0) {
      totalScore = examScore.map(score => {
        const {
          startTime, examDate, examLength, timeLeft, examScore,
        } = score;
        const subject = Object.keys(examLength).map((sub, ind) => (ind === 3 ? <span key={sub}>{subjectList[sub]}</span> : <span key={sub}>{`${subjectList[sub]}, `}</span>));

        const percentScore = ((getScore(examScore) / getScore(examLength)) * 100).toFixed(1);
        const jambScore = Math.floor((getScore(examScore) / getScore(examLength)) * 400);

        return (
          <div key={startTime} className="card-body p-3 w-100">
            <div className="date-exam">
              <h6 className="m-0">You completed an exam on</h6>
              <small>{moment(examDate).format('dddd, MMMM Do, YYYY h:mm:ss A')}</small>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div className="subject">
                <h6 className="m-0">Subjects</h6>
                <p>{subject}</p>
              </div>
              <div className="time">
                <h6 className="m-0">Time Advantage</h6>
                <p>
                  {timeDiff(timeLeft, '', false)}
                  {' '}
                  remaining
                </p>
              </div>
            </div>
            <div className="scores d-flex mt-2">
              <div className="mr-2">
                <h6>Percentage Score</h6>
                <h4 className="p-0">
                  {percentScore}
                  %
                </h4>
              </div>
              <div>
                <h6>JAMB Score</h6>
                <h4 className="p-0">{jambScore}</h4>
              </div>
            </div>
          </div>
        );
      });
    } else {
      totalScore = 'No exam!';
    }
  } else {
    totalScore = '';
  }

  return (
    <div className="card icon-box p-0 mb-3 align-items-start">
      {totalScore}
    </div>
  );
}

/* eslint-disable react/prop-types */
import React from 'react';
import { getScore } from '../utils/Utils';

export default function ExamScores(props) {
  const { examScore } = props;

  let percentScore = '';
  let jambScore = '';

  if (examScore && examScore.length >= 1) {
    const data = examScore[examScore.length - 1];
    percentScore = ((getScore(data.examScore) / getScore(data.examLength)) * 100).toFixed(1);
    jambScore = Math.floor((getScore(data.examScore) / getScore(data.examLength)) * 400);
  }
  return (
    <>
      <div className="col-lg-3">
        <h2>
          Score
          {' '}
          <br />
          {percentScore}
          %
        </h2>
      </div>
      <div className="col-lg-4">
        <p className="font-weight-bold">
          JAMB Score
          {' '}
          <br />
          {jambScore}
        </p>
        <p className="font-weight-bold">
          Best Jamb Score
          {' '}
          <br />
          10
        </p>
        <div>
          <a href="/" className="form-button text-center d-block mb-2">Check your Ranking </a>
          <a href="/" className="form-button text-center d-block">View Exam History</a>
        </div>
      </div>
    </>
  );
}

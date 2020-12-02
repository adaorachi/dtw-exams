/* eslint-disable react/prop-types */
import React from 'react';
import { getScore, subjectList } from '../utils/Utils';

export default function ExamOverview(props) {
  const { examScore } = props;

  let overview = '';
  let overviewT = '';
  if (examScore && examScore.length >= 1) {
    const data = examScore[examScore.length - 1];
    overview = Object.entries(data.examLength).map(d => (
      <tr key={d[0]}>
        <td>{subjectList[d[0]]}</td>
        <td className="text-center">{d[1]}</td>
        <td className="text-center">{data.attemptedQuestions[d[0]]}</td>
        <td className="text-center">{data.examScore[d[0]]}</td>
        <td className="text-center">{d[1] - data.examScore[d[0]]}</td>
      </tr>
    ));

    const overviewData = {
      1: '',
      2: getScore(data.examLength),
      3: getScore(data.attemptedQuestions),
      4: getScore(data.examScore),
      5: (getScore(data.examLength) - getScore(data.examScore)),
    };

    overviewT = (
      <tr>
        {Object.entries(overviewData).map(v => (
          <td key={v[0]} className="text-center">{v[1]}</td>
        ))}
      </tr>
    );
  }
  return (
    <>
      <h5>Exam Overview</h5>
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">Subjects</th>
            <th className="text-center" scope="col">Total</th>
            <th className="text-center" scope="col">#Attempted</th>
            <th className="text-center" scope="col">#Passed</th>
            <th className="text-center" scope="col">#Failed</th>
          </tr>
        </thead>
        <tbody>
          {overview}
          {overviewT}
        </tbody>
      </table>
    </>
  );
}

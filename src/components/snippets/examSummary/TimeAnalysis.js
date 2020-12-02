/* eslint-disable react/prop-types */
import React from 'react';
import { timeDiff, formatTime } from '../utils/Utils';

export default function TimeAnalysis(props) {
  const { examScore } = props;
  let analysis = '';
  if (examScore && examScore.length >= 1) {
    const data = examScore[examScore.length - 1];
    const firstData = [
      'Start Time:',
      'End Time:',
      'Time Spent:',
      'Time Advantage:',
      'Total Time:',
    ];
    const secondData = [
      formatTime(data.startTime, '', false),
      formatTime(data.startTime, 30),
      timeDiff(data.timeLeft, '00:30:00'),
      timeDiff(data.timeLeft, '', false),
      timeDiff('00:30:00', '', false),
    ];
    analysis = firstData.map((data, ind) => (
      <tr key={data}>
        <td>{data}</td>
        <td>{secondData[ind]}</td>
      </tr>
    ));
  }
  return (
    <>
      <p className="font-weight-bold">Time Analysis</p>
      <table className="table table-sm table-striped">
        <tbody>
          {analysis}
        </tbody>
      </table>
    </>
  );
}

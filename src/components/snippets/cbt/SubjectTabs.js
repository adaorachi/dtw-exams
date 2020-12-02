/* eslint-disable react/prop-types */
import React from 'react';
import { subjectList } from '../utils/Utils';

export default function SubjectTabs(props) {
  const { data } = props;

  return (
    <ul className="nav nav-pills p-1" id="pills-tab" role="tablist">
      {data.map((item, ind) => (
        <li key={item.subject} className="nav-item">
          <a className={`nav-link ${ind === 0 ? 'active' : ''}`} id={`pills-${item.subject}-tab`} data-toggle="pill" href={`#pills-${item.subject}`} role="tab" aria-controls={`pills-${item.subject}`} aria-selected="true">{subjectList[item.subject]}</a>
        </li>
      ))}
    </ul>
  );
}

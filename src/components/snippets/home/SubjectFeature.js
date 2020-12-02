import React from 'react';
import { Link } from 'react-router-dom';

export default function SubjectFeature() {
  const subjects = [
    { name: 'Accounting', url: 'account' },
    { name: 'Biology', url: 'biology' },
    { name: 'Chemistry', url: 'chemistry' },
    { name: 'Civil Education', url: 'civiledu' },
    { name: 'Commerce', url: 'commerce' },
    { name: 'Christian Religious Knowledge' },
    { name: 'Current Affairs', url: 'currentaffairs' },
    { name: 'Economics', url: 'economics' },
    { name: 'English', url: 'english' },
    { name: 'English Literature', url: 'englishlit' },
    { name: 'Geography', url: 'geography' },
    { name: 'Government', url: 'government' },
    { name: 'History', url: 'history' },
    { name: 'Islam Religious Knowledge', url: 'irk' },
    { name: 'Mathematics', url: 'mathematics' },
    { name: 'Physics', url: 'physics' },
  ];
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title">
          <h2>Study</h2>
          <p>Past Questions By Subject</p>
        </div>
        <div className="row">
          {subjects.map(sub => (
            <div className="col-lg-3 col-md-4 mt-4" key={sub.name}>
              <div className="icon-box">
                <i className="ri-bar-chart-box-line" style={{ color: '#4caf50' }} />
                <h3>
                  <Link to={{
                    pathname: `/past-question/${sub.url}`,
                    subjectName: `${sub.name}`,
                  }}
                  >
                    {sub.name}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

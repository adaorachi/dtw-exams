/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { countTimer, formatTime } from '../utils/Utils';

class ExamInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
    };
  }

  componentDidMount() {
    const { submitExam, clearExam } = this.props;
    countTimer(1800, submitExam, clearExam);
    this.setState({ startTime: Date.now() });
  }

  render() {
    const { startTime } = this.state;
    return (
      <div className="p-3 my-3 features">
        <div className="card-body">
          <div className="card-tabs mb-4">
            <div className="row">
              <h5>EXAM DETAILS</h5>
              <div className="col-lg-12 mb-4 p-0">
                <div className="icon-box p-0">
                  <span className="colored-bg">
                    <i className="ri-bar-chart-box-line" />
                  </span>
                  <div className="p-2">
                    <h3 className="mt-2">
                      START TIME:
                      {' '}
                      {formatTime(startTime, '', false)}
                    </h3>
                    <h3 className="mt-2">
                      STOP TIME:
                      {' '}
                      {formatTime(startTime, 30)}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-4 p-0">
                <div className="icon-box p-0">
                  <span className="colored-bg">
                    <i className="ri-bar-chart-box-line" />
                  </span>
                  <div className="p-2">
                    <small>TIME REMAINING</small>
                    <h3 className="text-success">
                      <p className="timer text-success d-inline" id="hrs">00</p>
                      :
                      <p className="timer text-success d-inline" id="mins">00</p>
                      :
                      <p className="timer text-success d-inline" id="secs">00</p>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 p-0">
                <div className="icon-box p-0">
                  <span className="colored-bg">
                    <i className="ri-bar-chart-box-line" />
                  </span>
                  <div className="p-2">
                    <h3 className="mt-2">JAMB CBT</h3>
                    <h3 className="font-weight-light">50 questions</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamInfo;

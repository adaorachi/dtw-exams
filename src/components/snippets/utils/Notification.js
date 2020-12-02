/* eslint-disable react/prop-types */
import React from 'react';

const Notification = props => {
  const { content } = props;
  const {
    message, alert, width,
  } = content;
  return (
    <div style={{ display: 'none' }} className={`notification-container select-subject-error-container alert alert-${alert} alert-dismissible fade show`} id="select-subject-error" role="alert">
      <strong>
        <div className={`${width} alert-notify`}>
          {message}
        </div>
      </strong>
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Notification;

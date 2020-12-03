/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

const Notification = props => {
  const { content } = props;

  const {
    message, alert, width,
  } = content;

  useEffect(() => {
    const notificationCont = document.getElementById('select-subject-error');
    notificationCont.style.display = 'none';
  }, []);

  const handleClick = () => {
    const notificationCont = document.getElementById('select-subject-error');
    notificationCont.style.display = 'none';
  };

  return (
    <div className={`notification-container select-subject-error-container alert alert-${alert} alert-dismissible fade show`} id="select-subject-error" role="alert">
      <strong>
        <div className={`${width} alert-notify`}>
          {message}
        </div>
      </strong>
      <button type="button" className="close close-button" id="close" onClick={() => handleClick()}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Notification;

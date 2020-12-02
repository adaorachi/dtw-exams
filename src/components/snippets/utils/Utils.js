/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import moment from 'moment';

export const subjectList = {
  english: 'English', mathematics: 'Mathematics', commerce: 'Commerce', accounting: 'Accounting', biology: 'Biology', physics: 'Physics', chemistry: 'Chemistry', englishlit: 'English Literature', government: 'Government', crk: 'CRK', geography: 'Geography', economics: 'Economics', irk: 'IRK', civiledu: 'Civil Education', currentaffairs: 'Current Affairs', history: 'History',
};

export const getScore = obj => Object.values(obj).reduce((a, b) => a + b);

const modifyTime = (time, pref, addPref = true) => {
  if (addPref) {
    return time.toString().length === 1 ? `0${time}${pref}` : `${time}${pref}s`;
  }
  return time.toString().length === 1 ? `0${time}` : `${time}`;
};

export const timeLeft = () => {
  const hrsDiv = document.getElementById('hrs');
  const minDiv = document.getElementById('mins');
  const secDiv = document.getElementById('secs');
  return `${hrsDiv.textContent}:${minDiv.textContent}:${secDiv.textContent}`;
};

export const timeDiff = (time1, time2, substract = true) => {
  const valuestart = moment.duration(time1, 'HH:mm');
  let diff;
  if (substract) {
    const valuestop = moment.duration(time2, 'HH:mm');
    diff = valuestop.subtract(valuestart);
  } else {
    diff = valuestart;
  }

  return `${modifyTime(diff.minutes(), 'min')} ${modifyTime(diff.seconds(), 'sec')}`;
};

export const formatTime = (time, substractTime, substract = true) => {
  if (substract) {
    return moment(time).add(substractTime, 'minutes').format('hh:mm a');
  }
  return moment(time).format('hh:mm a');
};

export const calculateExamScore = (data, answers) => {
  const defaultAnwsers = {};
  const correctAnswers = {};
  const questionLength = {};
  const attemptedQuestions = {};
  data.map(item => {
    const { questions, subject } = item;
    const answerOptions = {};
    let count = 0;
    let countAttempted = 0;
    const { length } = questions;
    Object.entries(questions).map(entry => {
      const { id, answer } = entry[1];
      if (answers[subject][id] === entry[1].answer) {
        count += 1;
      }
      if (answers[subject][id] !== '') {
        countAttempted += 1;
      }
      answerOptions[id] = answer;
    });
    defaultAnwsers[subject] = answerOptions;
    correctAnswers[subject] = count;
    questionLength[subject] = length;
    attemptedQuestions[subject] = countAttempted;
  });

  return {
    defaultAnwsers,
    correctAnswers,
    questionLength,
    attemptedQuestions,
  };
};

export const compareAnswers = (data, subjectL, optionL, idL, submittedAnswers) => {
  let compareA = '';
  let noAnswer = '';
  data.map(item => {
    const { questions, subject } = item;
    Object.entries(questions).map(entry => {
      const { id } = entry[1];
      if (subject === subjectL && id === idL) {
        if (optionL === entry[1].answer) {
          compareA = '<i class="review-icon-correct ri-checkbox-circle-line"></i>';
        }
        if (submittedAnswers[subject][id] === '') {
          noAnswer = 'You gave no answer!';
        }
      }
    });
  });

  return [compareA, noAnswer];
};

export const compareAForQT = (data, subjectL, idL, submittedAnswers) => {
  let compareA = '';
  data.map(item => {
    const { questions, subject } = item;
    Object.entries(questions).map(entry => {
      const { id } = entry[1];
      if (subject === subjectL && id === idL) {
        if (submittedAnswers[subject][id] === entry[1].answer) {
          compareA += 'right';
        } else {
          compareA += 'wrong';
        }
      }
    });
  });

  return compareA;
};

export const sortObject = obj => Object.keys(obj)
  .sort().reduce((a, v) => {
    // eslint-disable-next-line no-param-reassign
    a[v] = obj[v];
    return a;
  }, {});

const setTimerInterval = (countDownDate, submitExam, clearExam) => setInterval(() => {
  const now = new Date().getTime();
  const timeleft = countDownDate - now;
  const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  const hrsDiv = document.getElementById('hrs');
  const minDiv = document.getElementById('mins');
  const secDiv = document.getElementById('secs');
  if (hrsDiv !== null) hrsDiv.innerHTML = modifyTime(hours, '', false);
  if (minDiv !== null) minDiv.innerHTML = modifyTime(minutes, '', false);
  if (secDiv !== null) secDiv.innerHTML = modifyTime(seconds, '', false);

  if (timeleft < 300000) {
    const timers = document.querySelectorAll('.timer');
    timers.forEach(t => {
      t.classList.remove('text-success');
      t.classList.add('text-danger');
    });
  }

  if (timeleft < 0) {
    // eslint-disable-next-line no-use-before-define
    clearTimerInterval();
    const result = confirm('Time up! Do you want to submit exam score?');
    if (result) {
      submitExam('');
    } else {
      clearExam('');
    }
  }
}, 1000);

export const clearTimerInterval = () => {
  clearInterval(setTimerInterval);
  const timers = document.querySelectorAll('.timer');
  timers.forEach(time => {
    // eslint-disable-next-line no-param-reassign
    time.innerHTML = '';
  });
};

export const countTimer = (counter, submitExam, clearExam) => {
  const dt = new Date();
  dt.setSeconds(dt.getSeconds() + counter);
  const countDownDate = dt.getTime();

  setTimerInterval(countDownDate, submitExam, clearExam);
};

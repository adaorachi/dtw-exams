export const examSubjects = (subjectLists, path) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  const userEmail = getState().firebase.auth.email;
  firestore.collection('examSubjects').doc(userId).set({
    examMode: true,
    examSubjects: subjectLists,
    email: userEmail,
    examPath: path,
    questionData: [],
    submittedAnswers: {},
  }).then(() => {
    firestore.collection('examScores').doc(userId).set({});
  })
    .then(() => {
      dispatch({ type: 'CREATE_EXAM_SUBJECT_SUCCESS', data: { examMode: true, examSubjects: subjectLists, examPath: path } });
    })
    .catch(err => {
      dispatch({ type: 'CREATE_EXAM_SUBJECT_ERROR', err });
    });
};

export const getExamSubjects = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  const db = firestore;
  const userId = getState().firebase.auth.uid;
  const docRef = db.collection('examSubjects').doc(userId);
  docRef.get().then(doc => {
    if (doc.exists) {
      const examL = doc.data().examSubjects.length;
      if (doc.exists && examL === 4) {
        dispatch({ type: 'GET_EXAM_SUBJECT_SUCCESS', data: doc.data() });
      } else if (doc.exists && examL < 4) {
        dispatch({ type: 'GET_NO_EXAM_SUBJECT_SUCCESS', data: doc.data() });
      }
    } else {
      dispatch({ type: 'GET_NO_USER_EXAM_SUBJECT_SUCCESS' });
    }
  }).catch(error => {
    dispatch({ type: 'GET_EXAM_SUBJECT_ERROR', error });
  });
};

export const clearExamSubjects = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  const db = firestore;
  const userId = getState().firebase.auth.uid;
  const userDoc = db.collection('examSubjects').doc(userId);
  const resetExam = {
    examMode: false,
    examSubjects: [],
    examPath: 'choose-subjects',
    questionData: [],
    submittedAnswers: {},
  };
  return userDoc.update(resetExam).then(() => {
    dispatch({ type: 'CLEAR_EXAM_SUBJECT_SUCCESS', data: resetExam });
  }).catch(error => {
    dispatch({ type: 'CLEAR_EXAM_SUBJECT_ERROR', error });
  });
};

export const updateExamPath = (year, path) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  const db = firestore;
  const userId = getState().firebase.auth.uid;
  const userDoc = db.collection('examSubjects').doc(userId);
  const resetExam = {
    examPath: path,
  };
  return userDoc.update(resetExam).then(() => {
    dispatch({ type: 'UPDATE_EXAM_PATH_SUCCESS', data: resetExam, year });
  }).catch(error => {
    dispatch({ type: 'UPDATE_EXAM_PATH_ERROR', error });
  });
};

export const submitExam = (dataSet, resetSet) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  const db = firestore;
  const userId = getState().firebase.auth.uid;
  const userEmail = getState().firebase.auth.email;
  const userDoc = db.collection('examSubjects').doc(userId);
  const userDoc2 = db.collection('examScores').doc(userId);

  const key = Date.now();
  const userChild = userDoc2.collection('userScores').doc(`${key}`);

  const resetExam = {
    examPath: 'conclude-exam',
    examMode: false,
    submittedAnswers: resetSet.submittedAnswers,
    questionData: resetSet.questionData,
  };
  userChild.set({
    examType: dataSet.examType,
    examLength: dataSet.examLength,
    email: userEmail,
    startTime: dataSet.startTime,
    timeLeft: dataSet.timeLeft,
    totalTime: dataSet.totalTime,
    examScore: dataSet.examScore,
    attemptedQuestions: dataSet.attemptedQuestions,
    examDate: Date.now(),
  }).then(() => userDoc.update(resetExam)).then(() => {
    dispatch({ type: 'SUBMIT_EXAM_PATH_SUCCESS' });
  })
    .catch(error => {
      dispatch({ type: 'SUBMIT_EXAM_PATH_ERROR', error });
    });
};

export const getExamScores = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const array = [];
  const userId = getState().firebase.auth.uid;
  const docRef = firestore.collection('examScores').doc(userId);

  docRef.collection('userScores').get().then(scores => {
    scores.docs.forEach(docs => {
      array.push(docs.data());
    });
  }).then(() => {
    dispatch({ type: 'GET_EXAM_SCORE_SUCCESS', data: array });
  })
    .catch(error => {
      dispatch({ type: 'GET_EXAM_SUBJECT_ERROR', error });
    });
};

/* eslint-disable no-console */
const initState = {
  error: null,
  examMode: false,
  examPath: 'choose-subjects',
  examSubjects: [],
};

const examReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_EXAM_SUBJECT_ERROR':
      console.log(action.err);
      return {
        ...state,
        error: 'Subjects not saved',
      };
    case 'CREATE_EXAM_SUBJECT_SUCCESS':
      console.log('subject saved');
      return {
        ...state,
        error: null,
        examMode: true,
        examSubjects: action.data.examSubjects,
        examPath: action.data.examPath,
      };
    case 'GET_EXAM_SUBJECT_SUCCESS':
      console.log('subject retrieved');
      return {
        ...state,
        error: null,
        examMode: true,
        examSubjects: action.data.examSubjects,
        examPath: action.data.examPath,
        questionData: action.data.questionData,
        submittedAnswers: action.data.submittedAnswers,
      };
    case 'GET_NO_EXAM_SUBJECT_SUCCESS':
      console.log('no subject retrieved');
      return {
        ...state,
        error: 'No exam subjects retrieved',
        examMode: false,
        examPath: action.data.examPath,
      };
    case 'GET_NO_USER_EXAM_SUBJECT_SUCCESS':
      console.log('No user with subject ID found');
      return {
        ...state,
        error: 'No user with subject ID found',
        examMode: false,
        examPath: action.data.examPath,
      };
    case 'CLEAR_EXAM_SUBJECT_SUCCESS':
      console.log('subject removed');
      return {
        ...state,
        error: null,
        examMode: false,
        examSubjects: action.data.examSubjects,
        examPath: action.data.examPath,
      };
    case 'UPDATE_EXAM_PATH_SUCCESS':
      console.log('cbt exam activated');
      return {
        ...state,
        error: null,
        examPath: action.data.examPath,
        year: action.year,
      };
    case 'SUBMIT_EXAM_PATH_SUCCESS':
      console.log('cbt exam conculded');
      return {
        ...state,
        error: null,
        examPath: 'conclude-exam',
      };
    case 'GET_EXAM_SCORE_SUCCESS':
      console.log('exam score retrieved');
      return {
        ...state,
        error: null,
        examMode: false,
        examScore: action.data,
        questionData: action.data.questionData,
        submittedAnswers: action.data.submittedAnswers,
      };
    case 'GET_NO_EXAM_SCORE_SUCCESS':
      console.log('no exam score retrieved');
      return {
        ...state,
        error: 'No exam subjects retrieved',
        examMode: false,
        examScore: [],
      };

    default:
      return state;
  }
};

export default examReducer;

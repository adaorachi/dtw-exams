/* eslint-disable no-console */
const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log(action.err);
      return {
        ...state,
        authError: 'Incorrect email/password',
      };
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
      };
    case 'SIGNUP_ERROR':
      console.log('signout error', action.err.message);
      return {
        ...state,
        authError: action.err.message,
      };
    case 'SIGNUP_SUCCESS':
      console.log('signout success');
      return {
        ...state,
        authError: null,
      };
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;

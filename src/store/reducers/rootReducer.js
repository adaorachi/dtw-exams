import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import examReducer from './examReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  subjects: examReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;

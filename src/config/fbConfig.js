import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDKhH-SCaI1MgxdP0WPdxlEr6PIJuiPW_U',
  authDomain: 'dtw-exam.firebaseapp.com',
  databaseURL: 'https://dtw-exam.firebaseio.com',
  projectId: 'dtw-exam',
  storageBucket: 'dtw-exam.appspot.com',
  messagingSenderId: '332150777172',
  appId: '1:332150777172:web:daebed132239db17dc94c1',
  measurementId: 'G-B1FMM4RVDH',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;

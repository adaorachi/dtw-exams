export const signIn = userCredentials => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase.auth().signInWithEmailAndPassword(
    userCredentials.email,
    userCredentials.password,
  ).then(() => {
    dispatch({ type: 'LOGIN_SUCCESS' });
  }).catch(err => {
    dispatch({ type: 'LOGIN_ERROR', err });
  });
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase.auth().signOut()
    .then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    });
};

export const signUp = newUserCred => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  firebase.auth().createUserWithEmailAndPassword(
    newUserCred.email,
    newUserCred.password,
  ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
    firstName: newUserCred.first_name,
    lastName: newUserCred.last_name,
    username: newUserCred.username,
  }).then(() => {
    dispatch({ type: 'SIGNUP_SUCCESS' });
  })).catch(err => {
    dispatch({ type: 'SIGNUP_ERROR', err });
  });
};

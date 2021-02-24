import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

googleProvider.setCustomParameters({
  promt: 'select_account',
});

export const createUserProfileDocument = (userAuth) => {
  alert(userAuth);
};

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};

export const signInWithFacebook = () => {
  auth.signInWithPopup(facebookProvider);
};

export const signInWithTwitter = () => {
  auth.signInWithPopup(twitterProvider);
};

export const signOut = () => {
  auth.signOut();
};

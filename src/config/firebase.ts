/* eslint-disable func-names */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export const googleProvider = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
export const facebookProvider = firebase.auth.FacebookAuthProvider.PROVIDER_ID;
export const firestore = firebase.firestore();
export const auth = firebase.auth();

const myGoogleProvider = new firebase.auth.GoogleAuthProvider();
const myFacebookProvider = new firebase.auth.FacebookAuthProvider();

// Google credentials signin
export const firebaseSignInWithGoogle = (): Promise<
  firebase.auth.UserCredential
> => auth.signInWithPopup(myGoogleProvider);

// Facebook credentials signin
export const firebaseSignInWithFacebook = (): Promise<
  firebase.auth.UserCredential
> => auth.signInWithPopup(myFacebookProvider);

// Create account with email and password
export const firebaseCreateUserWithEmailAndPassword = (
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export default firebase;

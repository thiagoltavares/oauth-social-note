/* eslint-disable no-console */
/* eslint-disable func-names */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { ICreateUserData } from '../interfaces';
import { UserConverter } from '../utils/firebaseUserConverter';

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
// export const googleProvider = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
// export const facebookProvider = firebase.auth.FacebookAuthProvider.PROVIDER_ID;
export const firestore = firebase.firestore();
export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const emailAndPasswordProvider = new firebase.auth.EmailAuthProvider();

// Google credentials signin
export const firebaseSignInWithGoogle = (): Promise<
  firebase.auth.UserCredential
> => auth.signInWithPopup(googleProvider);

// Facebook credentials signin
export const firebaseSignInWithFacebook = (): Promise<
  firebase.auth.UserCredential
> => auth.signInWithPopup(facebookProvider);

// Email and Password credentials signin
// FIXME verificar como faz login com email e senha
export const firebaseSignInWithMailAndPassword = (): Promise<
  firebase.auth.UserCredential
> => auth.signInWithPopup(emailAndPasswordProvider);

// Create account with email and password
export const firebaseCreateUserWithEmailAndPassword = (
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const getUserDocument = async (
  uid: string,
): Promise<ICreateUserData | void> => {
  try {
    const userDocument = await firestore
      .collection(`users`)
      .withConverter(UserConverter)
      .doc(uid)
      .get();

    const {
      displayName,
      email,
      photoURL,
    } = userDocument.data() as ICreateUserData;

    return {
      uid,
      displayName,
      email,
      photoURL,
    };
  } catch (error) {
    console.error('Error fetching user document', error.message);
  }
};

export const createUserProfileDocument = async (
  user: firebase.User,
  aditionalData?: any,
): Promise<ICreateUserData | void> => {
  if (!user) return;

  // Get a reference to the plkace in the database where a user profile must be;
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch document from that location
  const snapshop = await userRef.get();

  // If snapshot doesn't exist, create a new userProfile
  if (!snapshop.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...aditionalData,
      });
    } catch (error) {
      console.error('Error creating user profile', error.message);
    }
  }

  // then get the user document
  return getUserDocument(user.uid);
};

export default firebase;

import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { IUserData, AuthContextData, ICreateUserData } from '../interfaces';
import {
  auth,
  firebaseSignInWithGoogle,
  firebaseCreateUserWithEmailAndPassword,
  firebaseSignInWithFacebook,
  getUserRef,
} from '../config/firebase';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
let unregisterAuthObserver: () => void;

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUserData>(
    () => auth.currentUser as IUserData,
  );

  // const userRef = getUserRef(user.uid);
  const signOut = useCallback(() => auth.signOut(), []);
  const signInWithGoogle = useCallback(() => firebaseSignInWithGoogle(), []);
  const signInWithFacebook = useCallback(
    () => firebaseSignInWithFacebook(),
    [],
  );

  const signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> => {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential;
  };

  const createAccountWithEmailAndPassword = useCallback(
    (email: string, password: string) =>
      firebaseCreateUserWithEmailAndPassword(email, password),
    [],
  );

  useEffect(() => {
    unregisterAuthObserver = auth.onAuthStateChanged(async loggedUser => {
      const userRef = loggedUser && getUserRef(loggedUser.uid);

      userRef &&
        userRef.onSnapshot(snapshot => {
          const {
            displayName,
            email,
            photoURL,
          } = snapshot.data() as ICreateUserData;

          setUser({ displayName, email, photoURL, uid: userRef.id });
        });
    });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        signOut,
        signInWithGoogle,
        createAccountWithEmailAndPassword,
        signInWithFacebook,
        signInWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

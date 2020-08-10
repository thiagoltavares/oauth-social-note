import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { IUserData } from '../interfaces';
import {
  auth,
  firebaseSignInWithGoogle,
  firebaseCreateUserWithEmailAndPassword,
  firebaseSignInWithFacebook,
} from '../config/firebase';

interface AuthContextData {
  user: IUserData;
  signOut: () => void;
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
  signInWithFacebook: () => Promise<firebase.auth.UserCredential>;
  createAccountWithEmailAndPassword: (
    name: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
let unregisterAuthObserver: () => void;

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUserData>(
    () => auth.currentUser as IUserData,
  );
  const signOut = useCallback(() => auth.signOut(), []);
  const signInWithGoogle = useCallback(() => firebaseSignInWithGoogle(), []);
  const signInWithFacebook = useCallback(
    () => firebaseSignInWithFacebook(),
    [],
  );
  const createAccountWithEmailAndPassword = useCallback(
    (email: string, password: string) =>
      firebaseCreateUserWithEmailAndPassword(email, password),
    [],
  );

  useEffect(() => {
    unregisterAuthObserver = auth.onAuthStateChanged(loggedUser => {
      setUser(loggedUser as IUserData);
    });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        signInWithGoogle,
        createAccountWithEmailAndPassword,
        signInWithFacebook,
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

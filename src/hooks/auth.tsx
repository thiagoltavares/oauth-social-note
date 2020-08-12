import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { IUserData, AuthContextData } from '../interfaces';
import {
  auth,
  firebaseSignInWithGoogle,
  firebaseCreateUserWithEmailAndPassword,
  firebaseSignInWithFacebook,
  createUserProfileDocument,
} from '../config/firebase';

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
      const createdUser =
        loggedUser && (await createUserProfileDocument(loggedUser));

      setUser(createdUser as IUserData);
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

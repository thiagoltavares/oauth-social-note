export interface IUserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface ICreateUserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface IPostData {
  id: string;
  title: string;
  content: string;
  user: IUserData;
  stars: number;
  comments: number;
  createdAt: Date;
}

export interface ICreatePostData {
  title: string;
  content: string;
  user: IUserData;
  stars: number;
  comments: number;
  createdAt: Date;
}

export interface AuthContextData {
  user: IUserData;
  signOut: () => void;
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
  signInWithFacebook: () => Promise<firebase.auth.UserCredential>;
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>;
  createAccountWithEmailAndPassword: (
    name: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>;
}

// TODO refactor user to currentUser

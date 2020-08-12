import { ICreateUserData } from '../interfaces/index';

export const UserConverter = {
  toFirestore(user: ICreateUserData): firebase.firestore.DocumentData {
    return {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      // createdAt: user.createdAt,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): ICreateUserData {
    const user = snapshot.data(options)!;

    return {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      // createdAt: data.createdAt,
    };
  },
};

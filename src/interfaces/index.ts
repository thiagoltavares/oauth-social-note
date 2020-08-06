export interface IUserData {
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
}

export interface ICreatePostData {
  title: string;
  content: string;
  user: IUserData;
  stars: number;
  comments: number;
}

export interface TruePost {
  title: string;
  content: string;
  user: IUserData;
  favorite: 0;
  comments: 0;
  createdAt: Date;
}

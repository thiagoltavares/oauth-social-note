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

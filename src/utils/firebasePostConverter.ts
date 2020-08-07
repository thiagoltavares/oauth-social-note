import { ICreatePostData } from '../interfaces/index';

export const PostConverter = {
  toFirestore(post: ICreatePostData): firebase.firestore.DocumentData {
    return {
      title: post.title,
      content: post.content,
      user: post.user,
      stars: post.stars,
      comments: post.comments,
      createdAt: post.createdAt,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ): ICreatePostData {
    const data = snapshot.data(options)!;

    return {
      title: data.title,
      content: data.content,
      user: data.user,
      stars: data.stars,
      comments: data.comments,
      createdAt: data.createdAt,
    };
  },
};

import React, { useState, useEffect, createContext, useContext } from 'react';
import { firestore } from '../config/firebase';
import { IPostData } from '../interfaces';
import { PostConverter } from '../utils/firebasePostConverter';

let unregisterAuthObserver: () => void;

const PostContext = createContext<IPostData[]>([]);

const PostProvider: React.FC = ({ children }) => {
  const [posts, setPosts] = useState<IPostData[]>([]);

  useEffect(() => {
    unregisterAuthObserver = firestore
      .collection('posts')
      .withConverter(PostConverter)
      .onSnapshot(docs => {
        const data: IPostData[] = [];
        docs.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setPosts(data);
      });

    return () => {
      unregisterAuthObserver();
    };
  }, []);
  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};

function usePosts(): IPostData[] {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePosts must be used within an AuthProvider');
  }

  return context;
}

export { PostProvider, usePosts };

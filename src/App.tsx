import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { IPostData, ICreatePostData } from './interfaces';
import Posts from './components/Posts';
import { firestore } from './config/firebase';
import { PostConverter } from './utils/firebasePostConverter';

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let unsubscribe: () => void;
    const getDataFromFirestore = () => {
      unsubscribe = firestore
        .collection('posts')
        .withConverter(PostConverter)
        .onSnapshot(docs => {
          const data: IPostData[] = [];
          docs.forEach(doc => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setPosts(data);
        });
    };

    getDataFromFirestore();

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (posts.length !== 0) {
      setIsLoading(false);
    }
  }, [posts.length]);

  const handleCreatePost = (post: ICreatePostData) => {
    firestore.collection('posts').withConverter(PostConverter).add(post);
  };

  const handleRemovePost = async (id: string) => {
    firestore.doc(`posts/${id}`).delete();
  };

  return (
    <main>
      <div className="container">
        <h1>Deixe Me Uma Nota</h1>
        {isLoading ? (
          <CircularProgress disableShrink />
        ) : (
          <Posts
            posts={posts}
            onCreate={handleCreatePost}
            onRemove={handleRemovePost}
          />
        )}
      </div>
    </main>
  );
};

export default App;

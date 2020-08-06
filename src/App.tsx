import React, { useState, useEffect } from 'react';
import { IPostData } from './interfaces';
import Posts from './components/Posts';
import { firestore } from './config/firebase';
import { PostConverter } from './utils/firebasePostConverter';

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPostData[]>([]);

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

  return (
    <main>
      <div className="container">
        <h1>Deixe Me Uma Nota</h1>

        <Posts posts={posts} />
      </div>
    </main>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { IPostData, IUserData } from './interfaces';
import Posts from './components/Posts';
import { firestore, auth } from './config/firebase';
import { PostConverter } from './utils/firebasePostConverter';
import Authentication from './components/Authentication';

let unregisterAuthObserver: () => void;

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [user, setUser] = useState<IUserData>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    unregisterAuthObserver = auth.onAuthStateChanged(loggedUser => {
      setIsSignedIn(!!loggedUser);
      const { displayName, email, photoURL, uid } = loggedUser as IUserData;
      setUser({ displayName, uid, email, photoURL });
    });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <main>
      <div className="container">
        <h1>Deixe Me Uma Nota</h1>
        {user && <Authentication loading={isLoading} user={user} />}
        <Posts posts={posts} isSignedIn={isSignedIn} />
      </div>
    </main>
  );
};

export default App;

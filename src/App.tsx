import React, { useState } from 'react';
import { initialPosts } from './mocks/posts';
import { IPostData } from './types';
import Posts from './components/Posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPostData[]>(initialPosts);

  const handleCreatePost = (post: IPostData) => {
    setPosts([...posts, post]);
  };

  return (
    <main>
      <h1>Deixe Me Uma Nota</h1>
      <Posts posts={posts} onCreate={handleCreatePost} />
    </main>
  );
};

export default App;

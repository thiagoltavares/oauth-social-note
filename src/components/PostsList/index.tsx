import React from 'react';
import Post from '../Post';
import { usePosts } from '../../hooks/posts';

const PostsList: React.FC = () => {
  const posts = usePosts();

  return (
    <section>
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </section>
  );
};

export default PostsList;

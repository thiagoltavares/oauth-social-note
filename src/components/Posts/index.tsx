import React from 'react';
import { IPostData } from '../../interfaces';
import Post from '../Post';
import AddPost from '../AddPost';

interface PostsData {
  posts: IPostData[];
  isSignedIn: boolean;
}

const Posts: React.FC<PostsData> = ({ posts, isSignedIn }) => {
  return (
    <section>
      <AddPost isSignedIn={isSignedIn} />
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;

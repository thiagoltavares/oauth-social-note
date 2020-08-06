import React from 'react';
import { IPostData } from '../../interfaces';
import Post from '../Post';
import AddPost from '../AddPost';

interface PostsData {
  posts: IPostData[];
}

const Posts: React.FC<PostsData> = ({ posts }: PostsData) => {
  return (
    <section>
      <AddPost />
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;

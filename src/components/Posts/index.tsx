import React from 'react';
import { IPostData } from '../../types';
import Post from '../Post';
import AddPost from '../AddPost';

type postsData = {
  posts: IPostData[];
  onCreate: (post: IPostData) => void;
};

const Posts: React.FC<postsData> = ({ posts, onCreate }: postsData) => {
  return (
    <section>
      <AddPost onCreate={onCreate} />
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;

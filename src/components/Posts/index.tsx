import React from 'react';
import { IPostData, ICreatePostData } from '../../interfaces';
import Post from '../Post';
import AddPost from '../AddPost';

interface PostsData {
  posts: IPostData[];
  onCreate: (values: ICreatePostData) => void;
  onRemove: (values: string) => void;
}

const Posts: React.FC<PostsData> = ({
  posts,
  onCreate,
  onRemove,
}: PostsData) => {
  return (
    <section>
      <AddPost onCreate={onCreate} />
      {posts.map(post => (
        <Post post={post} key={post.id} onRemove={onRemove} />
      ))}
    </section>
  );
};

export default Posts;

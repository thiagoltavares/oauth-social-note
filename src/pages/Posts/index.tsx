import React from 'react';
import { useAuth } from '../../hooks/auth';

import PostsList from '../../components/PostsList';
import AddPost from '../../components/AddPost';
import UserCard from '../../components/UserCard';

const Posts: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <UserCard user={user} />
      <AddPost />
      <PostsList />
    </>
  );
};

export default Posts;

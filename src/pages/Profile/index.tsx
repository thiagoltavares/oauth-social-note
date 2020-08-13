import React from 'react';
import { useAuth } from '../../hooks/auth';

import UserCard from '../../components/UserCard';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <UserCard user={currentUser} />
      <section>
        <form>
          <input type="text" />
        </form>
      </section>
    </>
  );
};

export default Profile;

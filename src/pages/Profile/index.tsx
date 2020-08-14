import React, { useCallback, ChangeEvent } from 'react';
import { Form } from '@unform/web';
import { FiUser, FiMail, FiCamera } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, AvatarInput } from './styles';
import { firestore } from '../../config/firebase';
import UserCard from '../../components/UserCard';

interface UserInfoUpdateProps {
  displayName: string;
  email: string;
}

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  const getUserRef = useCallback(() => {
    return firestore.doc(`users/${currentUser.uid}`);
  }, [currentUser.uid]);

  const handleSubmit = useCallback(
    async (data: UserInfoUpdateProps): Promise<void> => {
      try {
        await getUserRef().update(data);
      } catch (err) {
        // console.error({ err });
      }
    },
    [getUserRef],
  );

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);
    }
  }, []);

  const { displayName, email } = currentUser;

  return (
    <Container>
      <UserCard user={currentUser} />
      <AvatarInput>
        <img src={currentUser.photoURL} alt={currentUser.displayName} />
        <label htmlFor="avatar">
          <FiCamera />
          <input
            type="file"
            name=""
            id="avatar"
            accept="image/jpeg, image/png"
            onChange={handleAvatarChange}
          />
        </label>
      </AvatarInput>
      <Form
        onSubmit={handleSubmit}
        initialData={{
          displayName,
          email,
        }}
      >
        <Input icon={FiUser} name="displayName" />
        <Input icon={FiMail} name="email" />
        <Button type="submit">Atualizar Cadastro</Button>
      </Form>
    </Container>
  );
};

export default Profile;

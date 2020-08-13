import React from 'react';
import { Form } from '@unform/web';
import { FiUser, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';

import UserCard from '../../components/UserCard';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles';

interface UserInfoUpdateProps {
  displayName: string;
  email: string;
}

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  const handleSubmit = async (data: UserInfoUpdateProps): Promise<void> => {
    try {
      const schema = Yup.object().shape({
        displayName: Yup.string().required(),
        email: Yup.string().required().email('digite um email valido'),
      });

      await schema.validate(data, { abortEarly: true });

      console.log(data);
    } catch (err) {
      console.error({ err });
    }
  };

  const handleSubmitAvatar = (data: object): void => {
    console.log(data);
  };

  const { displayName, email } = currentUser;

  return (
    <>
      <UserCard user={currentUser} />
      <Container>
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
      <Container>
        <Form onSubmit={handleSubmitAvatar}>
          <Input name="photoURL" type="file" placeholder={email} />
          <Button type="submit">Atualizar Avatar</Button>
        </Form>
      </Container>
    </>
  );
};

export default Profile;

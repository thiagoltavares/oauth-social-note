import React, { useCallback } from 'react';
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/auth';
import { Container, Content, AnimationContainer, SigInForm } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.png';

interface HandleSignInData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmailAndPassword,
  } = useAuth();

  const handleSignIn = useCallback(
    (data: HandleSignInData): void => {
      const { email, password } = data;
      // TODO validate data with yup
      signInWithEmailAndPassword(email, password);
    },
    [signInWithEmailAndPassword],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo" style={{ marginBottom: 10 }} />
          <h1 style={{ color: '#3f51b5', marginBottom: 48 }}>Faça seu Login</h1>
          <SigInForm onSubmit={handleSignIn}>
            <Input icon={FiMail} name="email" placeholder="Digite seu email." />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Digite sua senha."
            />
            <Button type="submit">Entrar</Button>
          </SigInForm>
          <Divider> Ou </Divider>
          <GoogleLoginButton
            align="center"
            onClick={signInWithGoogle}
            style={{ width: '100%', margin: 0, borderRadius: 8 }}
          >
            <span>Entrar com google</span>
          </GoogleLoginButton>
          <FacebookLoginButton
            align="center"
            onClick={signInWithFacebook}
            style={{ width: '100%', margin: 0, marginTop: 10, borderRadius: 8 }}
          >
            <span>Entrar com Facebook</span>
          </FacebookLoginButton>
          <Link to="/signup">
            <FiLogIn />
            Crie Sua Conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;

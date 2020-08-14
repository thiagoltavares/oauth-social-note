import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiMail, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Container, Content, AnimationContainer, SigUpForm } from './styles';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import { createUserProfileDocument } from '../../config/firebase';
import Button from '../../components/Button';
import Input from '../../components/Input';

interface HandleSignUpData {
  displayName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { createAccountWithEmailAndPassword } = useAuth();

  const handleSignUp = useCallback(
    async (data: HandleSignUpData): Promise<void> => {
      const { displayName, email, password } = data;
      // TODO validate data with yup

      try {
        const { user } = await createAccountWithEmailAndPassword(
          email,
          password,
        );
        const photoURL = `https://api.adorable.io/avatars/200/${displayName}.png`;
        user &&
          (await createUserProfileDocument(user, { displayName, photoURL }));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error creating account: ', error.message);
      }
    },
    [createAccountWithEmailAndPassword],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo" style={{ marginBottom: 10 }} />
          <h1 style={{ color: '#3f51b5', marginBottom: 48 }}>Crie sua conta</h1>
          <SigUpForm onSubmit={handleSignUp}>
            <Input
              icon={FiUser}
              name="displayName"
              placeholder="Digite seu nome."
            />
            <Input icon={FiMail} name="email" placeholder="Digite seu email." />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Digite sua senha."
            />
            <Button type="submit">Criar</Button>
          </SigUpForm>
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
          {/* <img
            src={logoImg}
            alt="message"
            style={{ width: '200px', marginBottom: 10 }}
          />
          <h1 style={{ color: '#3f51b5' }}>Criar Conta</h1>
          <Grid
            container
            className={classes.root}
            spacing={2}
            justify="center"
            md={10}
          >
            <Grid item xs={10} md={12}>
              <form onSubmit={handleSignUp} autoComplete="off">
                <Grid container justify="center" spacing={2} direction="column">
                  <TextField
                    label="Nome"
                    name="name"
                    value={displayName}
                    className={classes.textField}
                    onChange={e => {
                      setDisplayName(e.target.value);
                    }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    className={classes.textField}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                  <TextField
                    label="Senha"
                    name="password"
                    type="password"
                    value={password}
                    className={classes.textField}
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Criar conta
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <Link to="/">
            <FiArrowLeft />
            Voltar
          </Link> */}
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core/';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/auth';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(3),
      height: 48,
    },
    textField: {
      marginTop: theme.spacing(1),
    },
  }),
);

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const classes = useStyles();
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  const handleSignIn = () => {
    console.log('SignIn');

    setEmail('');
    setPassword('');
  };
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img
            src={logoImg}
            alt="message"
            style={{ width: '200px', marginBottom: 10 }}
          />
          <h1 style={{ color: '#3f51b5' }}>Entrar</h1>
          <Grid container className={classes.root} spacing={2} justify="center">
            <Grid item xs={10} md={12}>
              <Grid container justify="center" spacing={2} direction="column">
                <TextField
                  label="Email"
                  name="email"
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
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleSignIn}
                >
                  Entrar
                </Button>

                <Divider> Ou </Divider>

                <GoogleLoginButton
                  align="center"
                  onClick={signInWithGoogle}
                  style={{ width: '100%', margin: 0 }}
                >
                  <span>Entrar com google</span>
                </GoogleLoginButton>
                <FacebookLoginButton
                  align="center"
                  onClick={signInWithFacebook}
                  style={{ width: '100%', marginTop: 10 }}
                >
                  <span>Entrar com Facebook</span>
                </FacebookLoginButton>
              </Grid>
            </Grid>
          </Grid>
          <Link to="/signup">
            <FiLogIn />
            Crie Sua Conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;

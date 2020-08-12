import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core/';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import { createUserProfileDocument } from '../../config/firebase';

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

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const classes = useStyles();
  const { createAccountWithEmailAndPassword } = useAuth();
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { user } = await createAccountWithEmailAndPassword(email, password);
      const photoURL = `https://api.adorable.io/avatars/200/${displayName}.png`;

      user &&
        (await createUserProfileDocument(user, { displayName, photoURL }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error creating account: ', error.message);
    }

    setEmail('');
    setPassword('');
    setDisplayName('');
  };
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img
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
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core/';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

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
  const [name, setName] = useState<string>('');
  const classes = useStyles();
  const { createAccountWithEmailAndPassword } = useAuth();
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const test = await createAccountWithEmailAndPassword(email, password);
    console.log(test);

    setEmail('');
    setPassword('');
    setName('');
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
          <Grid container className={classes.root} spacing={2} justify="center">
            <Grid item xs={10} md={12}>
              <form onSubmit={handleSignUp}>
                <Grid container justify="center" spacing={2} direction="column">
                  <TextField
                    label="Nome"
                    name="name"
                    value={name}
                    className={classes.textField}
                    onChange={e => {
                      setName(e.target.value);
                    }}
                  />
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

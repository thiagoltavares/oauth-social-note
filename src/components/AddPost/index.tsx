import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { ICreatePostData } from '../../interfaces';
import { firestore, googleProvider, auth } from '../../config/firebase';
import { PostConverter } from '../../utils/firebasePostConverter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(3),
      height: 48,
    },
    textField: {
      marginTop: theme.spacing(1),
    },
  }),
);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    googleProvider,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};
interface IAddPostProps {
  isSignedIn: boolean;
}

const AddPost: React.FC<IAddPostProps> = ({ isSignedIn }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post: ICreatePostData = {
      title,
      content,
      user: {
        uid: '111',
        displayName: 'Thiago Maha',
        email: 'maha@maha.com',
        photoURL: 'https://api.adorable.io/avatars/200/maha.png',
      },
      stars: 0,
      comments: 0,
      createdAt: new Date(),
    };

    firestore.collection('posts').withConverter(PostConverter).add(post);

    setContent('');
    setTitle('');
  };

  return (
    <div>
      {!isSignedIn ? (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      ) : (
        <form onSubmit={e => handleSubmit(e)}>
          <Grid item container justify="center" direction="column">
            <TextField
              label="Título"
              name="title"
              value={title}
              className={classes.textField}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />

            <TextField
              label="Mensagem"
              name="content"
              value={content}
              className={classes.textField}
              onChange={e => {
                setContent(e.target.value);
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
            >
              Criar Post
            </Button>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default AddPost;

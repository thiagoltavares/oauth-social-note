import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ICreatePostData } from '../../interfaces';
import { firestore } from '../../config/firebase';
import { PostConverter } from '../../utils/firebasePostConverter';
import { useAuth } from '../../hooks/auth';

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

const AddPost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const {
    currentUser: { displayName, photoURL, uid, email },
  } = useAuth();

  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post: ICreatePostData = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL,
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
    </div>
  );
};

export default AddPost;

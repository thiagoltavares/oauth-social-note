import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ICreatePostData } from '../../interfaces';
import { firestore } from '../../config/firebase';
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

const AddPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
    };

    firestore.collection('posts').withConverter(PostConverter).add(post);

    setContent('');
    setTitle('');
  };

  return (
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
  );
};

export default AddPost;

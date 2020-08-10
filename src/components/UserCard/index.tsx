import React, { useState } from 'react';
import { Button, ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IUserData } from '../../interfaces';
import { auth } from '../../config/firebase';

interface IUserCardProps {
  user: IUserData;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '100%',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: '50%',
    },
    infoContainer: {
      marginLeft: 40,
    },
    button: {
      marginTop: theme.spacing(3),
      height: 48,
    },
  }),
);

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);

  const classes = useStyles();

  const handleSignOut = () => {
    auth.signOut();
    setIsSignedIn(false);
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={user.photoURL} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container className={classes.infoContainer}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {user.displayName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Seja bem vindo!
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleSignOut}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  endIcon={<Icon>logout</Icon>}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default UserCard;

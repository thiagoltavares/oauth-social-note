import React from 'react';
import { IUserData } from '../../interfaces';
import CurrentUser from '../CurrentUser';
import SignInAndSignUp from '../SignInAndSignUp';

interface IAuthenticationProps {
  user: IUserData;
  loading: boolean;
}

const Authentication: React.FC<IAuthenticationProps> = ({ user, loading }) => {
  if (loading) {
    return null;
  }

  return <div>{user ? <CurrentUser user={user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;

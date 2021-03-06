import React from 'react';
import { AuthProvider } from './auth';
import { PostProvider } from './posts';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <PostProvider>{children}</PostProvider>
  </AuthProvider>
);

export default AppProvider;

import { useStoreMap } from 'effector-react';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { PATHS } from 'shared/config';

import * as model from '../model';

export const AuthGuard: React.FC<{
  children: React.ReactNode;
  redirect?: string;
}> = ({ children, redirect = PATHS.auth.login }) => {
  const isUserAuthenticated = useStoreMap(model.$user, (user) => !!user);

  if (!isUserAuthenticated) {
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
};

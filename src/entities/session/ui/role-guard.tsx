import { useStore } from 'effector-react';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { PATHS } from 'shared/config';

import * as model from '../model';

export const RoleGuard: React.FC<{
  children: React.ReactNode;
  roles: string[];
}> = ({ children, roles }) => {
  const user = useStore(model.$user);

  if (!roles.includes(user?.role ?? '')) {
    return <Navigate to={PATHS.office.allgoods} />;
  }

  return <>{children}</>;
};

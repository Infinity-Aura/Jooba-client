import React from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from 'effector-react';

import { sessionModel } from 'entities/session';

import { Box } from 'shared/ui/kit';
import { Loading } from 'shared/components/loading';

export const AuthLayout = () => {
  const loading = useStore(sessionModel.$loading);

  return !loading ? (
    <Box sx={{ display: 'flex', flex: '1 1 auto', backgroundColor: '#E0673A' }}>
      <Outlet />
    </Box>
  ) : (
    <Loading />
  );
};

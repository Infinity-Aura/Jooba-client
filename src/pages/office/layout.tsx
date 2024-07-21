import React from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from 'effector-react';

import { sessionModel } from 'entities/session';

import { Box } from 'shared/ui/kit';
import { Loading } from 'shared/components/loading';
import { Sidebar } from './sidebar';

export const Layout = () => {
  const loading = useStore(sessionModel.$loading);

  return !loading ? (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        backgroundColor: 'rgb(244, 245, 247)',
      }}
    >
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  ) : (
    <Loading />
  );
};

import React from 'react';
import { useGate, useStore } from 'effector-react';

import { GlobalStyles, LinearProgress } from 'shared/ui/kit';
import { globalStyles } from 'shared/ui/theme';
import { NotifyContainer } from 'shared/ui/lib/notify-user';

import { sessionModel } from 'entities/session';

import { Routes } from 'pages';

export const App = () => {
  useGate(sessionModel.Gate);
  const userLoading = useStore(sessionModel.$loading);

  return (
    <>
      <NotifyContainer />
      {userLoading ? <LinearProgress /> : <Routes />}
      <GlobalStyles styles={globalStyles} />
    </>
  );
};

import React from 'react';
import { useGate } from 'effector-react';

import { AppBar, Card, Container, Toolbar, Typography } from 'shared/ui/kit';

import * as model from '../model';

export const GoodsPage = () => {
  useGate(model.Gate);

  return (
    <>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography>All goods</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Card sx={{ p: 2 }}></Card>
      </Container>
    </>
  );
};

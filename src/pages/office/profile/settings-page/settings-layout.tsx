import React from 'react';
import { Outlet } from 'react-router-dom';

import { SettingsNavBar } from 'features/profile/settings/navbar';

import { AppBar, Container, Grid, Toolbar, Typography } from 'shared/ui/kit';

export const SettingsLayout = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography>Settings</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <SettingsNavBar />
          </Grid>
          <Grid item md={8} xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

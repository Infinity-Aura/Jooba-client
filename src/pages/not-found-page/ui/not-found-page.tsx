import React from 'react';

import { Grid, Typography } from 'shared/ui/kit';

export const NotFoundPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Typography>404 Page Not Found</Typography>
    </Grid>
  );
};

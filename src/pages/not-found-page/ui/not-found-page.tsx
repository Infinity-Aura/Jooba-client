import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Grid, Typography } from 'shared/ui/kit';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography>404 Page Not Found</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Grid>
  );
};

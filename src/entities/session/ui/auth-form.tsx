import React from 'react';

import { Box, Card, Typography } from 'shared/ui/kit';

export const AuthForm = ({ children, type }: { children: React.ReactNode; type: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          maxWidth: 672,
          width: '100%',
          py: '41px',
          px: '36px',
        }}
      >
        <Typography variant="h3" sx={{ textTransform: 'uppercase', mb: '32px' }}>
          {type}
        </Typography>
        {children}
      </Card>
    </Box>
  );
};

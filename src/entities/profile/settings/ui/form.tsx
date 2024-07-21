import React from 'react';

import { Box, Typography } from 'shared/ui/kit';

export const SettingsForm = ({ children, type }: { children: React.ReactNode; type: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '16px',
        width: '100%',
        p: '24px',
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ mb: '16px', textAlign: 'center' }}>
          {type}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

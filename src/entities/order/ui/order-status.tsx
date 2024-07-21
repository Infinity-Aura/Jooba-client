import React from 'react';

import { HourglassBottomRoundedIcon } from 'shared/ui/icons';
import { Alert, Box, Typography } from 'shared/ui/kit';

const statusDict: Record<string, React.ReactNode> = {
  Approved: (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: '13px' }}>
        Ви вже записані на цей курс
      </Typography>
      <Alert
        variant="filled"
        severity="success"
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
          fontFamily: '"Montserrat", sans-serif',
        }}
      >
        Approved
      </Alert>
    </>
  ),
  Pending: (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 1 }}>
        Ви вже подали заявку на цей курс
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', fontFamily: '"Montserrat", sans-serif' }}
      >
        Очікуйте доступ від адміністратора
      </Typography>
      <Alert
        variant="filled"
        severity="warning"
        icon={<HourglassBottomRoundedIcon fontSize="inherit" />}
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
          fontFamily: '"Montserrat", sans-serif',
        }}
      >
        Pending
      </Alert>
    </>
  ),
  Denied: (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: '13px' }}>
        Ви не маєте доступ до цього курсу
      </Typography>
      <Alert
        variant="filled"
        severity="error"
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
          fontFamily: '"Montserrat", sans-serif',
        }}
      >
        Denied
      </Alert>
    </>
  ),
};

export const OrderStatus: React.FC<{ status: string }> = ({ status }) => {
  return (
    <Box
      sx={{
        background: '#FFFFFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '16px',
        p: '11px',
      }}
    >
      {statusDict[status]}
    </Box>
  );
};

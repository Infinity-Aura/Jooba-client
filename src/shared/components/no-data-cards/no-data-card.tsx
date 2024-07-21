import React from 'react';

import { Box, CardMedia, Typography } from 'shared/ui/kit';

import noData from './NoData.svg';

export const NoDataCard: React.FC<{
  title?: string;
  subtitle?: string;
  img?: string;
}> = ({ title = '', subtitle = 'No data found', img = noData }) => {
  return (
    <Box
      width="100%"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
      }}
    >
      <CardMedia
        sx={{
          height: '40vh',
          width: '100%',
          backgroundSize: 'contain',
          boxShadow: 'none',
          mb: 2,
        }}
        image={img}
      >
        {title && (
          <Typography
            variant="h5"
            color="textPrimary"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              top: '4vh',
            }}
          >
            {title}
          </Typography>
        )}
      </CardMedia>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
};

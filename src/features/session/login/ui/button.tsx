import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'shared/ui/kit';

export const LoginButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      component={Link}
      to="/login"
      sx={{
        m: 0,
        display: 'inline-block',
      }}
      variant="contained"
      onClick={onClick}
    >
      Sign In
    </Button>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'shared/ui/kit';

export const RegistrationSupplierButton = ({
  variant = true,
  onClick,
}: {
  variant?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      component={Link}
      to="/registration"
      sx={{
        m: 0,
        display: 'inline-block',
      }}
      variant={variant ? 'outlined' : 'contained'}
      color={variant ? 'primary' : 'secondary'}
      onClick={onClick}
    >
      Sign Up
    </Button>
  );
};

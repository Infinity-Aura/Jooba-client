import React from 'react';
import { useStore } from 'effector-react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Button, Switch, TextField } from 'shared/ui/kit';

import { Registration, model } from '../model';
import { PATHS } from 'shared/config';

export const RegistrationSupplierForm = () => {
  const navigate = useNavigate();

  const loading = useStore(model.registrationFx.pending);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: Registration = {
      firstName: form.get('firstName')?.toString() ?? '',
      lastName: form.get('lastName')?.toString() ?? '',
      email: form.get('email')?.toString() ?? '',
      password: form.get('password')?.toString() ?? '',
    };

    if (!data.email || !data.password) {
      throw new Error('Login error');
    }

    model.registrationRequested(data);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '21px' }}>
        <Box>
          Switch to Buyer or Retailer
          <Switch checked onChange={() => navigate(PATHS.auth.registrationCompany)} />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: '21px' }}>
          <TextField
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            inputProps={{ style: { fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '21px' }}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            inputProps={{ style: { fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '21px' }}>
          <TextField
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            inputProps={{ style: { fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '21px' }}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            inputProps={{ style: { fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '21px' }}>
        <Box
          component={Link}
          to={PATHS.auth.login}
          sx={{
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: ' 20px',
          }}
        >
          Sign In
        </Box>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        disabled={loading}
        sx={{
          py: '25px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          border: 'none',
        }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

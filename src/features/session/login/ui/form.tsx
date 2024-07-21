import React from 'react';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { Box, Button, TextField } from 'shared/ui/kit';

import { Login, model } from '../model';
import { PATHS } from 'shared/config';

export const LoginForm = () => {
  const loading = useStore(model.loginFx.pending);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: Login = {
      email: form.get('email')?.toString() ?? '',
      password: form.get('password')?.toString() ?? '',
    };

    if (!data.email || !data.password) {
      throw new Error('Login error');
    }

    model.loginRequested(data);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '21px' }}>
        <Box
          component={Link}
          to={PATHS.auth.registrationCompany}
          sx={{
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: ' 20px',
          }}
        >
          Recover password
        </Box>
        <Box
          component={Link}
          to={PATHS.auth.registrationCompany}
          sx={{
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: ' 20px',
          }}
        >
          Sign Up
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
        Sign In
      </Button>
    </Box>
  );
};

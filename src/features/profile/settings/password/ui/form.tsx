import React from 'react';

import { Box, Button, TextField, Typography } from 'shared/ui/kit';

import { model } from '../model';

export const SettingsPasswordForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const newPassword = form.get('newPassword')?.toString() ?? '';
    const newPasswordRepeat = form.get('newPasswordRepeat')?.toString() ?? '';

    if (newPassword !== newPasswordRepeat) {
      throw 'Passwords do not match';
    }

    const data: { oldPassword: string; newPassword: string } = {
      oldPassword: form.get('oldPassword')?.toString() ?? '',
      newPassword,
    };

    if (!data.oldPassword || !data.newPassword) {
      throw 'Update error';
    }

    model.userPasswordUpdateRequested(data);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Box sx={{ mb: '13px' }}>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Confirm your current password
          </Typography>
          <TextField
            required
            fullWidth
            name="oldPassword"
            type="password"
            id="oldPassword"
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            New password
          </Typography>
          <TextField
            required
            fullWidth
            name="newPassword"
            type="password"
            id="newPassword"
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Confirm the new password
          </Typography>
          <TextField
            required
            fullWidth
            name="newPasswordRepeat"
            type="password"
            id="newPasswordRepeat"
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { md: 'normal', xs: 'center' },
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            fontWeight: 900,
            fontSize: '0.8rem',
            lineHeight: '1.1rem',
            border: 'none',
            mr: '10px',
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

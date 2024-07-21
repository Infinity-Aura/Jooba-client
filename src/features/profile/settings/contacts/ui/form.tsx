import React from 'react';
import { useStore } from 'effector-react';

import { Box, Button, TextField, Typography } from 'shared/ui/kit';

import { sessionModel, User } from 'entities/session';

import { model } from '../model';
import { Loading } from 'shared/components/loading';

export const SettingsContactsForm = () => {
  const user = useStore(sessionModel.$user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: Partial<User> = {
      phoneNumber: (form.get('phoneNumber')?.toString() || user?.phoneNumber) ?? '',
      email: (form.get('email')?.toString() || user?.email) ?? '',
    };

    if (!data.phoneNumber || !data.email) {
      throw 'Update error';
    }

    model.userUpdateRequested(data);
  };

  return user ? (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Box sx={{ mb: '13px' }}>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Phone number
          </Typography>
          <TextField
            required
            fullWidth
            name="phoneNumber"
            type="phoneNumber"
            id="phoneNumber"
            defaultValue={user.phoneNumber}
            sx={{ borderRadius: '8px' }}
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            E-mail
          </Typography>
          <TextField
            required
            fullWidth
            name="email"
            type="email"
            id="email"
            defaultValue={user.email}
            sx={{ borderRadius: '8px' }}
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
        {/* <Typography sx={{ fontWeight: 200, fontSize: '0.8rem', lineHeight: '1.1rem', mr: '2px' }}>
          або
        </Typography>
        <Button
          type="reset"
          variant="text"
          sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', minWidth: 'auto' }}
        >
          Відміна
        </Button> */}
      </Box>
    </Box>
  ) : (
    <Loading />
  );
};

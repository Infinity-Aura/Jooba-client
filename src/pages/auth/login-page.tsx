import React from 'react';

import { LoginForm } from 'features/session/login';

import { AuthForm } from 'entities/session';

import { Container } from 'shared/ui/kit';

export const LoginPage = () => {
  return (
    <Container maxWidth="xl">
      <AuthForm type="Sign In">
        <LoginForm />
      </AuthForm>
    </Container>
  );
};

import React from 'react';

import { RegistrationSupplierForm } from 'features/session/registration-supplier';

import { AuthForm } from 'entities/session';

import { Container } from 'shared/ui/kit';

export const RegistrationSupplierPage = () => {
  return (
    <Container maxWidth="xl">
      <AuthForm type="Sign Up as Supplier">
        <RegistrationSupplierForm />
      </AuthForm>
    </Container>
  );
};

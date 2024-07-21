import React from 'react';

import { RegistrationCompanyForm } from 'features/session/registration-company';

import { AuthForm } from 'entities/session';

import { Container } from 'shared/ui/kit';

export const RegistrationCompanyPage = () => {
  return (
    <Container maxWidth="xl">
      <AuthForm type="Sign Up as Buyer or Retailer">
        <RegistrationCompanyForm />
      </AuthForm>
    </Container>
  );
};

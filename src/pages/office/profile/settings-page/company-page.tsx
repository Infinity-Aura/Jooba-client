import React from 'react';

import { SettingsCompanyForm } from 'features/profile/settings/company';

import { SettingsForm } from 'entities/profile/settings';

export const SettingsCompanyPage = () => {
  return (
    <SettingsForm type="Company Information">
      <SettingsCompanyForm />
    </SettingsForm>
  );
};

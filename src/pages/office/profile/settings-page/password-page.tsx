import React from 'react';

import { SettingsPasswordForm } from 'features/profile/settings/password';

import { SettingsForm } from 'entities/profile/settings';

export const SettingsPasswordPage = () => {
  return (
    <SettingsForm type="Security">
      <SettingsPasswordForm />
    </SettingsForm>
  );
};

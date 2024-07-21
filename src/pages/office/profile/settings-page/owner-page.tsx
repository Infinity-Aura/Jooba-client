import React from 'react';

import { SettingsOwnerForm } from 'features/profile/settings/owner';

import { SettingsForm } from 'entities/profile/settings';

export const SettingsOwnerPage = () => {
  return (
    <SettingsForm type="Owner information">
      <SettingsOwnerForm />
    </SettingsForm>
  );
};

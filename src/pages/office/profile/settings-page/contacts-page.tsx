import React from 'react';

import { SettingsContactsForm } from 'features/profile/settings/contacts';

import { SettingsForm } from 'entities/profile/settings';

export const SettingsContactsPage = () => {
  return (
    <SettingsForm type="Contacts">
      <SettingsContactsForm />
    </SettingsForm>
  );
};

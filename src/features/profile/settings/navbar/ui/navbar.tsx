import { useStore } from 'effector-react';
import { sessionModel } from 'entities/session';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATHS } from 'shared/config';

import { Box, Button } from 'shared/ui/kit';

const SETTINGS_PAGES = [
  { name: 'Owner', root: PATHS.office.profile.settings.owner },
  { name: 'Company', root: PATHS.office.profile.settings.company, role: 'company' },
  { name: 'Contacts', root: PATHS.office.profile.settings.contacts },
  { name: 'Security', root: PATHS.office.profile.settings.password },
];

export const SettingsNavBar = () => {
  const user = useStore(sessionModel.$user);

  return (
    <Box
      sx={{
        background: '#FFFFFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        p: '24px',
      }}
    >
      {SETTINGS_PAGES.map(({ name, root, role }) => (
        <React.Fragment key={name}>
          {(role === user?.role || !role) && (
            <Button
              component={NavLink}
              to={root}
              variant="text"
              sx={{
                my: 2,
                display: 'block',
                fontSize: '1.2rem',
                lineHeight: '1.65rem',
                textAlign: 'left',
                '&.active': {
                  fontWeight: 800,
                },
              }}
            >
              {name}
            </Button>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

import React from 'react';

import { ThemeProvider, StyledEngineProvider, CssBaseline } from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

export const withTheme = (component: () => React.ReactNode) =>
  function WithTheme() {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {component()}
        </ThemeProvider>
      </StyledEngineProvider>
    );
  };

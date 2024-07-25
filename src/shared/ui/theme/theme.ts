import { createTheme, SxProps } from '../kit';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    border: {
      blue: string;
      red: string;
      grey: string;
    };
  }

  interface PaletteOptions {
    border?: {
      blue: string;
      red: string;
      grey: string;
    };
  }

  interface TypeBackground {
    lightBlue: string;
    lightRed: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3B3B47',
    },
    secondary: {
      main: '#FFFFFF',
    },
    text: {
      primary: '#3B3B47',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#E0673A',
          color: '#FFFFFF',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          color: '#3B3B47',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          border: '3px solid #E0673A',
          minWidth: 116,
          textAlign: 'center',
          '&.Mui-disabled': {
            background: 'rgba(224, 103, 58, 0.8)',
            pointerEvents: 'none',
          },
        },
        text: {
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          fontWeight: 400,
        },
        textSecondary: {
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          fontWeight: 400,
          color: '#FFFFFF',
        },
        outlined: {
          background: 'transparent',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.1)',
            border: '3px solid rgba(224, 103, 58, 0.8)',
          },
        },
        contained: {
          background: '#E0673A',
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(224, 103, 58, 0.5)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          },
        },
        containedSecondary: {
          background: '#E0673A',
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(224, 103, 58, 0.8)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:after': {
            border: '3px solid #E0673A',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '3px solid #E0673A',
            },
            '&:hover fieldset': {
              border: '3px solid #E0673A',
            },
            '&.Mui-focused fieldset': {
              border: '3px solid #E0673A',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          background: '#FFFFFF',
          border: '3px solid #E0673A',
          outline: 'none',
          fontWeight: 300,
          fontSize: '1rem',
          '&:hover': {
            border: '3px solid rgba(224, 103, 58, 0.8)',
            outline: 'none',
          },
          '&:select': {
            border: 'none',
            outlined: 'none',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            background: '#E0673A',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: '4.8rem',
      lineHeight: '5.85rem',
    },
    h2: {
      fontWeight: 900,
      fontSize: '3.2rem',
      lineHeight: '3.9rem',
    },
    h3: {
      fontWeight: 800,
      fontSize: '1.8rem',
      lineHeight: '2.2rem',
    },
    h4: {
      fontWeight: 900,
      fontSize: '1.2rem',
      lineHeight: '1.65rem',
    },
    h5: {
      fontWeight: 300,
      fontSize: '0.8rem',
      lineHeight: '1.1rem',
    },
    h6: {
      fontWeight: 300,
      fontSize: '0.7rem',
      lineHeight: '0.95rem',
    },
    subtitle1: {
      fontWeight: 800,
      fontSize: '1.6rem',
      lineHeight: '1.95rem',
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: '1.2rem',
      lineHeight: '1.65rem',
    },
    body1: {
      fontWeight: 800,
      fontSize: '1rem',
      lineHeight: '1.2rem',
    },
    body2: {
      fontWeight: 500,
      fontSize: '0.6rem',
      lineHeight: '0.75rem',
    },
    button: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '1.2rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 380,
      sm: 580,
      md: 768,
      lg: 950,
      xl: 1125,
    },
  },
});

export type Sx = SxProps<typeof theme>;

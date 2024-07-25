import { Interpolation } from '@emotion/styled';
import { Theme } from '@mui/material';

export const globalStyles: Interpolation<Theme> = {
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    fontSize: 20,
  },
  '*::-webkit-scrollbar': {
    width: '0.4rem',
  },
  '*::-webkit-scrollbar-track': {
    WebkitBoxShadow: 'inherit',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.43)',
    borderRadius: '1rem',
  },
  html: {
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
  },
  body: {
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
  },
  '#root': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    minHeight: '100%',
  },
};

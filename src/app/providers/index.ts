import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import compose from 'compose-function';

import { withDnD } from './with-dnd';
import { withRouter } from './with-router';
import { withTheme } from './with-theme';

export const withProviders = compose<React.FC>(withDnD, withRouter, withTheme);

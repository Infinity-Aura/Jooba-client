import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { PATHS, navigateToFx } from 'shared/config';
import { showFxErrors } from 'shared/ui/lib/notify-user';

import { registration, login, logout, getCurrentUser } from './api';
import { User } from '../types';

export const Gate = createGate();

const domain = createDomain('entities/session');

export const logoutRequested = domain.event();

export const loginFx = domain.effect(login);
export const registrationFx = domain.effect(registration);
const logoutFx = domain.effect(logout);
export const getCurrentUserFx = domain.effect(getCurrentUser);

export const $user = domain.store<User | null>(null);
export const $loading = domain.store<boolean>(true);

$user.on(getCurrentUserFx.doneData, (_, obj) => obj).reset([logoutFx.doneData]);
$loading.on(getCurrentUserFx.pending, (_, pending) => pending);

sample({ clock: Gate.open, target: getCurrentUserFx });

sample({
  clock: [loginFx.doneData, registrationFx.doneData],
  fn: () => PATHS.office.allgoods,
  target: [getCurrentUserFx, navigateToFx],
});

sample({
  clock: logoutRequested,
  fn: () => PATHS.root,
  target: [logoutFx, navigateToFx],
});

showFxErrors([loginFx.failData, registrationFx.failData, logoutFx.failData]);

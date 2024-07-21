import { attach, createDomain, sample } from 'effector';
import { sessionModel } from 'entities/session';
import { Login } from './types';

const domain = createDomain('features/session/login');

export const loginRequested = domain.event<Login>();

export const loginFx = attach({ effect: sessionModel.loginFx });

sample({ clock: loginRequested, target: loginFx });

export const $error = domain.store<string>('');

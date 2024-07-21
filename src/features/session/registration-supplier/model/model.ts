import { attach, createDomain, sample } from 'effector';
import { Role, sessionModel } from 'entities/session';
import { Registration } from './types';

const domain = createDomain('features/session/registration');

export const registrationRequested = domain.event<Registration>();

export const registrationFx = attach({ effect: sessionModel.registrationFx });

sample({
  clock: registrationRequested,
  fn: (user) => ({
    ...user,
    role: 'supplier' as Role,
  }),
  target: registrationFx,
});

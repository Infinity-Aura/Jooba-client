import { attach, createDomain, sample } from 'effector';
import { settingsModel } from 'entities/profile/settings';
import { User } from 'entities/session';

const domain = createDomain('features/profile/settings/contacts');

export const userUpdateRequested = domain.event<Partial<User>>();

const userUpdateFx = attach({ effect: settingsModel.userUpdateFx });

sample({
  clock: userUpdateRequested,
  target: userUpdateFx,
});

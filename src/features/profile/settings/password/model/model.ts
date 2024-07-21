import { attach, createDomain, sample } from 'effector';
import { settingsModel } from 'entities/profile/settings';

const domain = createDomain('features/profile/settings/password');

export const userPasswordUpdateRequested = domain.event<{
  oldPassword: string;
  newPassword: string;
}>();

const userPasswordUpdateFx = attach({ effect: settingsModel.userPasswordUpdateFx });

sample({
  clock: userPasswordUpdateRequested,
  target: userPasswordUpdateFx,
});

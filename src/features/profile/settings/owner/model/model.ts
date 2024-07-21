import { attach, createDomain, sample } from 'effector';
import { settingsModel } from 'entities/profile/settings';
import { User, sessionModel } from 'entities/session';

const domain = createDomain('features/profile/settings/owner');

export const userUpdateRequested = domain.event<Partial<User>>();
export const uploadProfileImageRequested = domain.event<File>();

const userUpdateFx = attach({ effect: settingsModel.userUpdateFx });
const uploadProfileImageFx = attach({ effect: settingsModel.uploadProfileImageFx });

sample({
  clock: userUpdateRequested,
  source: sessionModel.$user,
  filter: (currentUser, updatedUser) =>
    updatedUser.firstName !== currentUser?.firstName ||
    updatedUser.lastName !== currentUser?.lastName ||
    updatedUser.birth !== currentUser?.birth ||
    updatedUser.gender !== currentUser?.gender,
  fn: (_, updatedUser) => updatedUser,
  target: userUpdateFx,
});

sample({
  clock: uploadProfileImageRequested,
  filter: (image) => !!image.size,
  target: uploadProfileImageFx,
});

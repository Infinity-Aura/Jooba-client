import { createDomain } from 'effector';

import { userUpdate, userPasswordUpdate, uploadProfileImage } from './api';
import { showFxErrors } from 'shared/ui/lib/notify-user';

const domain = createDomain('entities/profile/settings');

export const userUpdateFx = domain.effect(userUpdate);
export const userPasswordUpdateFx = domain.effect(userPasswordUpdate);
export const uploadProfileImageFx = domain.effect(uploadProfileImage);

showFxErrors([userUpdateFx.failData, userPasswordUpdateFx.failData, uploadProfileImageFx.failData]);

import { createDomain } from 'effector';

import { showFxErrors } from 'shared/ui/lib/notify-user';

import { createUser, deleteUser, getUser, getUsers, updateUser } from './api';

const domain = createDomain('entities/user');

export const createUserFx = domain.effect(createUser);
export const deleteUserFx = domain.effect(deleteUser);
export const getUserFx = domain.effect(getUser);
export const getUsersFx = domain.effect(getUsers);
export const updateUserFx = domain.effect(updateUser);

showFxErrors([
  createUserFx.failData,
  deleteUserFx.failData,
  getUserFx.failData,
  getUsersFx.failData,
  updateUserFx.failData,
]);

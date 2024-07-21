import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { User, userModel } from 'entities/user';

export const Gate = createGate();

const domain = createDomain('pages/office/suppliers');

export const getUsersFx = attach({ effect: userModel.getUsersFx });

export const $suppliers = domain.store<User[] | null>(null);

$suppliers.on(getUsersFx.doneData, (_, users) => users.filter((user) => user.role === 'supplier'));

sample({
  clock: Gate.open,
  target: getUsersFx,
});

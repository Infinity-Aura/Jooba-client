import { createDomain } from 'effector';

import { showFxErrors } from 'shared/ui/lib/notify-user';

import { createOneGoods, deleteOneGoods, getGoods, getMyGoods, getOneGoods } from './api';

const domain = createDomain('entities/goods');

export const getGoodsFx = domain.effect(getGoods);
export const getOneGoodsFx = domain.effect(getOneGoods);
export const getMyGoodsFx = domain.effect(getMyGoods);
export const createOneGoodsFx = domain.effect(createOneGoods);
export const deleteOneGoodsFx = domain.effect(deleteOneGoods);

showFxErrors([
  createOneGoodsFx.failData,
  deleteOneGoodsFx.failData,
  getGoodsFx.failData,
  getOneGoodsFx.failData,
  getMyGoodsFx.failData,
]);

import { attach, createDomain, sample } from 'effector';

import { OneGoods, goodsModel } from 'entities/goods';

const domain = createDomain('features/goods/create');

export const drawerOpenRequested = domain.event<boolean>();
export const createOneGoodsRequested = domain.event<Partial<OneGoods>>();

const createOneGoodsFx = attach({ effect: goodsModel.createOneGoodsFx });

export const $drawerOpen = domain.createStore<boolean>(false);

$drawerOpen.on(drawerOpenRequested, (_, drawerOpen) => drawerOpen);

sample({
  clock: createOneGoodsRequested,
  target: createOneGoodsFx,
});

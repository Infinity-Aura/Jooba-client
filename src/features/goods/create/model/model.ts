import { attach, createDomain, sample } from 'effector';

import { OneGoods, goodsModel } from 'entities/goods';

const domain = createDomain('features/goods/create');

export const createOneGoodsRequested = domain.event<Partial<OneGoods>>();

const createOneGoodsFx = attach({ effect: goodsModel.createOneGoodsFx });

sample({
  clock: createOneGoodsRequested,
  target: createOneGoodsFx,
});

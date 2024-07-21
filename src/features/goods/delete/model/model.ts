import { attach, createDomain, sample } from 'effector';

import { goodsModel } from 'entities/goods';

const domain = createDomain('features/goods/delete');

export const deleteOneGoodsRequested = domain.event<string>();

const deleteOneGoodsFx = attach({ effect: goodsModel.deleteOneGoodsFx });

sample({
  clock: deleteOneGoodsRequested,
  target: deleteOneGoodsFx,
});

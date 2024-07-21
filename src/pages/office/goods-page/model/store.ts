import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { goodsModel, OneGoods } from 'entities/goods';

export const Gate = createGate();

const domain = createDomain('pages/goods');

export const getGoodsFx = attach({ effect: goodsModel.getGoodsFx });

export const $goods = domain.store<OneGoods[] | null>(null);

$goods.on(getGoodsFx.doneData, (_, goods) => goods);

sample({
  clock: Gate.open,
  target: getGoodsFx,
});

sample({
  clock: goodsModel.deleteOneGoodsFx.done,
  target: getGoodsFx,
});

import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { OneGoods, goodsModel } from 'entities/goods';

export const Gate = createGate();

const domain = createDomain('pages/office/my-goods');

export const getGoodsFx = attach({ effect: goodsModel.getGoodsFx });

export const $goods = domain.store<OneGoods[] | null>(null);

$goods.on(getGoodsFx.doneData, (_, goods) => goods);

sample({
  clock: [Gate.open, goodsModel.deleteOneGoodsFx.done, goodsModel.createOneGoodsFx.done],
  target: getGoodsFx,
});

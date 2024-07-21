import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { goodsModel, OneGoods } from 'entities/goods';
import { Order, orderModel } from 'entities/order';
import { sessionModel } from 'entities/session';

export const Gate = createGate<string>();

const domain = createDomain('pages/office/cart');

export const getOneGoodsFx = attach({ effect: goodsModel.getOneGoodsFx });
export const getOrderByUserFx = attach({ effect: orderModel.getOrderByUserFx });

export const $goods = domain.store<OneGoods | null>(null);
export const $courseOrder = domain.store<Order | null>(null);

$goods.on(getOneGoodsFx.doneData, (_, goods) => goods).reset([Gate.close]);

sample({
  clock: getOrderByUserFx.doneData,
  target: $courseOrder,
});

// sample({
//   clock: orderModel.createOrderFx.done,
//   source: {
//     currentUser: sessionModel.$user,
//     course: $goods,
//   },
//   fn: ({ currentUser, course }) => ({ userId: currentUser?.id ?? '', courseId: course?.id ?? '' }),
//   target: getOrderByUserFx,
// });

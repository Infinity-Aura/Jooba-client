import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { goodsModel, OneGoods } from 'entities/goods';
import { Order, orderModel } from 'entities/order';
import { sessionModel } from 'entities/session';

export const Gate = createGate<string>();

const domain = createDomain('pages/course');

export const getOneGoodsFx = attach({ effect: goodsModel.getOneGoodsFx });
export const getOrderByUserFx = attach({ effect: orderModel.getOrderByUserFx });

export const $oneGoods = domain.store<OneGoods | null>(null);
export const $courseOrder = domain.store<Order | null>(null);

$oneGoods.on(getOneGoodsFx.doneData, (_, course) => course).reset([Gate.close]);

sample({
  clock: Gate.open,
  target: getOneGoodsFx,
});

sample({
  clock: Gate.open,
  source: sessionModel.$user,
  fn: (currentUser, courseId) => ({ userId: currentUser?.id ?? '', courseId }),
  target: getOrderByUserFx,
});

sample({
  clock: getOrderByUserFx.doneData,
  target: $courseOrder,
});

sample({
  clock: orderModel.createOrderFx.done,
  source: {
    currentUser: sessionModel.$user,
    course: $oneGoods,
  },
  fn: ({ currentUser, course }) => ({ userId: currentUser?.id ?? '', courseId: course?.id ?? '' }),
  target: getOrderByUserFx,
});
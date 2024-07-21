import { attach, createDomain, sample } from 'effector';
import { orderModel } from 'entities/order';
import { sessionModel } from 'entities/session';

const domain = createDomain('features/course/create');

export const createOrderRequested = domain.event<string>();

const createOrderFx = attach({ effect: orderModel.createOrderFx });

sample({
  clock: createOrderRequested,
  source: sessionModel.$user,
  fn: (currentUser, courseId) => ({
    userId: currentUser?.id ?? '',
    courseId,
    date: new Date().toLocaleString(),
    status: 'Pending',
  }),
  target: createOrderFx,
});

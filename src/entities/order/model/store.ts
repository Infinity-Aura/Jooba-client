import { createDomain } from 'effector';

import { showFxErrors } from 'shared/ui/lib/notify-user';

import {
  createOrder,
  deleteOrder,
  updateStatusOrder,
  getOrder,
  getOrders,
  getOrderByUser,
  getUsersOrders,
} from './api';

const domain = createDomain('entities/order');

export const createOrderFx = domain.effect(createOrder);
export const deleteOrderFx = domain.effect(deleteOrder);
export const updateStatusOrderFx = domain.effect(updateStatusOrder);
export const getOrderFx = domain.effect(getOrder);
export const getOrdersFx = domain.effect(getOrders);
export const getOrderByUserFx = domain.effect(getOrderByUser);
export const getUsersOrdersFx = domain.effect(getUsersOrders);

showFxErrors([
  createOrderFx.failData,
  deleteOrderFx.failData,
  updateStatusOrderFx.failData,
  getOrderFx.failData,
  getOrdersFx.failData,
  getOrderByUserFx.failData,
  getUsersOrdersFx.failData,
]);

import { http } from 'shared/config';

import { Order, UserOrder } from '../types';

export const createOrder = async (order: Partial<Order>): Promise<boolean> => {
  try {
    await http.post(`/order`, order);
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteOrder = async (orderId: string): Promise<boolean> => {
  try {
    await http.delete(`/order/${orderId}`);
    return true;
  } catch (e) {
    return false;
  }
};

export const updateStatusOrder = async ({
  order,
  status,
}: {
  order: Order;
  status: string;
}): Promise<boolean> => {
  try {
    await http.patch(`/order/${order.id}/status`, {
      userId: order.userId,
      orderId: order.id,
      status,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const getOrder = async (orderId: string): Promise<Order> => {
  const { data } = await http.get(`/order/${orderId}`);
  return {
    id: data._id,
    ...data,
  };
};

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await http.get('/order');
  return data?.map((order: { _id: string }) => ({
    id: order._id,
    ...order,
  }));
};

export const getOrderByUser = async ({
  userId,
  orderId,
}: {
  userId: string;
  orderId: string;
}): Promise<Order> => {
  const { data } = await http.get(`/order/user/${userId}/course/${orderId}`);
  return data;
};

export const getUsersOrders = async (): Promise<UserOrder[]> => {
  const { data } = await http.get(`/order/users/all`);
  return data?.map((order: { _id: string }) => ({
    id: order._id,
    ...order,
  }));
};

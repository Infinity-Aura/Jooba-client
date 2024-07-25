import { http } from 'shared/config';

import { OneGoods } from '../types';

export const getGoods = async (): Promise<OneGoods[]> => {
  const { data } = await http.get('/goods');
  return data?.map((goods: { _id: string }) => ({
    id: goods._id,
    ...goods,
  }));
};

export const getOneGoods = async (goodsId: string): Promise<OneGoods> => {
  const { data } = await http.get(`/goods/${goodsId}`);
  return {
    id: data._id,
    ...data,
  };
};

export const getMyGoods = async (): Promise<OneGoods[]> => {
  const { data } = await http.get(`/goods/own`);
  return data?.map((goods: { _id: string }) => ({
    id: goods._id,
    ...goods,
  }));
};

export const createOneGoods = async (goods: Partial<OneGoods>): Promise<boolean> => {
  try {
    await http.post(`/goods`, goods);
    return true;
  } catch (e) {
    return false;
  }
};

export const createGoods = async (goods: Partial<OneGoods>[]): Promise<boolean> => {
  try {
    await http.post(`/goods/bulk`, goods);
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteOneGoods = async (goodsId: string): Promise<boolean> => {
  try {
    await http.delete(`/goods/${goodsId}`);
    return true;
  } catch (e) {
    return false;
  }
};

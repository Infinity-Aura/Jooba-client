import { http } from 'shared/config';

import { User } from '../types';

export const createUser = async (user: Partial<User>): Promise<boolean> => {
  try {
    await http.post(`/user`, user);
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    await http.delete(`/user/${userId}`);
    return true;
  } catch (e) {
    return false;
  }
};

export const updateUser = async ({ user }: { user: User }): Promise<boolean> => {
  try {
    await http.patch(`/user/${user.id}`, user);
    return true;
  } catch (e) {
    return false;
  }
};

export const getUser = async (userId: string): Promise<User> => {
  const { data } = await http.get(`/user/${userId}`);
  return {
    id: data._id,
    ...data,
  };
};

export const getUsers = async (): Promise<User[]> => {
  const { data } = await http.get('/user');
  return data?.map((user: { _id: string }) => ({
    id: user._id,
    ...user,
  }));
};

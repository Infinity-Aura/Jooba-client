import { http } from 'shared/config';

import { User } from './types';

export const userUpdate = async (body: Partial<User>): Promise<void> => {
  await http.put('/user', body);
};

export const uploadProfileImage = async (photo: File): Promise<void> => {
  await http.put(
    '/user/image',
    { photo },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const userPasswordUpdate = async (body: {
  oldPassword: string;
  newPassword: string;
}): Promise<void> => {
  await http.put('/auth/reset', body);
};

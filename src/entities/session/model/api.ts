import { http, API_URL } from 'shared/config';

import { Role, User, UserResponse } from '../types';

export const registration = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}): Promise<User> => {
  const response = await http.post<UserResponse>('/authentication/registration', {
    firstName,
    lastName,
    email,
    password,
    role,
  });

  localStorage.setItem('access_token', response.data.tokens.accessToken);
  localStorage.setItem('refresh_token', response.data.tokens.refreshToken);

  return response.data.user;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> => {
  const response = await http.post<UserResponse>('/authentication/login', { email, password });

  localStorage.setItem('access_token', response.data.tokens.accessToken);
  localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
};

export const logout = async (): Promise<void> => {
  await http.post('/authentication/logout');

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getCurrentUser = async (): Promise<User> => {
  const user = await http.get<User>(`/authentication/user`, {
    withCredentials: true,
  });

  if (!user) {
    throw new Error('Authorization error');
  }

  return {
    id: user?.data.id || '',
    firstName: user?.data.firstName || '',
    lastName: user?.data.lastName || '',
    birth: user?.data.birth || '',
    gender: user?.data.gender || '',
    phoneNumber: user?.data.phoneNumber || '',
    email: user?.data.email || '',
    photo: user?.data.photo || '',
    role: user?.data.role || '',
  };
};

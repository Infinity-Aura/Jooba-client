export type User = {
  id: string;
  firstName: string;
  lastName: string;
  birth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  photo: string;
  role: Role;
};

export type Role = 'admin' | 'company' | 'supplier';

export type UserResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

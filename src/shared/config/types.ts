export type AuthRes = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
    gender: string;
    birth: string;
    phoneNumber: string;
    email: string;
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

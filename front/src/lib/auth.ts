import axios from 'axios';

import { getCookie, removeCookie } from '@/utils/cookie';

export type AccessTokenType = {
  accessToken: string;
  refreshToken: string;
  token?: never;
};

export const loginRequest = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<AccessTokenType> => {
  const { data } = await axios.post('/login', {
    email: username,
    password,
  });
  return data;
};

export const refreshRequest = async (): Promise<AccessTokenType> => {
  const oldRefreshToken = getCookie('refreshToken') ?? '';
  const oldAccessToken = getCookie('accessToken') ?? '';
  const {
    data: { accessToken, refreshToken },
  } = await axios.post('/refresh', {
    accessToken: oldAccessToken,
    refreshToken: oldRefreshToken,
  });
  return { accessToken, refreshToken };
};

export interface RefreshParams {
  refreshToken: string;
  accessToken: string;
}

export const logoutRequest = async (): Promise<void> => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
};

import { useMutation, useQueryClient } from 'react-query';

import {
  LoginRequestOptions,
  LoginResponse,
  RegisterRequestOptions,
  ResetPasswordRequestOptions,
  askResetPasswordRequest,
  loginRequest,
  refreshRequest,
  registerRequest,
  resetPasswordRequest,
  validateEmailRequest,
} from '../lib/auth';
import { ICommonResponse, IErrorResponse, MutationSuccessCallback } from '../lib/types';
import { setAccessToken, setRefreshToken } from '@/utils/auth';

export const useLoginMutation = ({ onSuccess }: MutationSuccessCallback<LoginResponse>) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, IErrorResponse, LoginRequestOptions>(loginRequest, {
    onSuccess: (data: LoginResponse) => {
      queryClient.invalidateQueries();
      if (onSuccess) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        onSuccess(data);
      }
    },
  });
};

export const useRefreshMutation = ({ onSuccess }: MutationSuccessCallback<LoginResponse>) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, IErrorResponse, void>(refreshRequest, {
    onSuccess: (data: LoginResponse) => {
      queryClient.invalidateQueries();
      if (onSuccess) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        onSuccess(data);
      }
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation<ICommonResponse, IErrorResponse, RegisterRequestOptions>(registerRequest);
};

export const useValidationEmailMutation = () => {
  return useMutation<ICommonResponse, IErrorResponse, string>(validateEmailRequest);
};

export const useAskResetPasswordMutation = () => {
  return useMutation<ICommonResponse, IErrorResponse, string>(askResetPasswordRequest);
};

export const useResetPasswordMutation = () => {
  return useMutation<ICommonResponse, IErrorResponse, ResetPasswordRequestOptions>(
    resetPasswordRequest,
  );
};

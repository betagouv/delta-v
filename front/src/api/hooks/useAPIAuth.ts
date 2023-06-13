import { useMutation, useQueryClient } from 'react-query';

import {
  LoginRequestOptions,
  LoginResponse,
  RegisterRequestOptions,
  ResetPasswordRequestOptions,
  askResetPasswordRequest,
  loginRequest,
  registerRequest,
  resetPasswordRequest,
  validateEmailRequest,
} from '../lib/auth';
import { ICommonResponse, MutationAxiosResponse, MutationSuccessCallback } from '../lib/types';
import { setAccessToken, setRefreshToken } from '@/utils/auth';

export const useLoginMutation = ({ onSuccess }: MutationSuccessCallback<LoginResponse>) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, MutationAxiosResponse, LoginRequestOptions>(loginRequest, {
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
  return useMutation<ICommonResponse, MutationAxiosResponse, RegisterRequestOptions>(
    registerRequest,
  );
};

export const useValidationEmailMutation = () => {
  return useMutation<ICommonResponse, MutationAxiosResponse, string>(validateEmailRequest);
};

export const useAskResetPasswordMutation = () => {
  return useMutation<ICommonResponse, MutationAxiosResponse, string>(askResetPasswordRequest);
};

export const useResetPasswordMutation = () => {
  return useMutation<ICommonResponse, MutationAxiosResponse, ResetPasswordRequestOptions>(
    resetPasswordRequest,
  );
};

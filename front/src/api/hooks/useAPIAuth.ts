import { useMutation, useQueryClient } from 'react-query';

import {
  LoginRequestOptions,
  LoginResponse,
  RegisterRequestOptions,
  ResetPasswordRequestOptions,
  askEmailValidationRequest,
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

export const useRegisterMutation = ({ onSuccess }: MutationSuccessCallback<ICommonResponse>) => {
  return useMutation<ICommonResponse, IErrorResponse, RegisterRequestOptions>(registerRequest, {
    onSuccess: (data: ICommonResponse) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};

export const useValidationEmailMutation = ({
  onSuccess,
}: MutationSuccessCallback<ICommonResponse>) => {
  return useMutation<ICommonResponse, IErrorResponse, string>(validateEmailRequest, {
    onSuccess: (data: ICommonResponse) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};

export const useAskEmailValidationMutation = () => {
  return useMutation<ICommonResponse, IErrorResponse, string | undefined>(
    askEmailValidationRequest,
  );
};

export const useAskResetPasswordMutation = () => {
  return useMutation<ICommonResponse, IErrorResponse, string>(askResetPasswordRequest);
};

export const useResetPasswordMutation = () => {
  return useMutation<ICommonResponse, IErrorResponse, ResetPasswordRequestOptions>(
    resetPasswordRequest,
  );
};

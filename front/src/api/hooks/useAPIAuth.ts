import { useMutation, useQueryClient } from 'react-query';

import {
  AgentConnectCallbackOptions,
  AgentConnectCallbackResponse,
  ChangePasswordRequestOptions,
  LoginRequestOptions,
  LoginResponse,
  RegisterRequestOptions,
  ResetPasswordRequestOptions,
  agentConnectCallbackRequest,
  askEmailValidationRequest,
  askResetPasswordRequest,
  changePasswordRequest,
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

export const useAskEmailValidationMutation = ({
  onSuccess,
}: MutationSuccessCallback<ICommonResponse>) => {
  return useMutation<ICommonResponse, IErrorResponse, string | undefined>(
    askEmailValidationRequest,
    {
      onSuccess: (data: ICommonResponse) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    },
  );
};

export const useAskResetPasswordMutation = ({
  onSuccess,
}: MutationSuccessCallback<ICommonResponse>) => {
  return useMutation<ICommonResponse, IErrorResponse, string>(askResetPasswordRequest, {
    onSuccess: (data: ICommonResponse) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};

export const useResetPasswordMutation = ({
  onSuccess,
}: MutationSuccessCallback<ICommonResponse>) => {
  return useMutation<ICommonResponse, IErrorResponse, ResetPasswordRequestOptions>(
    resetPasswordRequest,
    {
      onSuccess: (data: ICommonResponse) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    },
  );
};

export const useChangePasswordMutation = ({
  onSuccess,
}: MutationSuccessCallback<ICommonResponse>) => {
  return useMutation<ICommonResponse, IErrorResponse, ChangePasswordRequestOptions>(
    changePasswordRequest,
    {
      onSuccess: (data: ICommonResponse) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    },
  );
};

export const useAgentConnectCallbackMutation = ({
  onSuccess,
}: MutationSuccessCallback<AgentConnectCallbackResponse>) => {
  return useMutation<AgentConnectCallbackResponse, IErrorResponse, AgentConnectCallbackOptions>(
    agentConnectCallbackRequest,
    {
      onSuccess: (data: AgentConnectCallbackResponse) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    },
  );
};

import { useMutation, useQueryClient } from 'react-query';

import {
  AgentConnectCallbackOptions,
  AgentConnectCallbackResponse,
  AgentConnectLogoutCallbackOptions,
  ChangePasswordRequestOptions,
  LoginRequestOptions,
  LoginResponse,
  RegisterRequestOptions,
  ResetPasswordRequestOptions,
  agentConnectCallbackRequest,
  agentConnectLogoutCallbackRequest,
  agentConnectLogoutRequest,
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
import { setAccessToken, setLastRefresh, setRefreshToken } from '@/utils/auth';

export const useLoginMutation = ({ onSuccess }: MutationSuccessCallback<LoginResponse>) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, IErrorResponse, LoginRequestOptions>(loginRequest, {
    onSuccess: (data: LoginResponse) => {
      queryClient.invalidateQueries();
      if (onSuccess) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setLastRefresh(data.lastRefresh.toString());
        onSuccess(data);
      }
    },
  });
};

export const useRefreshMutation = ({
  onSuccess,
  onError,
}: MutationSuccessCallback<LoginResponse>) => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, IErrorResponse, void>(refreshRequest, {
    onSuccess: (data: LoginResponse) => {
      queryClient.invalidateQueries();
      if (onSuccess) {
        console.log('🚀 ~ onSuccess ~ data:', data);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setLastRefresh(data.lastRefresh.toString());
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
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
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          setLastRefresh(data.lastRefresh.toString());
          onSuccess(data);
        }
      },
    },
  );
};

export const useAgentConnectLogoutMutation = ({ onSuccess }: MutationSuccessCallback<void>) => {
  const queryClient = useQueryClient();

  return useMutation<void, IErrorResponse, void>(agentConnectLogoutRequest, {
    onSuccess: (data: void) => {
      queryClient.clear();
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};

export const useAgentConnectLogoutCallbackMutation = ({
  onSuccess,
}: MutationSuccessCallback<void>) => {
  const queryClient = useQueryClient();

  return useMutation<void, IErrorResponse, AgentConnectLogoutCallbackOptions>(
    agentConnectLogoutCallbackRequest,
    {
      onSuccess: () => {
        queryClient.clear();
        if (onSuccess) {
          onSuccess();
        }
      },
    },
  );
};

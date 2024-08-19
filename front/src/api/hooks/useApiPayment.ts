import { useMutation } from 'react-query';

import {
  initiatePaymentRequest,
  verifyPaymentStatusRequest,
  InitiatePaymentRequestOptions,
  PaymentResponse,
  VerifyPaymentStatusResponse,
  ValidatePaymentRequestOptions,
  validatePaymentRequest,
  RejectPaymentRequestOptions,
  rejectPaymentRequest,
} from '../lib/payment';

export const useInitiatePaymentMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: PaymentResponse) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<PaymentResponse, Error, InitiatePaymentRequestOptions>(
    (data) => initiatePaymentRequest(data),
    {
      onSuccess: (data) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error);
        }
      },
    },
  );
};

export const useVerifyPaymentStatusMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: VerifyPaymentStatusResponse) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<VerifyPaymentStatusResponse, Error, string>(
    (declarationId: string) => verifyPaymentStatusRequest(declarationId),
    {
      onSuccess: (data) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error);
        }
      },
    },
  );
};

export const useValidatePaymentMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<void, Error, ValidatePaymentRequestOptions>(
    (data) => validatePaymentRequest(data),
    {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error);
        }
      },
    },
  );
};

export const useRejectPaymentMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<void, Error, RejectPaymentRequestOptions>(
    (data) => rejectPaymentRequest(data),
    {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error);
        }
      },
    },
  );
};

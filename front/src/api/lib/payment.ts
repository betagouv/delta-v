import axios from 'axios';

export interface InitiatePaymentRequestOptions {
  declarationId: string;
}

export interface VerifyPaymentStatusRequestOptions {
  declarationId: string;
}

export interface PaymentResponse {
  paymentLink: string;
}

export interface VerifyPaymentStatusResponse {
  status: string;
}

export interface ValidatePaymentRequestOptions {
  declarationId: string;
}

export interface RejectPaymentRequestOptions {
  declarationId: string;
}

export const initiatePaymentRequest = async (
  paymentData: InitiatePaymentRequestOptions,
): Promise<PaymentResponse> => {
  const response = await axios.post('/payment', paymentData);
  return response.data;
};

export const verifyPaymentStatusRequest = async (
  declarationId: string,
): Promise<VerifyPaymentStatusResponse> => {
  const response = await axios.get(`/payment/verify/${declarationId}`);
  return response.data;
};

export const validatePaymentRequest = async (
  paymentData: ValidatePaymentRequestOptions,
): Promise<void> => {
  await axios.patch(`/payment/validate/${paymentData.declarationId}`);
};

export const rejectPaymentRequest = async (
  paymentData: RejectPaymentRequestOptions,
): Promise<void> => {
  await axios.patch(`/payment/reject/${paymentData.declarationId}`);
};

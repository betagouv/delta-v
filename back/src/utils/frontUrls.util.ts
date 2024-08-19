import { config } from '../loader/config';
export function buildAskResetPasswordUrl(token: string): string {
  return `${config.URL_FRONTEND}${config.ROUTE_FRONTEND_RESET_PASSWORD}?token=${token}`;
}
export function buildAskEmailValidationUrl(token: string): string {
  return `${config.URL_FRONTEND}${config.ROUTE_FRONTEND_VALIDATE_ACCOUNT}?token=${token}`;
}
export function buildDeclarationUrl(declarationId: string): string {
  return `${config.URL_FRONTEND}${config.ROUTE_FRONTEND_CHECK_DECLARATION}/${declarationId}`;
}
export const generatePaymentLink = (declarationId: string): string => {
  // Assuming the base URL for the payment gateway
  return `${config.URL_FRONTEND}/declaration/payment/status?declarationId=${declarationId}`;
};

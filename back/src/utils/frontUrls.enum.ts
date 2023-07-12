import config from '../loader/config';
export function buildAskResetPasswordUrl(token: string): string {
  return `${config.URL_FRONTEND}${config.ROUTE_FRONTEND_RESET_PASSWORD}?token=${token}`;
}

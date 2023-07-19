export const Config = {
  apiBaseURL: process.env.NEXT_PUBLIC_API_BASE_URL || undefined,
  isProduction: process.env.NEXT_PUBLIC_APP_ENV === 'production',
};

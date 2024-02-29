import { IErrorResponse } from '@/api/lib/types';

export const getErrorFields = (
  fieldName: string,
  apiError?: IErrorResponse,
  genericBadCredentialError?: boolean,
): string | undefined => {
  if (!apiError) {
    return undefined;
  }
  if (apiError.statusCode === 401 && genericBadCredentialError) {
    return 'Mail ou mot de passe invalide';
  }
  if (apiError.statusCode !== 400) {
    return undefined;
  }

  return apiError?.context?.validationErrors?.find((error: any) => error.name === fieldName)
    ?.message;
};

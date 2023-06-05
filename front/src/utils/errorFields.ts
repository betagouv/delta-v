import { AxiosResponse } from 'axios';

export const getErrorFields = (
  fieldName: string,
  apiError: AxiosResponse<any, any> | null,
): string | undefined => {
  if (!apiError) {
    return undefined;
  }
  if (apiError.status !== 400) {
    return undefined;
  }

  return apiError?.data?.context?.validationErrors.find((error: any) => error.name === fieldName)
    ?.message;
};

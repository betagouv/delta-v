import { AxiosError } from 'axios';

export const formatValidationsErrors = (
  data: Record<string, any> = {},
): { name: string; message: string; type: string }[] => {
  const validationErrors = data?.context?.validationErrors || [];
  const formattedErrors = validationErrors.map((err: any) => ({
    name: err.path.slice(1).join('.'),
    message: err.message,
    type: err.type,
  }));

  return formattedErrors;
};

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  if (error instanceof Error) {
    return 'isAxiosError' in error;
  }
  return false;
};

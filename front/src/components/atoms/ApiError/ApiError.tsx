import React from 'react';

import { Typography } from '../Typography';
import { IErrorResponse } from '@/api/lib/types';

export interface ApiErrorProps {
  apiError: IErrorResponse;
}

export const ApiError: React.FC<ApiErrorProps> = ({ apiError }: ApiErrorProps) => {
  if (apiError.statusCode === 400) {
    return null;
  }
  return (
    <Typography color="error" size="text-2xs">
      {apiError.message}
    </Typography>
  );
};

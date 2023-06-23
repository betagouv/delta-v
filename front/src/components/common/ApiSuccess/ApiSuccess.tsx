import React from 'react';

import { Typography } from '../Typography';
import { ICommonResponse } from '@/api/lib/types';

export interface ApiSuccessProps {
  apiSuccess: ICommonResponse;
}

export const ApiSuccess: React.FC<ApiSuccessProps> = ({ apiSuccess }: ApiSuccessProps) => {
  return (
    <Typography color="success" size="text-2xs">
      {apiSuccess.message}
    </Typography>
  );
};

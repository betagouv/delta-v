import { Meta } from '@storybook/react';

import { ApiError } from './ApiError';
import { IErrorResponse } from '@/api/lib/types';

export default {
  title: 'Components/Atoms/ApiError',
  component: ApiError,
} as Meta;

const error: IErrorResponse = {
  code: 'api-error-message',
  message: "Message d'erreur API",
  statusCode: 999,
};

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <ApiError apiError={error} />
  </div>
);

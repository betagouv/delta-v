import { Meta } from '@storybook/react';

import { ApiSuccess } from './ApiSuccess';
import { ICommonResponse } from '@/api/lib/types';

export default {
  title: 'Components/Common/ApiSuccess',
  component: ApiSuccess,
} as Meta;

const success: ICommonResponse = {
  code: 'api-success-message',
  message: 'Message de succès API',
};

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <ApiSuccess apiSuccess={success} />
  </div>
);
